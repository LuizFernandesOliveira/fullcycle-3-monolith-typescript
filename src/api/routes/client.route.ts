import express, {Request, Response} from "express";
import AddClientUseCase from "../../modules/client-adm/usecase/add-client/add-client.usecase";
import ClientRepository from "../../modules/client-adm/repository/client.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const input = req.body;
  const useCase = new AddClientUseCase(new ClientRepository());
  try {
    const product = await useCase.execute(input);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
