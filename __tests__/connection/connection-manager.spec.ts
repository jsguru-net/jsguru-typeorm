import { describe, expect, test } from "@jest/globals";
import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnection,
  getConnectionManager,
} from "typeorm";

const EXAMPLE_CONNECTION_STRINGS = {
  MYSQL: "mysql://root:123456@localhost:3306/jsguru-typeorm",
};

describe("Connection", () => {
  beforeAll(() => {
    // setup one time
    const connectionManager = getConnectionManager();
    const connectionOptions: ConnectionOptions = {
      name: "default",
      type: "mysql",
      url: EXAMPLE_CONNECTION_STRINGS.MYSQL,
    };

    const connection: Connection = connectionManager.create(connectionOptions);
    connection.connect(); // performs connection
  });
  test("Connect jsguru-typeorm db", async () => {
    const connection = getConnectionManager().get();

    expect(connection).toBeTruthy();
  });
});
