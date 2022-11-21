
> typescript@1.0.0 benchmark
> npx ttsc && node ./dist/benchmark-JSON-msgpack

operation                                                 |   op   |   ms  |  op/s 
--------------------------------------------------------- | -----: | ----: | -----:
buf = Buffer(JSON.stringify(obj));                        | 1244500 | 10000 | 124450
obj = JSON.parse(buf);                                    | 1568800 | 10000 | 156880
| | | |
buf = JSON.stringify(obj);                                | 1829700 | 10000 | 182970
obj = JSON.parse(buf);                                    | 3287000 | 10000 | 328700
| | | |
buf = Buffer(TSON.stringify(obj));                        | 1502800 | 10000 | 150280
obj = JSON.parse(buf);                                    | 1576300 | 10000 | 157630
| | | |
buf = TSON.stringify(obj);                                | 2573800 | 10000 | 257380
obj = JSON.parse(buf);                                    | 3361900 | 10000 | 336190
| | | |
buf = require("msgpackr").pack(obj);                      | 4007600 | 10000 | 400760
obj = require("msgpackr").unpack(buf);                    | 1470000 | 10000 | 147000
| | | |
buf = require("cbor_x").encode(obj);                      | 4051000 | 10000 | 405100
obj = require("cbor_x").decode(buf);                      | 1602200 | 10000 | 160220
| | | |
buf = require("notepack").encode(obj);                    | 1888900 | 10000 | 188890
obj = require("notepack").decode(buf);                    | 1062700 | 10000 | 106270
 
