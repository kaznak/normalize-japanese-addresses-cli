import { Command } from "commander";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import { NormalizeJapaneseAddressesCSV } from "lib/stream/normalizeJapaneseAddresses";

function main(indices: Array<number>) {
  process.stdin
    .pipe(parse())
    .pipe(new NormalizeJapaneseAddressesCSV({ indices }))
    .pipe(stringify())
    .pipe(process.stdout);
}

const program = new Command();
program
  .argument("[indices...]", "field indices of CSV")
  .action((argIndices: Array<string>) => {
    const indices =
      0 == argIndices.length ? [0] : argIndices.map((i) => parseInt(i) - 1);
    return main(indices);
  });
program.parse();
