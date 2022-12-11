import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";
import {AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto} from "./client-adm.facade.dto";

export interface UseCaseProps {
  findUseCase: UseCaseInterface;
  addUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private findUseCase: UseCaseInterface;
  private addUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this.findUseCase = useCaseProps.findUseCase;
    this.addUseCase = useCaseProps.addUseCase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this.addUseCase.execute(input);
  }
  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this.findUseCase.execute(input);
  }
}
