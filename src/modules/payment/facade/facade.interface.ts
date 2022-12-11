import {PaymentFacadeInputDto, PaymentFacadeOutputDto} from "./payment.facede.dto";

export default interface PaymentFacadeInterface {
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}
