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

main([0]);
