import express, {Request, Response} from "express";
import AddProductUseCase from "../../modules/product-adm/usecase/add-product/add-product.usecase";
import ProductRepository from "../../modules/product-adm/repository/product.repository";
import CheckStockUseCase from "../../modules/product-adm/usecase/check-stock/check-stock.usecase";


export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const input = req.body;
  const useCase = new AddProductUseCase(new ProductRepository());
  try {
    const product = await useCase.execute(input);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  const useCase = new CheckStockUseCase(new ProductRepository());
  const id = req.params.id;
  try {
    const product = await useCase.execute({productId: id});
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});