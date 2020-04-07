#!/usr/bin/env node
import * as commander from "commander";
const pkg = require("../package.json");
const program = new commander.Command();
import { translate } from "./main";

program
  .version(pkg.version)
  .name("fy")
  .usage("<word>")
  .arguments("<word>")
  .action(function (word) {
    translate(word);
  });

program.parse(process.argv);
