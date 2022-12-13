import express, {Request, Response} from "express";
import AddProductUseCase from "../../modules/product-adm/usecase/add-product/add-product.usecase";
import ProductAdmProductRepository from "../../modules/product-adm/repository/product.repository";
import FindProductUseCase from "../../modules/store-catalog/usecase/find-product/find-product.usecase";
import StoreCatalogProductRepository from "../../modules/store-catalog/repository/product.repository";


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

productRoute.get("/:id", async (req: Request, res: Response) => {
  const useCase = new FindProductUseCase(new StoreCatalogProductRepository());
  const id = req.params.id;
  try {
    const product = await useCase.execute({id});
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});