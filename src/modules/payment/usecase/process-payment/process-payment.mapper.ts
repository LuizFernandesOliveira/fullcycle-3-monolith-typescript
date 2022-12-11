import {ProcessPaymentInputDto, ProcessPaymentOutputDto} from "./process-payment.dto";
import Transaction from "../../domain/transaction";

export default class ProcessPaymentMapper {
  static toOutputDto(persistTransaction: Transaction): ProcessPaymentOutputDto {
    return {
      transactionId: persistTransaction.id.id,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    };
  }
}