import { describe, expect, test } from "@jest/globals";
import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnection,
} from "typeorm";

const EXAMPLE_CONNECTION_STRINGS = {
  MYSQL: "mysql://root:123456@localhost:3306/jsguru-typeorm",
};

describe("Connection", () => {
  test("Connect jsguru-typeorm db", async () => {
    const connectionOptions: ConnectionOptions = {
      name: "default",
      type: "mysql",
      url: EXAMPLE_CONNECTION_STRINGS.MYSQL,
    };
    const connection: Connection = await createConnection(connectionOptions);

    const defaultConnection = getConnection("default");
    const records = await defaultConnection.manager.query(`
    SELECT
    CONSTRAINT_NAME,
    TABLE_SCHEMA,
    TABLE_NAME,
    CONSTRAINT_TYPE
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE TABLE_NAME = 'phpguru_users';
    `);
    console.error({ records });
    connection.close();

    expect(connection).toBeTruthy();
  });
});
