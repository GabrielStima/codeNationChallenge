const axios = require("axios").default;
const request = require("request-promise");
const jsonfile = require("jsonfile");
const crypto = require("crypto");
const FormData = require("form-data");
const fs = require("fs");
const sha1 = crypto.createHash("sha1");
const token = "7473b4622f7a261441b38947448e694913433390";

const genereteExtenalUrl = route => {
  return `https://api.codenation.dev/v1/challenge/dev-ps/${route}?token=${token}`;
};

const callAPI = async () => {
  let result;

  await axios
    .get(genereteExtenalUrl("generate-data"))
    .then(res => {
      result = res.data;
    })
    .catch(err => {
      console.log(err);
    });

  return result;
};

const createJSON = async response => {
  jsonfile.writeFile("answer.json", response, err => {
    if (err) throw err;
  });
};

const handleJSON = async response => {
  jsonfile.readFile("answer.json", "utf8", (err, data) => {
    if (err) throw err;
    updateJSON(data, response);
  });
};

const decryption = (data, ruleForDecryption) => {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  const splitData = data.split("");
  const regex = /(\W)+/;
  let result = [];

  splitData.map(character => {
    if (!regex.test(character)) {
      const count = alphabet.indexOf(character);
      let countCesar = count - ruleForDecryption;

      (() => {
        if (countCesar < 0) {
          countCesar = Math.abs(countCesar);
        }
      })();

      const correctLetter = alphabet.find((letter, index) => {
        return index === countCesar && letter;
      });

      result.push(correctLetter);
    } else {
      result.push(character);
    }
  });
  result = result.join("");
  return result;
};

const encryptingInSha1 = data => {
  sha1.update(data);
  return sha1.digest("hex");
};

const updateJSON = async (data, response) => {
  const { numero_casas, cifrado, token } = data;
  let { decifrado, resumo_criptografico } = data;

  decifrado = decryption(cifrado, numero_casas);
  resumo_criptografico = encryptingInSha1(decifrado);

  createJSON({
    numero_casas,
    token,
    cifrado,
    decifrado,
    resumo_criptografico
  });
  sendFile(response);
};

const sendFile = async response => {
  const form = new FormData();
  let result;

  form.append("answer", fs.createReadStream("../answer.json"));

  await axios
    .post(genereteExtenalUrl("submit-solution"), form, {
      headers: {
        ...form.getHeaders()
      }
    })
    .then(res => {
      console.log(res.data);
    });
};

module.exports = {
  async execute(request, response) {
    const res = await callAPI();
    createJSON(res).then(() => {
      handleJSON(response);
    });
  }
};
