const https = require("https");
const request = require("request");

const EXTERNAL_URL =
  "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=7473b4622f7a261441b38947448e694913433390";

const callAPI = async callback => {
  request(EXTERNAL_URL, { json: true }, (err, res, body) => {
    if (err) {
      return callback(err);
    }
    return callback(body);
  });
};

module.exports = {
  async execute(request, response) {
    callAPI(res => {
      response.json(res);
    });
  }
};
