import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import {FindAllProductsOutputDto} from "./find-all-products.dto";
import FindAllProductsMapper from "./find-all-products.mapper";

export default class FindAllProductsUseCase implements UseCaseInterface {
  private repository: ProductGateway;
  constructor(repository: ProductGateway) {
    this.repository = repository;
  }

  async execute(): Promise<FindAllProductsOutputDto> {
    const products = await this.repository.findAll();
    return FindAllProductsMapper.toOutput(products);
  }
}
