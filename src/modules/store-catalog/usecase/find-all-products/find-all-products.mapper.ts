import Product from "../../domain/product.entity";
import {FindAllProductsOutputDto} from "./find-all-products.dto";

export default class FindAllProductsMapper {
  static toOutput(products: Product[]): FindAllProductsOutputDto {
    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}