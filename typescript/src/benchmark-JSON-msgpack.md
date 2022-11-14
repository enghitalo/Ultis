> typescript@1.0.0 benchmark /home/hitalo/Documents/Utils/typescript
> npx ts-node -C ttypescript ./src/benchmark-JSON-msgpack.ts "10000"

operation                                                 |   op    |   ms  |  op/s 
--------------------------------------------------------- | -----:  | ----: | -----:
buf = Buffer(JSON.stringify(obj));                        | 2004900 | 10000 | 200490
obj = JSON.parse(buf);                                    | 2221700 | 10000 | 222170
| | | |
buf = JSON.stringify(obj);                                | 3254100 | 10000 | 325410
obj = JSON.parse(buf);                                    | 4136800 | 10000 | 413680
| | | |
buf = Buffer(TSON.stringify(obj));                        | 1854400 | 10000 | 185440
obj = JSON.parse(buf);                                    | 2216900 | 10000 | 221690
| | | |
buf = TSON.stringify(obj);                                | 3089500 | 10000 | 308950
obj = JSON.parse(buf);                                    | 4279500 | 10000 | 427950
| | | |
buf = require("msgpackr").pack(obj);                      | 4741200 | 10000 | 474120
obj = require("msgpackr").unpack(buf);                    | 1707200 | 10000 | 170720
| | | |
buf = require("cbor_x").encode(obj);                      | 4579800 | 10000 | 457980
obj = require("cbor_x").decode(buf);                      | 1706600 | 10000 | 170660
| | | |
buf = require("notepack").encode(obj);                    | 2034900 | 10000 | 203490
obj = require("notepack").decode(buf);                    | 1339200 | 10000 | 133920