import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products-usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface from "./store-catalog.facade.interface";
import {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto
} from "./store-catalog.facade.dto";

export interface UseCaseProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductsUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private findUseCase: FindProductUseCase;
  private findAllUseCase: FindAllProductsUseCase;

  constructor(props: UseCaseProps) {
    this.findUseCase = props.findUseCase;
    this.findAllUseCase = props.findAllUseCase;
  }

  async find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this.findUseCase.execute(input);
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this.findAllUseCase.execute();
  }
}
