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

  it("should find a product", async () => {
    const input: AddProductInputDto = {
      name: "Notebook test",
      description: "Macbook Pro",
      purchasePrice: 4000,
      stock: 10
    }
    const response = await request(app)
      .post("/products")
      .send(input);

    const responseCheckStock = await request(app).get(`/store-catalogs/${response.body.id}`);
    expect(responseCheckStock.status).toBe(200);
    expect(responseCheckStock.body).toEqual({
      id: response.body.id,
      name: input.name,
      description: input.description,
      salesPrice: input.purchasePrice,
    });
  });
});