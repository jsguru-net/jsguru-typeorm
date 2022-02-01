import { DefaultNamingStrategy, Table } from "typeorm";

const camelToSnakeCase = (str) =>
  str
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    .replace(/^_/, "");

function parseName(
  prefix: string,
  tableOrName: Table | string,
  suffix?: string | string[],
  length = 30
) {
  const tableName =
    tableOrName instanceof Table ? tableOrName.name : tableOrName;

  suffix = Array.isArray(suffix) ? suffix.join("_") : suffix;

  return `${prefix}_${tableName}${suffix ? `_${suffix}` : ""}`.substr(
    0,
    length
  );
}

class CustomNamingStrategy extends DefaultNamingStrategy {
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[]
  ): string {
    return parseName("fk", tableOrName, _referencedTablePath);
  }
  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ): string {
    return customName ? customName : camelToSnakeCase(propertyName);
  }
}

export default {
  type: "mysql",
  url: "mysql://root:123456@localhost:3306/jsguru-typeorm",
  synchronize: false,
  logging: false,
  timezone: "Z",
  entities: ["./src/entity/index.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  namingStrategy: new CustomNamingStrategy(),
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
