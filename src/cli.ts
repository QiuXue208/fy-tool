#!/usr/bin/env node
const pkg = require("../package.json");
const { program } = require("commander");
import { translate } from "./main";

program
  .version(pkg.version)
  .name("fy")
  .usage("<word>")
  .arguments("<word>")
  .action(function (word: string) {
    translate(word);
  });

program.parse(process.argv);
