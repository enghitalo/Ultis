
> typescript@1.0.0 benchmark
> npx ttsc && node ./dist/benchmark-JSON-msgpack

operation                                                 |   op   |   ms  |  op/s 
--------------------------------------------------------- | -----: | ----: | -----:
buf = Buffer(JSON.stringify(obj));                        | 2163100 | 10000 | 216310
obj = JSON.parse(buf);                                    | 2240400 | 10000 | 224040
| | | |
buf = JSON.stringify(obj);                                | 3454600 | 10000 | 345460
obj = JSON.parse(buf);                                    | 4429900 | 10000 | 442990
| | | |
buf = Buffer(TSON.stringify(obj));                        | 1726600 | 10000 | 172660
obj = JSON.parse(buf);                                    | 2168500 | 10000 | 216850
| | | |
buf = TSON.stringify(obj);                                | 2783200 | 10000 | 278320
obj = JSON.parse(buf);                                    | 4287800 | 10000 | 428780
| | | |
buf = require("msgpackr").pack(obj);                      | 4444100 | 10000 | 444410
obj = require("msgpackr").unpack(buf);                    | 1817500 | 10000 | 181750
| | | |
buf = require("cbor_x").encode(obj);                      | 4351500 | 10000 | 435150
obj = require("cbor_x").decode(buf);                      | 1679400 | 10000 | 167940
| | | |
buf = require("notepack").encode(obj);                    | 2071700 | 10000 | 207170
obj = require("notepack").decode(buf);                    | 1230400 | 10000 | 123040
 
