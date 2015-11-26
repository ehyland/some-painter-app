require("babel-core/register");

require("./src/server");

if (process.env.NODE_ENV === "development") {
  require("./webpack/server");
}
