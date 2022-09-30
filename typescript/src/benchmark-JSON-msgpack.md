> typescript@1.0.0 benchmark /home/hitalo/Documents/Utils/typescript
> npx ts-node -C ttypescript ./src/benchmark-JSON-msgpack.ts "10000"

operation                                                 |   op    |   ms  |  op/s 
--------------------------------------------------------- | -----:  | ----: | -----:
buf = Buffer(JSON.stringify(obj));                        | 2036700 | 10000 | 203670
obj = JSON.parse(buf);                                    | 2264400 | 10000 | 226440
|
buf = JSON.stringify(obj);                                | 3072800 | 10000 | 307280
obj = JSON.parse(buf);                                    | 4096000 | 10000 | 409600
|
buf = Buffer(TSON.stringify(obj));                        | 1728200 | 10000 | 172820
obj = JSON.parse(buf);                                    | 2213300 | 10000 | 221330
|
buf = TSON.stringify(obj);                                | 2706400 | 10000 | 270640
obj = JSON.parse(buf);                                    | 4061700 | 10000 | 406170
|
buf = require("msgpackr").msgpack.pack(obj);              | 3978400 | 10000 | 397840
obj = require("msgpackr").unpack(buf);                    | 1770800 | 10000 | 177080
|
buf = require("notepack").encode(obj);                    | 2101100 | 10000 | 210110
obj = require("notepack").decode(buf);                    | 1380000 | 10000 | 138000