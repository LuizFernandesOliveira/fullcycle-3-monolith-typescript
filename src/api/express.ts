import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import {productRoute} from "./routes/product.route";
import {storeCatalogRoute} from "./routes/store-catalog.route";
import {clientRoute} from "./routes/client.route";
import {checkoutRoute} from "./routes/checkout.route";
import {invoiceRoute} from "./routes/invoice.route";
import ProductAdmProductModel from "../modules/product-adm/repository/product.model";
import StoreCatalogProductModel from "../modules/store-catalog/repository/product.model";
import CheckoutOrderModel from "../modules/checkout/repository/order.model";
import AdmClientModel from "../modules/client-adm/repository/client.model";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import InvoiceProductModel from "../modules/invoice/repository/product.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import CheckoutClientModel from "../modules/checkout/repository/client.model";
import CheckoutProductModel from "../modules/checkout/repository/product.model";

export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);
app.use("/store-catalogs", storeCatalogRoute);
app.use("/clients", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([
    InvoiceProductModel,
    CheckoutClientModel,
    CheckoutProductModel,
    CheckoutOrderModel,
    AdmClientModel,
    InvoiceModel,
    TransactionModel,
    StoreCatalogProductModel,
    ProductAdmProductModel,
  ]);
  await sequelize.sync();
}

setupDb();
