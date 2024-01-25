const axios = require("axios");

//  to get token from code given in redirect url by Aurinko
async function handleCallback(req, res) {
  const { code } = req.body;
  axios
    .post(`https://api.aurinko.io/v1/auth/token/${code}`, "", {
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET
      },
    })
    .then((ress) => {
      res.send(ress?.data);
    });
}

module.exports = {
  handleCallback,
};
