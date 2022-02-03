# normalize-japanese-addresses-cli

[![npm version](https://badge.fury.io/js/normalize-japanese-addresses-cli.svg)](https://badge.fury.io/js/normalize-japanese-addresses-cli)

CLI of [@geolonia/normalize-japanese-addresses](https://github.com/geolonia/normalize-japanese-addresses) developed by [Geolonia](https://geolonia.com/)

## Install

```
yarn add normalize-japanese-addresses-cli
```

## Usage

```
Usage: normalize-japanese-addresses [options] [indices...]

Arguments:
  indices     field indices(1 origin) of CSV

Options:
  -h, --help  display help for command
```

## Example

```
$ cat tmp/test.csv
address
北海道札幌市西区24-2-2-3-3
$ normalize-japanese-addresses 1 < tmp/test.csv
address,pref.1,city.1,town.1,addr.1,lat.1,lng.1,level.1
北海道札幌市西区24-2-2-3-3,北海道,札幌市西区,二十四軒二条二丁目,3-3,43.074273,141.315099,3
```

## Related work

- [YUUKIToriyama/geolonian](https://github.com/YUUKIToriyama/geolonian)
