import { describe, expect, test } from "@jest/globals";
import { closeDatabaseConnection, openDatabaseConnection } from "../setup";
import { CustomerSource } from "../../src/entity/CustomerSource";
import { createConnection, getConnection, getManager } from "typeorm";

jest.useRealTimers();

describe("Entity", () => {
  beforeAll(() => {
    // setup one time
    console.error("process.env.TZ", process.env.TZ);
  });
  describe("Create Entity with entity manager", () => {
    it("entityManager.create - singular", async () => {
      await createConnection();

      const entityManager = getManager();
      // await entityManager.query(`SET GLOBAL time_zone = '+07:00';`);

      const queryResult = await entityManager.findOne<CustomerSource>(
        CustomerSource,
        { name: "Email" }
      );
      console.error(queryResult);
      const deletedResult = await entityManager.delete(CustomerSource, {
        name: "Email",
      });
      const customerSource = entityManager.create<CustomerSource>(
        CustomerSource,
        {
          name: "Email",
          description: "Danh sách email",
        }
      );

      // save to database
      const savedRecord = await entityManager.save(customerSource);
      console.error(savedRecord);
      expect(savedRecord).toBeTruthy();
    }, 20000);
  });
  afterAll(() => {
    closeDatabaseConnection();
  });
});
