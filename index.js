const axios = require("axios").default;
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
  let result = await axios.get(genereteExtenalUrl("generate-data"));
  createJSON(result.data);
  updateJSON(result.data);
};

const createJSON = async response => {
  await jsonfile.writeFile("answer.json", response, err => {
    if (err) throw err;
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
  let splitData = data.toLowerCase();
  splitData = splitData.split("");
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
  const text = data.toLowerCase();
  sha1.update(text);
  return sha1.digest("hex");
};

const updateJSON = async data => {
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

  sendFile();
};

async function sendFile() {
  const form = new FormData();

  form.append("answer", fs.createReadStream("answer.json"));

  try {
    const response = await axios.post(genereteExtenalUrl("submit-solution"), form, {
      headers: {
        ...form.getHeaders()
      }
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}

callAPI();
