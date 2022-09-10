const employee_type_descriptor = {
  name: String() || undefined,
  age: Number(),
};

type Employee = typeof employee_type_descriptor;

const json_response = '{"name":"Peter","age":28,"salary":95000.5,"title":2}';

function verifyIfIsEmpty(obj: any): boolean {
  const isEmpty =
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype;

  return isEmpty;
}

function pruneTheLeaves<T>(
  untyped_parse: any,
  descriptor: T,
  show_warn?: boolean
): T {
  const new_typed: any = {};
  for (let key in descriptor) {
    try {
      const val = untyped_parse[key];
      delete untyped_parse[key];

      if (typeof val !== "undefined") {
        new_typed[key] = val;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`could not pick ${key}: ${msg}`);
    }
  }

  if (!verifyIfIsEmpty(untyped_parse) && show_warn) {
    console.warn(
      `\nThe above fields is not used from the json_response \nand need be improved from back-end side. \nThis can result in performance loss\n`,
      untyped_parse
    );
    console.log("");
  }

  /**
   *  This enables JavaScript's automatic processes to remove the variable from memory.
   *  https://javascript.info/garbage-collection
   */
  untyped_parse = null;
  return new_typed;
}

const json_response_decode: Employee = pruneTheLeaves<Employee>(
  JSON.parse(json_response),
  employee_type_descriptor,
  true
);

const json_response_encode = JSON.stringify(json_response_decode);
