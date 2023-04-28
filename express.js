// Added express server, because github access_token api gives cors error while using on the client side.
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const VUE_APP_GITHUB_CLIENT_ID = "9ed37e434065adc0641f";
const VUE_APP_GITHUB_CLIENT_SECRET = "72118f7ca1b31b3b471c8d934eb0fb8661732105";

app.get("/getAuthCode", async (req, res) => {
  const code = req.query.code;
  const query = `https://github.com/login/oauth/access_token?client_id=${VUE_APP_GITHUB_CLIENT_ID}&client_secret=${VUE_APP_GITHUB_CLIENT_SECRET}&code=${code}`;

  try {
    await fetch(query, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => res.json(data));
  } catch (error) {
    res.status(400).send("Error retrieving access token");
  }
});

app.listen(3000, () => {
  console.log("Express app listening on port 3000");
});
