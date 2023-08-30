require("dotenv");
const FCM = require("fcm-node");
const { getAllUsersTokens } = require("../databases/querys");

const serverKey = process.env.SERVERKEY;

const fcm = new FCM(serverKey);

// get all users tokens

async function notifyUserCardapioDeHojeMudou({ almoco, jantar }) {
  const userToken = await getAllUsersTokens((d) => d);
  // console.log(userToken);

  if ((almoco.isAlmocoNeed && jantar.isJantarNeed)) {
    const message = {
      registration_ids: userToken,
      notification: {
        title: "Alteração no cardápio",
        body: "Cardápio do almoço e jantar foram alterados.",
        channelId: "ru_digital",
        channel_id: "ru_digital",
      },
      
    };
    sendNotification(message);
  } else if (almoco.isAlmocoNeed) {
    // console.log("info:almoco");
    const message = {
      registration_ids: userToken,
      notification: {
        title: "Cardápio do almoço foi alterado.",
        body: "De " + almoco.oldAlmoco + " para " + almoco.newAlmoco,
        channel_id: "ru_digital",
        channelId: "ru_digital",
      },
    };
    sendNotification(message);
  } else if (jantar.isJantarNeed) {
    // console.log("info: jantar");
    const message = {
      registration_ids: userToken,
      notification: {
        title: "Cardápio do jantar foi alterado.",
        body: "De " + jantar.oldJantar + " para " + jantar.newJantar,
        channelId: "ru_digital",
        channel_id: "ru_digital",
        // android_channel_id: "your_channel_id",
      },
      // data: { route: "TodoCardapioScreen" },
    };
    sendNotification(message);
  }
}

//if we have new cardapio for the week.
async function novoCardapioDaSemana() {
  // get user token
  const userToken = await getAllUsersTokens((d) => d);
  // console.log(userToken);
  const message = {
    registration_ids: userToken,
    notification: {
      title: "Novo cardápio da semana",
      body: "Olá! O cardápio desta semana já está disponível.",
      channelId: "ru_digital",
      channel_id: "ru_digital",
    },
  };
  // to send notification to all registered users.
  sendNotification(message);
}

async function sendNotification(message) {
  await fcm.send(message, (err, response) => {
    if (err) {
      console.log("Something has gone wrong!" + err.failure);
      console.log("Respponse:! " + response);
    }
  });
}

module.exports = { notifyUserCardapioDeHojeMudou, novoCardapioDaSemana };
