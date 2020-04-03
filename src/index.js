const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const db = require("./service/db.json");

const client = new Client();

client.on("qr", qr => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", msg => {
  if (msg.body.toLowerCase() == "informações corona") {
    msg.reply(`💡Chatbot com informações dos casos de Corona Vírus 💡
    
Dados do Ministério da Saúde e OMS      

    👇 Escolha a opcão a baixo: 👇

    1️⃣ *Informações no Brasil* 
    2️⃣ *Informações nos Estados(BR)*
    3️⃣ *Informações no Mundo*
    `);
  }
  switch (msg.body) {
    case "1":
      msg.reply(`Casos do Corona Vírus no 🇧🇷 

        😷 Confirmados: *${db.brazilData.confirmed}* 🤒
        🙌 Recuperados: *${db.brazilData.recovered}* 💪
        ⚰️ Mortos: *${db.brazilData.deaths}* 💀

      `);
      break;

    case "2":
      msg.reply(`Digite o estado (Ex: 'MG')`);
      break;

    case "3":
      msg.reply(`Casos do Corona Vírus no Mundo

        😷 Confirmados: *${db.worldData.confirmed}* 🤒
        🙌 Recuperados: *${db.worldData.recovered}* 💪
        ⚰️ Mortos: *${db.worldData.deaths}* 💀
        `);
      break;

    default:
      break;
  }

  if (msg.body.length === 2) {
    let state = db.statesData.data.find(
      sigla => sigla.uf === msg.body.toUpperCase()
    );

    msg.reply(`Casos de Corona vírus em ${state.state}
      😷 Confirmados: *${state.cases}* 🤒
      ⚰️ Mortos: *${state.deaths}* 💀
      ⚠️ Suspeitos: *${state.suspects}* ⚠️
    `);
  }
});

client.initialize();
