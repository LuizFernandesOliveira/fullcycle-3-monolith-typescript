import { app, sequelize } from "../express";
import request from "supertest";

import Id from "../../modules/@shared/domain/value-object/id.value-object";
import Product from "../../modules/invoice/domain/product.entity";
import Invoice from "../../modules/invoice/domain/invoice.entity";
import Address from "../../modules/invoice/valueobject/address.valueobject";
import InvoiceRepository from "../../modules/invoice/repository/invoice.repository";

describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should do the invoice", async () => {
    const address = new Address({
      street: "Main Street",
      number: "123",
      complement: "Apt 1",
      city: "São Paulo",
      state: "SP",
      zipCode: "122343404",
    });

    const product = new Product({
      id: new Id("1"),
      name: "Product 1",
      price: 100,
    });

    const invoice = new Invoice({
      id: new Id("123"),
      name: "Invoice 1",
      document: "Document 1",
      items: [product],
      address: address,
    });

    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.generate(invoice);
    const response = await request(app).get(`/invoice/${123}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Invoice 1");
    expect(response.body.document).toEqual("Document 1");
    expect(response.body.address.street).toEqual("Main Street");
    expect(response.body.address.number).toEqual("123");
    expect(response.body.address.complement).toEqual("Apt 1");
    expect(response.body.address.city).toEqual("São Paulo");
    expect(response.body.address.state).toEqual("SP");
    expect(response.body.address.zipCode).toEqual("122343404");
    expect(response.body.items[0].id).toEqual("1");

  });
});
