require("dotenv");
const FCM = require("fcm-node");
const { getAllUsersTokens } = require("../databases/querys");

const serverKey = process.env.SERVERKEY;

const fcm = new FCM(serverKey);

// get all users tokens

async function notifyUserCardapioDeHojeMudou({ almoco, jantar, nome }) {
  const userToken = await getAllUsersTokens((d) => d);
  // console.log(userToken);

  if ((!almoco && !jantar) || !nome) {
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
  } else if (!almoco) {
    // console.log("info:almoco");
    const message = {
      registration_ids: userToken,
      notification: {
        title: "Alteração no cardápio",
        body: "Cardápio do almoço foi alterado.",
        channel_id: "ru_digital",
        channelId: "ru_digital",
      },
    };
    sendNotification(message);
  } else if (!jantar) {
    // console.log("info: jantar");
    const message = {
      registration_ids: userToken,
      notification: {
        title: "Alteração no cardápio",
        body: "Cardápio do jantar foi alterado.",
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
      body: "Oi! O cardápio desta semana já está disponível.",
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
      // console.log("Respponse:! " + response);
    }
  });
}

module.exports = { notifyUserCardapioDeHojeMudou, novoCardapioDaSemana };
