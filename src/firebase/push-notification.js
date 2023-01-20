require("dotenv");
const FCM = require("fcm-node");
const { postUsersTokens, getAllUsersTokens } = require("../databases/querys");

const serverKey = process.env.SERVERKEY;

const fcm = new FCM(serverKey);

async function notifyUserCardapioDeHojeMudou() {
  const userToken = await getAllUsersTokens((d) => d);
  console.log(userToken);
  const message = {
    registration_ids: userToken,
    notification: {
      title: "NotifcatioTestAPP",
      body: "Message from node js app",
    },

    data: {
      //you can send only notification or only data(or include both)
      title: "ok cdfsdsdfsd",
      body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}',
    },
  };

  fcm.send(message, (err, response) => {
    if (err) {
      console.log("Something has gone wrong!" + err);
      console.log("Respponse:! " + response);
    } else {
      // showToast("Successfully sent with response");
      console.log("Successfully sent with response: ", response);
    }
  });
}

module.exports = { notifyUserCardapioDeHojeMudou };
