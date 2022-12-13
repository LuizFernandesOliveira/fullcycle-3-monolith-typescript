import {app, sequelize} from "../express";
import request from "supertest";
import {AddProductInputDto} from "../../modules/product-adm/usecase/add-product/add-product.dto";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const input: AddProductInputDto = {
      name: "Notebook test",
      description: "Macbook Pro",
      purchasePrice: 4000,
      stock: 10
    }
    const response = await request(app)
      .post("/products")
      .send(input);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Note",
    });

    expect(response.status).toBe(500);
  });
});