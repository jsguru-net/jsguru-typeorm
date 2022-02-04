import { describe, expect, test } from "@jest/globals";
import { createConnection, getConnection, getManager } from "typeorm";
import { Customer, CustomerSource } from "../../src/entity";
import { CustomerGender } from "../../src/entity/Customer";
const isLeapYear = (year) => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};

const randomDate = () => {
  const randomYear = 1980 + Math.floor(Math.random() * 30);
  const randomMonth = Math.floor(Math.random() * 11); //0 -> 11
  let randomDay = Math.floor(Math.random() * 30) + 1; // 1 -> 31
  if (randomMonth == 1) {
    randomDay = isLeapYear(randomYear) ? 29 : 28; // ignore leap year
  }
  return new Date(randomYear, randomMonth, randomDay);
};
const randomGender = () => {
  const r = Math.floor(Math.random() * 2);
  if (r == 0) return CustomerGender.UNKNOWN;
  if (r == 1) return CustomerGender.FEMALE;
  if (r == 2) return CustomerGender.MALE;
};
describe("Seed", () => {
  beforeAll(async () => {
    // setup one time
    await createConnection();
  });
  describe("seed", () => {
    it("should generate a collection of customer source", async () => {
      const entityManager = getManager();
      // await entityManager.query(`SET foreign_key_checks = 0`);
      // await entityManager.query(`TRUNCATE TABLE customer_sources`);
      // await entityManager.query(`TRUNCATE TABLE customers`);
      // truncate
      // const customerSources: Array<CustomerSource> = [];
      // customerSources.push(new CustomerSource({ name: "Personal Contacts" }));
      // customerSources.push(new CustomerSource({ name: "Facebook" }));
      // customerSources.push(new CustomerSource({ name: "Email" }));
      // customerSources.push(new CustomerSource({ name: "Google Ads" }));
      // customerSources.push(new CustomerSource({ name: "Website" }));
      // customerSources.push(new CustomerSource({ name: "Telesale" }));
      // customerSources.push(new CustomerSource({ name: "Google Search" }));
      // customerSources.push(new CustomerSource({ name: "Zalo" }));
      // await entityManager.insert(CustomerSource, customerSources);
      // create customers
      const customers: Array<Customer> = [];
      // create 100,000 customers
      const NUMBER_OF_CUSTOMERS = 1e5;
      for (let i = 0; i < NUMBER_OF_CUSTOMERS; i++) {
        const customerSourceId = Math.floor(Math.random() * 7) + 1;
        "".padStart;
        customers.push(
          new Customer({
            fullname: `The user fullname ${i.toString().padStart(5, "0")}`,
            email: `jsguru.example.${i.toString().padStart(5, "0")}`,
            customerSource: new CustomerSource({ id: customerSourceId }),
            dob: randomDate(),
            gender: randomGender(),
          })
        );
      }
      const customerRepository = entityManager.getRepository(Customer);
      await customerRepository.save(customers, {
        chunk: 1000,
      });
      // await entityManager.query(`SET foreign_key_checks = 1`);
      // count
      const numberOfCustomers = await customerRepository.count();
      expect(numberOfCustomers).toEqual(customers.length);
    }, 600000);
  });
  afterAll(async () => {
    await getConnection().close();
  });
});
