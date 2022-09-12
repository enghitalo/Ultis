// managed in user space instead of kernel space, enabling them to work in environments that do not have native thread support.
const os = require("os");
console.log("os.cpus().length: ", os.cpus().length);

console.time("lala");
const promises = [];
for (let index = 0; index < 1000; index++) {
  promises.push(
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(`promise ${index}`), 1000);
    })
  );
}

Promise.all(promises)
  .then((valores) => {
    // console.log(valores);
    console.timeEnd("lala");
  })
  .catch((erro) => {
    console.log(erro.message);
  });
