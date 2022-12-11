import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import {
  ProcessPaymentInputDto,
  ProcessPaymentOutputDto,
} from "./process-payment.dto";
import ProcessPaymentMapper from "./process-payment.mapper";

export default class ProcessPaymentUseCase implements UseCaseInterface {
  private repository: PaymentGateway;
  constructor(repository: PaymentGateway) {
    this.repository = repository;
  }

  async execute(
    input: ProcessPaymentInputDto
  ): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });
    transaction.process();
    const persistTransaction = await this.repository.save(transaction);
    return ProcessPaymentMapper.toOutputDto(persistTransaction);
  }
}
