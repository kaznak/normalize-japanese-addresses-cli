import { Transform, TransformCallback, TransformOptions } from "stream";
import { config, normalize } from "@geolonia/normalize-japanese-addresses";

type normalizeResultKey =
  | "pref"
  | "city"
  | "town"
  | "addr"
  | "lat"
  | "lng"
  | "level";
const normalizeResultKeys: Array<normalizeResultKey> = [
  "pref",
  "city",
  "town",
  "addr",
  "lat",
  "lng",
  "level",
];

interface NormalizeJapaneseAddressesCSVOptions extends TransformOptions {
  index?: number;
  indices?: Array<number>;
  header?: boolean;
  japaneseAddressAttrs?: Array<normalizeResultKey>;
  normalizerConfig?: Partial<typeof config>;
}

const normalizeJapaneseAddressesCSVOptionsDefaultValue = {
  indices: [],
  header: true,
  normalizeResultKeys,
  normalizerConfig: {},
};

export class NormalizeJapaneseAddressesCSV extends Transform {
  indices: Array<number>;
  header: boolean;
  normalizeResultKeys: Array<normalizeResultKey>;
  constructor(options: NormalizeJapaneseAddressesCSVOptions = {}) {
    const innerOptions = {
      ...normalizeJapaneseAddressesCSVOptionsDefaultValue,
      ...options,
    };
    super({ ...innerOptions, objectMode: true });

    const indices = new Set(innerOptions.indices);
    if (undefined != innerOptions.index) {
      indices.add(innerOptions.index);
    }
    this.indices = Array.from(indices).sort();

    this.header = innerOptions.header;

    this.normalizeResultKeys = innerOptions.normalizeResultKeys;

    if (options.normalizerConfig?.japaneseAddressesApi) {
      config.japaneseAddressesApi =
        options.normalizerConfig.japaneseAddressesApi;
    }
    /* This can not pass type check.
    Object.entries(options.normalizerConfig as typeof config).forEach(
      ([key, value]) => (config[key] = value)
    );
    */
  }
  _transform(
    record: Array<unknown>,
    _: BufferEncoding,
    callback: TransformCallback
  ): void {
    if (this.header) {
      const headers = this.indices.flatMap((i) =>
        this.normalizeResultKeys.map((attr) => `${attr}.${i + 1}`)
      );
      callback(null, record.concat(headers));
      this.header = false;
    } else {
      Promise.all(this.indices.map((i) => normalize(record[i] as string))).then(
        (addrObjs) => {
          const addrRecord = addrObjs.flatMap((addrObj) =>
            this.normalizeResultKeys.map((attr) => addrObj[attr])
          );
          callback(null, record.concat(addrRecord));
        }
      );
    }
  }
}
