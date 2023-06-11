const express = require("express");
const router = express.Router();

const { isItNeedToNotify } = require("../lodash/verifyIsEqual");
const {
  postCardapio,
  todosOsCardpio,
  dropCollection,
  updateCardapio,
  findCardapioByDate,
  postUsersTokens,
  postNews,
  getNews,
} = require("../databases/querys");

const { getAllCardapio } = require("../cardapio/getCardapio");
const {
  notifyUserCardapioDeHojeMudou,
  novoCardapioDaSemana,
} = require("../firebase/push-notification");

router.get("/", async (req, res) => {
  res.send("ok");
});

router.post("/new", async (req, res) => {
  main();
  res.send("ok");
});

router.get("/api", async (req, res) => {
  const resolute = await todosOsCardpio((doc) => doc);
  if (resolute.length > 5) {
    await dropCollection((e) => {
      if (e) {
        main();
        // notify all users
        novoCardapioDaSemana();
        return;
      }
    });
  }
  res.json(resolute);
});

router.post("/token", async (req, res) => {
  await postUsersTokens(req, (next) => {
    // console.log(next +1);
  });
  res.send("ok");
});

router.post("/drop", async (req, res) => {
  await dropCollection((e) => {
    // console.log(e);
    if (e) {
      main();
      // notify all users
      novoCardapioDaSemana();
      return res.send(e);
    } else {
      res.send(e);
    }
  });
});

router.post("/update", async (req, res) => {
  //for today date
  const date = new Date();
  const toDayDate = `${date.getDate()}-0${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const cardapioDeHoje = await findCardapioByDate(toDayDate, (e) => e);
  //  console.log(cardapioDeHoje);

  await update(async (callback) => {
    await isItNeedToNotify(cardapioDeHoje, toDayDate, (next) => {
      //console.log(next);
      notifyUserCardapioDeHojeMudou({
        almoco: next.almoco,
        jantar: next.jantar,
        nome: next.nomeDaRefei,
      });
    });
    //console.log(callback);
  });
  res.send("ok");
});

router.post("/news", async (req, res) => {
  await postNews(req, res);
});

router.get("/news", async (req, res)=>{
  const resolute = await getNews((doc)=>doc);
  res.json(resolute);
})

async function update(callback) {
  await getAllCardapio(async (next) => {
    await updateCardapio(next, (e) => {
      //console.log(e);
    });
  });
  return callback();
}

function main() {
  getAllCardapio(async (next) => {
    postCardapio(await next, (e) => {
      // console.log("writing cardapio no database");
    });
  });
  return;
}

module.exports = { main, router };
