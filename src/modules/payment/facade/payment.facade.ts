import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface from "./facade.interface";
import {PaymentFacadeInputDto, PaymentFacadeOutputDto} from "./payment.facede.dto";

export default class PaymentFacade implements PaymentFacadeInterface {
  private useCase: UseCaseInterface;
  constructor(useCase: UseCaseInterface) {
    this.useCase = useCase;
  }
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.useCase.execute(input);
  }
}
