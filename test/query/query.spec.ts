import { describe, expect, test } from "@jest/globals";
import {
  createConnection,
  FindConditions,
  getConnection,
  getManager,
  In,
  Like,
  Not,
} from "typeorm";
import { Customer } from "../../src/entity";
import { CustomerGender } from "../../src/entity/Customer";
import { CustomerRepository } from "../../src/repository/CustomerRepository";

describe("Query", () => {
  beforeAll(async () => {
    // setup one time
    await createConnection();
  });
  describe("Simple query", () => {
    it("test query mapping", () => {
      // s
      // other conditions
      const filter = {
        s: "nh", // email or fullname
        customerSource: {
          id: [1, 2, 3],
        },
      };

      console.error(filter);
      expect(filter).toBeTruthy();
    });
    it("find by id", async () => {
      const entityManager = getManager();
      const customerRepository =
        entityManager.getCustomRepository(CustomerRepository);
      const customer = await customerRepository.findOne(104201, {
        relations: ["customerSource"],
      });
      expect(customer).toBeTruthy();
    }, 20000);
    it("find by filters", async () => {
      const entityManager = getManager();
      const customerRepository =
        entityManager.getCustomRepository(CustomerRepository);
      const [customers, count] = await customerRepository.search({
        select: [
          "id",
          "fullname",
          "email",
          "createdAt",
          "updatedAt",
          "phoneNumber",
          "gender",
        ],
        relations: ["customerSource"],
        where: {
          gender: In([CustomerGender.MALE, CustomerGender.FEMALE]),
          customerSource: {
            id: In([1, 2, 3]),
          },
        },
        take: 10,
        skip: 0,
        order: {
          id: "DESC",
          fullname: "ASC",
        },
      });
      console.error(customers, count);
      expect(customers.length).toBeTruthy();
    }, 20000);
  });
  afterAll(async () => {
    await getConnection().close();
  });
});
