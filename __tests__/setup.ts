import {
  Connection,
  ConnectionOptions,
  getConnectionManager,
  createConnection,
} from "typeorm";
import { CustomerSource } from "../src/entity/CustomerSource";
import * as path from "path";
const EXAMPLE_CONNECTION_STRINGS = {
  MYSQL: "mysql://root:123456@localhost:3306/jsguru-typeorm",
};
// entities: [__dirname + '/../**/*.entity.{js,ts}'],
// entities config accept both path, and entity classes
const entities = [path.resolve(__dirname, "../src/entity/index.ts")];

export const openDatabaseConnection = async () => {
  const connection = await createConnection();

  // const connectionManager = getConnectionManager();
  // const connectionOptions: ConnectionOptions = {
  //   name: "default",
  //   type: "mysql",
  //   url: EXAMPLE_CONNECTION_STRINGS.MYSQL,
  //   entities,
  // };

  // const connection: Connection = connectionManager.create(connectionOptions);
  // await connection.connect(); // performs connection
};

export const closeDatabaseConnection = async () => {
  const connection = getConnectionManager().get();
  await connection.close();
};
