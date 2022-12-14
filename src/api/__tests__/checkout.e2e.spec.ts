import { app, sequelize } from "../express";
import request from "supertest";
import ClientModel from "../../modules/client-adm/repository/client.model";
import ProductModel from "../../modules/product-adm/repository/product.model";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should on checkout", async () => {
    await ClientModel.create({
      id: "10",
      name: "Client 1",
      email: "client@example.com",
      document: "0000",
      street: "Rua das Flores",
      number: "123",
      complement: "Casa 1",
      city: "São Paulo",
      state: "SP",
      zipCode: "12345678",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "10",
      name: "My Product",
      description: "Product description",
      price: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "10",
        products: [{ productId: "10" }],
      });

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.total).toEqual(100);
    expect(response.body.status).toEqual("approved");
  });
});
