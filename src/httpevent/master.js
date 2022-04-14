const fs = require("fs");
const child_process = require("child_process");
const koa = require("koa");

const app = new koa();
app.use(async (ctx) => (ctx.response.body = await run(ctx.request.path)));
app.listen(3000);
const a
async function run(path) {
  return new Promise((resolve, reject) => {
    const child = child_process.fork("./child.js");

    child.on("message", resolve);

    console.log("test CR");

    try {
      const fn = fs.readFileSync(`./${path}.js`, { encoding: "utf8" });
      child.send({ action: "run", fn });
    } catch (error) {
      if (error.code === "ENOENT") {
        return resolve("not fond function");
      }
      reject(error.toString());
    }
  });
}
