import { describe, expect, test } from "@jest/globals";
import { closeDatabaseConnection, openDatabaseConnection } from "../setup";
import { CustomerSource } from "../../src/entity/CustomerSource";
import { createConnection, getConnection, getManager } from "typeorm";

jest.useRealTimers();

describe("Entity", () => {
  beforeAll(() => {
    // setup one time
  });
  describe("Create Entity with entity manager", () => {
    it("entityManager.create - singular", async () => {
      await createConnection();

      const entityManager = getManager();
      const user = entityManager.create<CustomerSource>(CustomerSource, {
        name: "Email",
        description: "Danh sách email",
      });
      console.error({ user });
      // save to database
      const savedRecord = await entityManager.save(user);
      expect(savedRecord).toBeTruthy();
    }, 10000);
  });
  afterAll(() => {
    closeDatabaseConnection();
  });
});
