import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";
import CheckStockMapper from "./check-stock.mapper";

export default class CheckStockUseCase {
  private repository: ProductGateway;

  constructor(repository: ProductGateway) {
    this.repository = repository;
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this.repository.find(input.productId);
    return CheckStockMapper.toOutput(product);
  }
}
