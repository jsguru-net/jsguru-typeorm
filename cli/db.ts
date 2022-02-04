import { Command } from "commander";
const dbProgram = new Command();

dbProgram
  .name("db")
  .description("CLI to create database seed")
  .version("0.1.0");

dbProgram.option("-v, --verbose", "output extra debugging");

dbProgram.parse(process.argv);

const options = dbProgram.opts();

console.log(options);
