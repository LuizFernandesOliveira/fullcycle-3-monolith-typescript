import {app, sequelize} from "../express";
import request from "supertest";
import {AddClientInputDto} from "../../modules/client-adm/usecase/add-client/add-client.usecase.dto";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const input: AddClientInputDto = {
      name: "Joao da Silva",
      email: "joao@joao.com",
      document: "12345678910",
      street: "Rua das Flores",
      number: "123",
      complement: "Casa 1",
      city: "São Paulo",
      state: "SP",
      zipCode: "12345678"
    }
    const response = await request(app)
      .post("/clients")
      .send(input);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: input.name,
      document: input.document,
      email: input.email,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should not create a client", async () => {
    const response = await request(app).post("/clients").send({
      name: "Name",
    });

    expect(response.status).toBe(500);
  });
});