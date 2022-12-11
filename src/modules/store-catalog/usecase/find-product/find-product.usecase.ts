import ProductGateway from "../../gateway/product.gateway";
import {FindProductInputDto, FindProductOutputDto} from "./find-product.dto";
import FindProductMapper from "./find-product.mapper";

export default class FindProductUseCase {
  private repository: ProductGateway;

  constructor(repository: ProductGateway) {
    this.repository = repository;
  }

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.repository.find(input.id);
    return FindProductMapper.toOutput(product);
  }
}
