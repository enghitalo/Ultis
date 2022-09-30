#!/usr/bin/env node
type Example = {
  int0: number;
  int1: number;
  "int1-": number;
  int8: number;
  "int8-": number;
  int16: number;
  "int16-": number;
  int32: number;
  "int32-": number;
  nil: any;
  true: boolean;
  false: boolean;
  float: number;
  "float-": number;
  string0: string;
  string1: string;
  string4: string;
  string8: string;
  string16: string;
  array0: any[];
  array1: string[];
  array8: number[];
  map0: any;
  map1: {
    foo: string;
  };
};

var msgpack_node = try_require("msgpack");
// var msgpack_lite = try_require("../index");
// var msgpack_js = try_require("msgpack-js");
// var msgpack_js_v5 = try_require("msgpack-js-v5");
var msgpack5 = try_require("msgpack5");
// var msgpack_unpack = try_require("msgpack-unpack");
var msgpack_codec = try_require("msgpack.codec");
var notepack = try_require("notepack");
var msgpackr = try_require("msgpackr");
// var TSON = try_require("typescript-json");
import TSON from "typescript-json";

msgpack5 = msgpack5 && msgpack5();
msgpack_codec = msgpack_codec && msgpack_codec.msgpack;

var pkg = require("../package.json");
var data = require("./test/example");
// var packed = msgpack_lite.encode(data);
var expected = JSON.stringify(data);

var argv = Array.prototype.slice.call(process.argv, 2);

if (argv[0] === "-v") {
  console.warn(pkg.name + " " + pkg.version);
  process.exit(0);
}

var limit = 10000;
if (argv[0] - 0) limit = argv.shift() - 0;
limit *= 1;

var COL1 = 57;
var COL2 = 6;
var COL3 = 5;
var COL4 = 6;

console.log(
  rpad("operation", COL1),
  "|",
  "  op  ",
  "|",
  "  ms ",
  "|",
  " op/s "
);
console.log(
  rpad("", COL1, "-"),
  "|",
  lpad(":", COL2, "-"),
  "|",
  lpad(":", COL3, "-"),
  "|",
  lpad(":", COL4, "-")
);

var buf, obj;

if (JSON) {
  buf = bench("buf = Buffer(JSON.stringify(obj));", JSON_stringify_for_buffer, data);
  obj = bench("obj = JSON.parse(buf);", JSON.parse, buf);
  console.log("|");
  test(obj);
  buf = bench("buf = JSON.stringify(obj);", JSON_stringify, data);
  obj = bench("obj = JSON.parse(buf);", JSON.parse, buf);
  test(obj);
  
}

if (TSON) {
  console.log("|");
  buf = bench(
    "buf = Buffer(TSON.stringify(obj));",
    TSON_stringify_for_buffer,
    data
  );
  obj = bench("obj = JSON.parse(buf);", JSON.parse, buf);
  console.log("|");
  buf = bench(
    "buf = TSON.stringify(obj);",
    TSON_stringify,
    data
  );
  obj = bench("obj = JSON.parse(buf);", JSON.parse, buf);
  // test(obj);
}

if (msgpackr) {
  console.log("|");
  buf = bench(
    'buf = require("msgpackr").msgpack.pack(obj);',
    msgpackr.pack,
    data
  );

  obj = bench(
    'obj = require("msgpackr").unpack(buf);',
    msgpackr.unpack,
    buf
  );
  test(obj);
}

if (notepack) {
  console.log("|");
  buf = bench('buf = require("notepack").encode(obj);', notepack.encode, data);
  obj = bench('obj = require("notepack").decode(buf);', notepack.decode, buf);
  test(obj);
}

// if (msgpack_lite) {
//   console.log(" ");
//   buf = bench(
//     'buf = require("msgpack-lite").encode(obj);',
//     msgpack_lite.encode,
//     data
//   );
//   obj = bench(
//     'obj = require("msgpack-lite").decode(buf);',
//     msgpack_lite.decode,
//     packed
//   );
//   test(obj);
// }

// if (msgpack_node) {
//   console.log(" ");
//   buf = bench('buf = require("msgpack").pack(obj);', msgpack_node.pack, data);
//   obj = bench(
//     'obj = require("msgpack").unpack(buf);',
//     msgpack_node.unpack,
//     buf
//   );
//   test(obj);
// }

console.log(" ");
function JSON_stringify_for_buffer(src: any) {
  return Buffer.from(JSON.stringify(src));
}

function JSON_stringify(src: any) {
  return JSON.stringify(src);
}

function TSON_stringify_for_buffer(src: Example) {
  return Buffer.from(TSON.stringify<Example>(src));
}
function TSON_stringify(src: Example) {
  return TSON.stringify<Example>(src);
}

function bench(name: any, func: any, src: any) {
  if (argv.length) {
    var match = argv.filter(function (grep) {
      return name.indexOf(grep) > -1;
    });
    if (!match.length) return SKIP;
  }
  var ret, duration: any;
  var start = new Date();
  var count = 0;
  while (1) {
    var end = new Date();
    duration = Number(end) - Number(start);
    if (duration >= limit) break;
    while (++count % 100) ret = func(src);
  }
  name = rpad(name, COL1);
  var score = Math.floor((count / duration) * 1000);
  count = lpad(count, COL2);
  duration = lpad(duration, COL3);
  score = lpad(score, COL4);
  console.log(name, "|", count, "|", duration, "|", score);
  return ret;
}

function rpad(str: any | any[], len: number, chr?: string) {
  if (!chr) chr = " ";
  while (str.length < len) str += chr;
  return str;
}

function lpad(
  str: any | number | any[] | undefined,
  len: number,
  chr?: string | undefined
): any {
  if (!chr) chr = " ";
  str += "";
  while (str.length < len) str = chr + str;
  return str;
}

function test(actual: string) {
  // if (actual === SKIP) return;
  actual = JSON.stringify(actual);
  if (actual === expected) return;
  console.warn("expected: " + expected);
  console.warn("actual:   " + actual);
}

function SKIP() {}

function try_require(name: string) {
  try {
    return require(name);
  } catch (e) {
    // ignore
  }
}
