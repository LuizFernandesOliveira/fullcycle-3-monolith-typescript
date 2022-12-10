import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import {AddProductInputDto, AddProductOutputDto} from "./add-product.dto";
import AddProductMapper from "./add-product.mapper";

export default class AddProductUseCase {
  private repository: ProductGateway;

  constructor(repository: ProductGateway) {
    this.repository = repository;
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = AddProductMapper.toProps(input);
    const product = new Product(props);
    await this.repository.add(product);
    return AddProductMapper.toOutput(product);
  }
}
