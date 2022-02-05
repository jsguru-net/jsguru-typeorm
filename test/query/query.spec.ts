import { describe, expect, test } from "@jest/globals";
import {
  createConnection,
  FindConditions,
  getConnection,
  getManager,
  Like,
  Not,
} from "typeorm";
import { Customer } from "../../src/entity";
import { CustomerRepository } from "../../src/repository/CustomerRepository";

describe("Query", () => {
  beforeAll(async () => {
    // setup one time
    await createConnection();
  });
  describe("Simple query", () => {
    it("find by id", () => {});
    it("find by filters", async () => {
      const entityManager = getManager();
      const customerRepository =
        entityManager.getCustomRepository(CustomerRepository);
      const filters = {
        fullname: "%user fullname%",
      };
      const [customers, count] = await customerRepository.search({
        id: Not(1),
        fullname: Like(filters.fullname),
      });
      console.error(customers, count);
      expect(customers.length).toBeTruthy();
    });
  });
  afterAll(async () => {
    await getConnection().close();
  });
});
