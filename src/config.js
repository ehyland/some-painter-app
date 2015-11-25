import merge from "lodash.merge";
import commonConf from "./configs/common.conf";

let envConf;

if (process.env.NODE_ENV === "development") {
  envConf = require("./configs/dev.conf");
}
else {
  envConf = require("./configs/prod.conf");
}

export default merge(commonConf, envConf)
