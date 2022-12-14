import Product, {ProductProps} from "../../domain/product.entity";
import {AddProductInputDto, AddProductOutputDto} from "./add-product.dto";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class AddProductMapper {
  static toOutput(product: Product): AddProductOutputDto {
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toProps(input: AddProductInputDto): ProductProps {
    return {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
    };
  }
}