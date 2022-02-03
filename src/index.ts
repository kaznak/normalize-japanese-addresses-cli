import { pipeline } from "stream/promises";
import { Command } from "commander";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import { NormalizeJapaneseAddressesCSV } from "lib/stream/normalizeJapaneseAddresses";

function main(indices: Array<number>) {
  return pipeline(
    process.stdin,
    parse(),
    new NormalizeJapaneseAddressesCSV({
      indices,
      normalizerConfig: {
        japaneseAddressesApi: `file://${__dirname}/../dist/japanese-addresses-master/api/ja`,
      },
    }),
    stringify(),
    process.stdout
  );
}

const program = new Command();
program
  .argument("[indices...]", "field indices(1 origin) of CSV")
  .action(async (argIndices: Array<string>) => {
    const indices =
      0 == argIndices.length ? [0] : argIndices.map((i) => parseInt(i) - 1);
    await main(indices);
  });
program.parseAsync().catch((err) => {
  switch (err.code) {
    case "EPIPE":
      process.exit(0);
      break;
    default:
      console.error(err);
      process.exit(128 - err.errno);
  }
});
