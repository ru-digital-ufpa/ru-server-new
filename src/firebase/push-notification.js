require("dotenv");
const FCM = require("fcm-node");
const { getAllUsersTokens } = require("../databases/querys");

const serverKey = process.env.SERVERKEY;

const fcm = new FCM(serverKey);

// get all users tokens

/**
 * Notifies users about changes in the cardápio (menu) for today.
 * 
 * @async
 * @param {Object} almoco - The lunch information.
 * @param {Object} jantar - The dinner information.
 * @returns {Promise<void>} - A promise that resolves when the users are notified.
 */
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

/**
 * Sends a notification to all users about the new cardápio (menu) of the week.
 * 
 * @async
 * @returns {Promise<void>} - A promise that resolves when the notification is sent.
 */
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

/**
 * Sends a notification using the Firebase Cloud Messaging service.
 * 
 * @async
 * @param {Object} message - The notification message to send.
 * @returns {Promise<void>} - A promise that resolves when the notification is sent.
 */
async function sendNotification(message) {
  await fcm.send(message, (err, response) => {
    if (err) {
      console.log("Something has gone wrong!" + err.failure);
      console.log("Respponse:! " + response);
    }
  });
}

module.exports = { notifyUserCardapioDeHojeMudou, novoCardapioDaSemana };
