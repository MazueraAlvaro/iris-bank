"use strict";
const mainController = require("./controllers/main.controller");
mainController
  .init()
  .then((resp) => console.log(resp))
  .catch((err) => console.error(err));
