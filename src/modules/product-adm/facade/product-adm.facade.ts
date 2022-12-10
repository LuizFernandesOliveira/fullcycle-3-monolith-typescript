import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";
import {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.dto";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private addUseCase: UseCaseInterface;
  private checkStockUseCase: UseCaseInterface;

  constructor(useCasesProps: UseCasesProps) {
    this.addUseCase = useCasesProps.addUseCase;
    this.checkStockUseCase = useCasesProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this.addUseCase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this.checkStockUseCase.execute(input);
  }
}
