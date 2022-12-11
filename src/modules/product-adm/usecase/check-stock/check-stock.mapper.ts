import {CheckStockInputDto, CheckStockOutputDto} from "./check-stock.dto";
import Product from "../../domain/product.entity";

export default class CheckStockMapper {
  static toOutput(product: Product): CheckStockOutputDto {
    return {
      productId: product.id.id,
      stock: product.stock,
    };
  }
}