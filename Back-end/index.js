require("dotenv").config;
const { DbConection } = require("./src/database/db");
const { app } = require("./src/app");
DbConection()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server Running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("database conection failed", err);
  });
