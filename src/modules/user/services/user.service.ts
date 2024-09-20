import {
  Injectable,
  HttpException
} from '@nestjs/common';
import { Rol, User } from '@prisma/client';
import { AuthCreateUserDto } from 'src/modules/auth/dtos/auth.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { hashSync } from 'bcrypt';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {}

  /**
   * Crea un usuario con los datos dados.
   * @param userData Datos del usuario a crear.
   * @returns Promesa que se resuelve con el usuario creado.
   * @throws {HttpException} Si el usuario ya existe.
   */
  async createUser (userData: AuthCreateUserDto): Promise<User> {

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
  getByEmail (email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
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
  getRolByCode (code: string): Promise<Rol> {
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
}
