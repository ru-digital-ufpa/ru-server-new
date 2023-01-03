const { User, Cardapio, Reclama, Feedback } = require("./schema");
const fs = require("fs");

async function postCadapio(dados, next) {
  
  const novoCadapio = new Cardapio({
    dia: dados.dia[0],
    data: dados.dia[1],
    amoco: {
      refeicao: "ALMOÇO",
      nomeDaRefei: dados.almoco[0],
      ingredintes: {
        amo1: dados.almoco[3],
        amo2: dados.almoco[4],
        amo3: dados.almoco[5],
        amo4: dados.almoco[6],
        amo5: dados.almoco[7],
      },
      vegetariano1: dados.almoco[2],
    },
    jantar: {
      refeicao: "JANTAR",
      nomeDaRefei: dados.jantar[0],
      ingredintes: {
        jan1: dados.almoco[3],
        jan2: dados.almoco[4],
        jan3: dados.almoco[5],
        jan4: dados.almoco[6],
        jan5: dados.almoco[7],
      },
      vegetariano2: dados.almoco[2],
    },
  });

  await novoCadapio.save((err, doc) => {
    if (err) {
      updateCardapio(dados, next);
      //console.log(err);
      return err;
    }
    return next(doc);
  });
}

async function todosOsReclameAqui(next) {
  const rs = await Reclama.find((e, d) => d).clone();
  return next(rs);
}

async function todosOscardpio(next) {
  const rs = await Cardapio.find((e, d) => d).clone();
  return next(rs);
}

async function findCardapioByIde(_id, next) {
  const cadapio = await Cadapio.findById({ _id });
  return next(cadapio);
}

async function updateCardapio(dados, next) {
 
  const toUpdate = {
    dia: dados.dia[0],
    data: dados.dia[1],
    amoco: {
      refeicao: "ALMOÇO",
      nomeDaRefei: dados.almoco[0],
      ingredintes: {
        amo1: dados.almoco[3],
        amo2: dados.almoco[4],
        amo3: dados.almoco[5],
        amo4: dados.almoco[6],
        amo5: dados.almoco[7],
      },
      vegetariano1: dados.almoco[2],
    },
    jantar: {
      refeicao: "JANTAR",
      nomeDaRefei: dados.jantar[0],
      ingredintes: {
        jan1: dados.almoco[3],
        jan2: dados.almoco[4],
        jan3: dados.almoco[5],
        jan4: dados.almoco[6],
        jan5: dados.almoco[7],
      },
      vegetariano2: dados.almoco[2],
    },
  };
  await Cardapio.findOneAndUpdate({ data: dados.dia[1] },toUpdate, (err, duc) => {
    if (err) {
      console.log(err);
    }
    return next(duc);
  }).clone();

  //return next(duc);
}

async function crioReclamaAqui(req, res) {
  const { nome, email, curso, setor, msg } = req.body;
  const newReclamaAqui = new Reclama({
    nome: nome,
    email: email,
    curso: curso,
    setor: setor,
    msg: msg,
  });

  try {
    await newReclamaAqui.save().then((e) => {
      return res.status(200).json({ msy: "ok" });
    });
  } catch (err) {
    return res.status(404).json({ msy: "ok" });
  }
}

async function dropCollection(next) {
  Cardapio.collection
    .drop()
    .then(() => next())
    .catch((err) => console.error(err));
}

async function crioFeedback(req, res) {
  const { nome, email, msg } = req.body;
  const newFeedback = new Feedback({
    nome: nome,
    email: email,

    msg: msg,
  });

  try {
    await newFeedback.save().then((e) => {
      return res.status(200).json({ msy: "ok" });
    });
  } catch (err) {
    return res.status(404).json({ msy: "ok" });
  }
}

module.exports = {
  postCadapio,
  todosOsReclameAqui,
  todosOscardpio,
  findCardapioByIde,
  crioReclamaAqui,
  crioFeedback,
  updateCardapio,
  dropCollection,
};
