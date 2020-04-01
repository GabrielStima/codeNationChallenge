# Cryptography of Julius Caesar

## Resume

This project was a challenge suggested by [CodeNation](https://www.codenation.dev/). A platform that makes challenges facing the programming area for free and in those challenges if you have the score proposed by them, you will have a training course in the challenge area.

The challenge I participated in was for the React course, but within the challenge any language could be used.

The goal of the challenge was to make an application that would receive a JSON:

{
"numero_casas": 10,
"token":"token_do_usuario",
"cifrado": "texto criptografado",
"decifrado": "aqui vai o texto decifrado",
"resumo_criptografico": "aqui vai o resumo"
}

And from that JSON, the **arquivo.json** that would be used in the rest of the application.

The platform challenge description that says the following:

> The first step is to save the JSON content in a file named **answer.json**, which you will use for the rest of the challenge.
>
> You must use the number of places to decipher the text and update the JSON file, in the **decrypted** field.
>
> The next step is to generate a cryptographic summary of the deciphered text using the **sha1** algorithm and update the JSON file again.
>
> OBS: you can use any cryptography library in your favorite programming language to generate the **sha1** summary of the deciphered text.

The encryption method was **Cryptography of Julius Caesar** which consists of having a number and from that number change the letters according to their position in the alphabet plus the number.

After this is done, the .json file should be placed inside a Form-data and sent.

## Application

The application for being extremely simple builds it in **node.js** if you want to see it working you can clone it and in package.json there are 2 commands:

1º- default;
2º- codenation;

If you execute **1º** it will run the application and in the console print the contents of the file **answer.json** (File quoted in the summary) already changed with the complete information;

If you execute **2º** it will make the requests for the codenation API and return the score obtained after their algorithm validates. (In this **2º** I cannot guarantee the execution because I do not know if these routes will be exposed until the date you are looking at);

### Dependencies used

"axios": "0.19.2" -> Used to contact the codenation API;

"cross-env": "7.0.2" -> Used to create the environment variable to execute the **1st** command;

"form-data": "3.0.0" -> Used to create the Form-data instance that is not the default node;

"jsonfile": "6.0.1" ->Used to create and read the **answer.json** file;
