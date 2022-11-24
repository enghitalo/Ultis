> typescript@1.0.0 benchmark /home/hitalo/Documents/Utils/typescript
> npx ts-node -C ttypescript ./src/benchmark-JSON-msgpack.ts "10000"

operation                                                 |   op   |   ms  |  op/s 
--------------------------------------------------------- | -----: | ----: | -----:
buf = Buffer(JSON.stringify(obj));                        | 2026300 | 10000 | 202630
obj = JSON.parse(buf);                                    | 2087300 | 10000 | 208730
| | | |
buf = JSON.stringify(obj);                                | 3212800 | 10000 | 321280
obj = JSON.parse(buf);                                    | 4006100 | 10000 | 400610
| | | |
buf = Buffer(TSON.stringify(obj));                        | 1806300 | 10000 | 180630
obj = JSON.parse(buf);                                    | 2078300 | 10000 | 207830
| | | |
buf = TSON.stringify(obj);                                | 2758800 | 10000 | 275880
obj = JSON.parse(buf);                                    | 3792800 | 10000 | 379280
| | | |
buf = require("msgpackr").pack(obj);                      | 4401300 | 10000 | 440130
obj = require("msgpackr").unpack(buf);                    | 1652800 | 10000 | 165280
| | | |
buf = require("cbor_x").encode(obj);                      | 4386400 | 10000 | 438640
obj = require("cbor_x").decode(buf);                      | 1650200 | 10000 | 165020
| | | |
buf = require("notepack").encode(obj);                    | 2012000 | 10000 | 201200
obj = require("notepack").decode(buf);                    | 1282500 | 10000 | 128250
 
