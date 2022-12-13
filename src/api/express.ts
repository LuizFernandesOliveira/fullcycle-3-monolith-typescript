import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import ProductAdmProductModel from "../modules/product-adm/repository/product.model";
import StoreCatalogProductModel from "../modules/store-catalog/repository/product.model";
import {productRoute} from "./routes/product.route";
import OrderModel from "../modules/checkout/repository/order.model";
import ClientModel from "../modules/client-adm/repository/client.model";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import {storeCatalogRoute} from "./routes/store-catalog.route";

export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);
app.use("/store-catalogs", storeCatalogRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: false,
  });
  await sequelize.addModels([
    OrderModel,
    ClientModel,
    InvoiceModel,
    TransactionModel,
    StoreCatalogProductModel,
    ProductAdmProductModel,
  ]);
  await sequelize.sync();
}

setupDb();
