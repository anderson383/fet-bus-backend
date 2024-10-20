import { Injectable } from '@nestjs/common';
// import { TransactionEntity } from '../../entity/transaction.entity';
// import { TransactionDao } from 'src/domain/ports/billing/dao/transaction.dao';
import { STATUS_TRANSACTION } from 'src/constants/status';
import { Transaction } from '../types/transaction';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Plans } from '@prisma/client';



@Injectable()
export class TransactionService {
  public reference: string = '';
  private providerIntegrity: string;
  private mount:number;
  private quantity: number;
  private signature: string = '';
  private currency: string = 'COP'
  private _userId: string

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    
    // private transactionDao:TransactionDao
  ) {
    this.providerIntegrity = 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';
  }

  
  set userId (value: string) {
    this._userId = value
  }

  setMountsQuantity(mount: number, quantity: number) {
    this.mount = mount
    this.quantity = quantity
  }

  async getTransaction(id: string): Promise<Transaction | null> {
    const result = await this.prisma.transactions.findUnique({
      where: { id },
      select: {
        id: true,
        reference: true,  // Equivalente a 'created_date' en tu código TypeORM
        mount: true,
        quantity: true,
        statusTransaction: true,  // En Prisma, los nombres de las columnas se definen en camelCase
      },
    });
  
    if (!result) return null;
  
    return new Transaction(result.id, result.reference, result.statusTransaction, result.quantity);
  }
  

  async initReference(plan: Plans): Promise<Transaction> {
    const lastReference = await this.prisma.transactions.findFirst({
      orderBy: {
        created_at: 'desc', // Asumiendo que tienes un campo 'createdAt' para la fecha de creación
      },
    });
    let newReferenceNumber: number;
    if (lastReference?.reference) {
      const lastNumber = parseInt(lastReference.reference.replace('REFERENCE', ''), 10);
      newReferenceNumber = lastNumber + 1;
    } else {
      newReferenceNumber = 1;
    }
    const newReferenceStr = `REFERENCE${newReferenceNumber.toString().padStart(8, '0')}`;

    return await this.createTransaction(newReferenceStr, plan)
  }

  async generateSignature (amount: number): Promise<string> {
    const encondedText = new TextEncoder().encode(`${this.reference}${amount}${this.currency}${this.providerIntegrity}`);
    console.log(`${this.reference}${amount}${this.currency}${this.providerIntegrity}`, 'encondedText')
    const hashBuffer = await (crypto as any).subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    this.signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return this.signature
  }
 
  async createTransaction(reference: string, plan: Plans): Promise<Transaction> {
    console.log(reference, 'reference')
    const result = await this.prisma.transactions.create({
      data: {
        updated_at: new Date(),
        created_at: new Date(),
        created_by: this._userId,
        modified_by: this._userId,
        
        plan_id: plan.id,
        user_id: this._userId,
        amount_per_day: plan.amount_perday,
        equal_day: plan.equals_day,
        mount: (plan.amount_perday * plan.equals_day) * 100, // Dividiendo el mount como lo haces en tu lógica actual
        quantity: 0,
        reference: reference,
        statusTransaction: STATUS_TRANSACTION.START, // Prisma usa camelCase para los campos
      },
    }).catch(er => {
      console.log(er)
      return null
    });
  
    // Retornamos una instancia de la clase Transaction
    return new Transaction(result.id, result.reference, result.statusTransaction, result.quantity);
  }

  // async updateTransaction(id:string, updateData: UpdateTransactionData):Promise<Transaction> {
  //   const result = await this.entityManager
  //     .createQueryBuilder()
  //     .update(TransactionEntity)
  //     .set(updateData)
  //     .where("id = :id", { id })
  //     .returning('*') 
  //     .execute();

  //   const insertCust = result.raw[0];
  //   return new Transaction(insertCust.id, insertCust.reference, insertCust.status_transaction, insertCust.quantity)
  // }
}

