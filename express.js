const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const VUE_APP_GITHUB_CLIENT_ID = "";
const VUE_APP_GITHUB_CLIENT_SECRET = "";

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
