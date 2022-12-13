import express, {Request, Response} from "express";
import FindProductUseCase from "../../modules/store-catalog/usecase/find-product/find-product.usecase";
import ProductRepository from "../../modules/store-catalog/repository/product.repository";

export const storeCatalogRoute = express.Router();

storeCatalogRoute.get("/:id", async (req: Request, res: Response) => {
  const useCase = new FindProductUseCase(new ProductRepository());
  const id = req.params.id;
  try {
    const product = await useCase.execute({id});
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});