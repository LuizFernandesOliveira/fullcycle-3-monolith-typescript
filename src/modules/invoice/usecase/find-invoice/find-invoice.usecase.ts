import InvoiceGateway from "../../gateway/invoice.gateway";
import {FindInvoiceUseCaseOutputDTO} from "./find-invoice.dto";
import FindInvoiceMapper from "./find-invoice.mapper";

export default class FindInvoiceUseCase {
  private repository: InvoiceGateway;

  constructor(repository: InvoiceGateway) {
    this.repository = repository;
  }

  async execute(id: string): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.repository.find(id);
    return FindInvoiceMapper.toOutput(invoice);
  }
}