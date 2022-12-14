import Product from "../../domain/product.entity";
import {FindProductOutputDto} from "./find-product.dto";

export default class FindProductMapper {
  static toOutput(product: Product): FindProductOutputDto {
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }
}