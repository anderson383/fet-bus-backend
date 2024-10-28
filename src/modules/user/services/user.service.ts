import {
  Injectable,
  HttpException
} from '@nestjs/common';
import { Rol, User } from '@prisma/client';
import { AuthCreateUserDto } from 'src/modules/auth/dtos/auth.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { hashSync } from 'bcrypt';
import { ROLES } from 'src/constants/roles';
import { UpdateUserDto, UserCreateDto} from '../dto/user.dto';

@Injectable()
export class UserService {

  private _userId: string;

  set userId(value: string) {
    this._userId = value;
  }


  constructor(
    private prisma: PrismaService
  ) { }

  /**
   * Crea un usuario con los datos dados.
   * @param userData Datos del usuario a crear.
   * @returns Promesa que se resuelve con el usuario creado.
   * @throws {HttpException} Si el usuario ya existe.
   */
  async createUser(userData: AuthCreateUserDto): Promise<User> {

    const findUser = await this.getByEmail(userData.email)
    const findUserCode = await this.getByCodeStudent(userData.code_student)
    const findUserDocument = await this.getByDocument(userData.document)

    if (findUser || findUserCode || findUserDocument) {
      throw new HttpException('El usuario ya existe', 400)
    }
    const roleStudent = await this.getRolByCode(ROLES.STUDENT);
    const passwordEncipted = hashSync(userData.password, 10)
    try {
      const userCreate = await this.prisma.user.create({
        data: {
          document: userData.document,
          code_student: userData.code_student,
          email: userData.email,
          password: passwordEncipted,
          full_name: userData.full_name,
          last_name: userData.last_name,
          program_academic_id: userData.code_program,
          rol_id: roleStudent.id,
          rh_id: userData.rh,
          eps_id: userData.eps,
          updated_at: new Date(),
        }
      })
      delete userCreate.password
      return userCreate
    } catch (err) {
      throw new HttpException(err, 400)
    }
  }
  /**
   * Busca un usuario por su correo electronico
   * @param email Correo electronico del usuario
   * @returns Promesa que se resuelve con el usuario encontrado o nulo si no existe
   */
  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        plans: {
          where: {
            status_plan: true
          },
          take: 1
        },
        rol: {
          select: {
            code: true
          }
        }
      }
    })
  }

  /**
   * Busca un usuario por su codigo de estudiante
   * @param code_student Codigo del estudiante
   * @returns Promesa que se resuelve con el usuario encontrado o nulo si no existe
   */
  getByCodeStudent(code_student: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        code_student
      }
    })
  }

  /**
   * Busca un usuario por su documento
   * @param document Documento del usuario
   * @returns Promesa que se resuelve con el usuario encontrado o nulo si no existe
   */
  getByDocument(document: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        document
      }
    })
  }

  /**
   * Busca un rol por su codigo
   * @param code Codigo del rol
   * @returns Promesa que se resuelve con el rol encontrado o nulo si no existe
   */
  getRolByCode(code: string): Promise<Rol> {
    return this.prisma.rol.findUnique({
      where: {
        code
      }
    })
  }


  async findAllDrivers() {
    const rol = await this.getRolByCode(ROLES.DRIVER_BUS);
    return this.prisma.user.findMany({
      where: {
        rol_id: rol.id,
        status: true
      },
      include: {
        rol: {
          select: {
            name: true
          }
        }
      }
    })
  }

  async findAllUsers() {
    const users = await this.prisma.user.findMany({
      where: {
        status: true
      },
      include: {
        rol: {
          select: {
            name: true,
            code: true
          }
        },
        eps: {
          select: {
            name: true
          }
        },
        rh: {
          select: {
            name: true
          }
        }
      }
    });

    return users.map(({ password, ...user }) => user);
  }

  async deleteById(id: string) {

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        status: false,
        updated_at: new Date(),
        modified_by: this._userId
      }
    })

  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        status: true
      },
      include: {
        rol: {
          select: {
            name: true,
            code: true
          }
        },
        eps: {
          select: {
            name: true
          }
        },
        rh: {
          select: {
            name: true
          }
        }
      }
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404)
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createAnyUser(userData: UserCreateDto){
    const findUser = await this.getByEmail(userData.email)

    if (userData.code_student) {
      const findUserCode = await this.getByCodeStudent(userData.code_student)
      if (findUserCode) {
        throw new HttpException('El codigo de estudiante ya existe', 400)
      }
    }

    const findUserDocument = await this.getByDocument(userData.document)

    if (findUser || findUserDocument) {
      throw new HttpException('El usuario ya existe', 400)
    }
    const role = await this.getRolByCode(userData.rol);

    if (!role) {
      throw new HttpException('Rol no encontrado', 404)
    }

    const passwordEncipted = hashSync(userData.document, 10);

    const { rol, password, ...rest } = userData;

    try {
      const userCreate = await this.prisma.user.create({
        data: {
          password: passwordEncipted,
          rol_id: role.id,
          ...rest,
          updated_at: new Date(),
          created_by: this._userId,
          modified_by: this._userId
        }
      })
      delete userCreate.password
      return userCreate
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  async update(id: string, userData: UpdateUserDto) {
    const user = await this.findById(id);

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404)
    }

   if(userData.rol){
      const role = await this.getRolByCode(userData.rol);

      if (!role) {
        throw new HttpException('Rol no encontrado', 404)
      }

      userData.rol = role.id
   }

    if(userData.password){
      userData.password = hashSync(userData.password, 10)
    }

    try {
      const userUpdate = await this.prisma.user.update({
        where: {
          id
        },
        data: {
          document: userData.document,
          code_student: userData.code_student,
          email: userData.email,
          phone: userData.phone,
          full_name: userData.full_name,
          last_name: userData.last_name,
          program_academic_id: userData.program_academic_id,
          rol_id: userData.rol,
          rh_id: userData.rh_id,
          eps_id: userData.eps_id,
          birthdate: userData.birthdate,
          address: userData.address,
          updated_at: new Date(),
          modified_by: this._userId
        }
      })
      delete userUpdate.password
      return userUpdate
    } catch (error) {
      throw new HttpException(error, 400)
    }

  }

}
