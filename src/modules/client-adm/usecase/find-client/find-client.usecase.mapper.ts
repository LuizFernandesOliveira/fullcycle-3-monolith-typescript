import {FindClientOutputDto} from "./find-client.usecase.dto";
import Client from "../../domain/client.entity";

export default class FindClientUseCaseMapper {
  static toOutput(client: Client): FindClientOutputDto {
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}