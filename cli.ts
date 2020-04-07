import * as commander from "commander";
const pkg = require("./package.json");
const program = new commander.Command();

program
  .version(pkg.version)
  .name("fy")
  .usage("<word>")
  .arguments("<word> [env]")
  .action(function (word) {});

program.parse(process.argv);
