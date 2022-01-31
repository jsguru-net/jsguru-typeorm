# TypeORM Practice

## Prerequisites

1. Connection

### Installing CLI

```bash
yarn add ts-node typeorm
```

```json
"scripts": {
  "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

## Excercise 1

![API Email Marketing](./erd/API-Email-Marketing.JPG)

### Diagrams

![Diagrams](./erd/jsguru-typeorm.png)

```bash
yarn typeorm init --express --docker
```

## Migration

### Generate migration

```bash
yarn typeorm migration:generate -n CustomerSourceCreate
```

### Create custom migration

```bash
yarn typeorm migration:create -n CustomMigrationName
```

## References

- [TypeORM Official](https://typeorm.io/#/using-cli)
- [TypeORM CheatSheet](https://gist.github.com/misostack/cc1cc7a16a607fdcf84b61daf20d38d5)
