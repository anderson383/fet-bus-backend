
export class Transaction {

  id:string
  reference:string
  status_transaction:string
  quantity: number;

  constructor(
    id:string,
    reference:string,
    status_transaction:string,
    quantity:number
  ) {

    this.id = id
    this.reference = reference
    this.status_transaction = status_transaction
    this.quantity = quantity
  }
}