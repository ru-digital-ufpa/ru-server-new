const express = require("express");
const router = express.Router();
const {
  postCadapio,
  todosOscardpio,
  dropCollection,
  updateCardapio,
} = require("../databases/querys");

const { getAllCardapio } = require("../cardapio/getCardapio");

function drop() {
  dropCollection(async (dc) => {
    await dc;
  });
}

function update() {
  getAllCardapio(async (next) => {
    updateCardapio(await next, (dc) => {
      console.log(dc);
    });
  });
}

function main() {
  getAllCardapio(async (next) => {
    postCadapio(await next, (e) => {
      console.log(e);
    });
  });
}

router.get("/api", async (req, res) => {
  const resolut = await todosOscardpio((doc) => doc);
  res.json(resolut);
});

module.exports = { main, drop, router, update };
