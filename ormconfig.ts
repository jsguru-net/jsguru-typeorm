export default {
  type: "mysql",
  url: "mysql://root:123456@localhost:3306/jsguru-typeorm",
  synchronize: false,
  logging: false,
  timezone: "Z",
  entities: ["./src/entity/index.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
