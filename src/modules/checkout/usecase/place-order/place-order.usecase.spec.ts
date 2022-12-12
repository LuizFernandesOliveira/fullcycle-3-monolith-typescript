import PlaceOrderUseCase from "./place-order.usecase";
import {PlaceOrderInputDto} from "./place-order.dto";

describe("PlaceOrderUseCase unit test", () => {
  describe("execute method", () => {
    it("should throw an error when client is not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - no params in constructor
      const useCase = new PlaceOrderUseCase();

      //@ts-expect-error - force set clientFacade
      useCase["clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };

      await expect(useCase.execute(input)).rejects.toThrowError("Client not found");
    });

    it("should throw an error when products are not valid", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
      };

      //@ts-expect-error - no params in constructor
      const useCase = new PlaceOrderUseCase();

      //@ts-expect-error - force set clientFacade
      useCase["clientFacade"] = mockClientFacade;

      const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(useCase, "validateProducts")
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"));

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };

      await expect(useCase.execute(input)).rejects.toThrowError("No products selected");
      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    });
  });
});