import express, {Request, Response} from "express";
import AddProductUseCase from "../../modules/product-adm/usecase/add-product/add-product.usecase";
import ProductAdmProductRepository from "../../modules/product-adm/repository/product.repository";


export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const input = req.body;
  const useCase = new AddProductUseCase(new ProductAdmProductRepository());
  try {
    const product = await useCase.execute(input);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
