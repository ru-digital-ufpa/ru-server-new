const bcrypt = require("bcrypt");
const { User, Cadapio, Reclama, Feedback } = require("./schema");
const fs = require("fs");
const { reject } = require("bcrypt/promises");

async function findUser(userInfo) {
  const email = userInfo.email;
  const user = await User.findOne({ email });
  return user;
}

async function findUserByIde(_id) {
  const user = await User.findById({ _id });
  return user;
}

async function validateUser(email, username) {
  const verifyUser = await User.findOne(
    { $or: [{ email }, { username }] },
    (err, doc) => {
      if (err) {
        return err;
      }
      return doc;
    }
  ).clone();
  return verifyUser;
}

async function criaNovoUsario(reqBody) {
  const encryptedPassword = await bcrypt.hash(reqBody.password, 10);
  const admin = reqBody.codigo;
  const codigoServidor = process.env.CODIGO_ADMIN;

  const adminCodigo = codigoServidor === admin;

  if (!adminCodigo) {
    return reject("O codigo da admin incorreto");
  }
  const newUser = new User({
    name: reqBody.name,
    username: reqBody.username,
    email: reqBody.email,
    password: encryptedPassword,
    profileimage: null,
  });

  try {
    const saveNewUser = await newUser.save();
    return saveNewUser;
  } catch (err) {
    return err;
  }
}

async function postCadapio(req, next) {
  const id = req.session.passport.user.id;

  const findUserIfexist = await findUserByIde(id);
  const cadapJa = req.body.data;
  const cadapioJaexiste = await Cadapio.findOne({ data: cadapJa });
  if (!findUserIfexist) {
    return;
  }
  if (cadapioJaexiste) {
    return reject({
      err1: "Verifique !!...",
      err2: "A data do cardapio já existe.",
    });
  }

  const {
    data,
    refeicao1,
    nomeDaRefeiAmo,
    amo1,
    amo2,
    amo3,
    amo4,
    amo5,
    refeicao2,
    vegetariano1,
    nomeDaRefeiJan,
    jan1,
    jan2,
    jan3,
    jan4,
    jan5,
    vegetariano2,
  } = req.body;

  const novoCadapio = new Cadapio({
    data: data,
    amoco: {
      refeicao: refeicao1,
      nomeDaRefei: nomeDaRefeiAmo,
      ingredintes: {
        amo1: amo1,
        amo2: amo2,
        amo3: amo3,
        amo4: amo4,
        amo5: amo5,
      },
      vegetariano1: vegetariano1,
    },
    jantar: {
      refeicao: refeicao2,
      nomeDaRefei: nomeDaRefeiJan,
      ingredintes: {
        jan1: jan1,
        jan2: jan2,
        jan3: jan3,
        jan4: jan4,
        jan5: jan5,
      },
      vegetariano2: vegetariano2,
    },
    admin: id,
  });

  await novoCadapio.save((err, doc) => {
    if (err) {
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
  const rs = await Cadapio.find((e, d) => d).clone();
  return next(rs);
}

async function findCardapioByIde(_id, next) {
  const cadapio = await Cadapio.findById({ _id });
  return next(cadapio);
}

async function updateCardapio(req, next) {
  const id = req.params.id;

  const findCardapiofexist = await findCardapioByIde(id, (e) => e);

  if (findCardapiofexist !== null) {
    const {
      data,
      refeicao1,
      nomeDaRefeiAmo,
      amo1,
      amo2,
      amo3,
      amo4,
      amo5,
      refeicao2,
      vegetariano1,
      nomeDaRefeiJan,
      jan1,
      jan2,
      jan3,
      jan4,
      jan5,
      vegetariano2,
    } = req.body;

    const toUpdate = {
      data: data,
      amoco: {
        refeicao: refeicao1,
        nomeDaRefei: nomeDaRefeiAmo,
        ingredintes: {
          amo1: amo1,
          amo2: amo2,
          amo3: amo3,
          amo4: amo4,
          amo5: amo5,
        },
        vegetariano1: vegetariano1,
      },
      jantar: {
        refeicao: refeicao2,
        nomeDaRefei: nomeDaRefeiJan,
        ingredintes: {
          jan1: jan1,
          jan2: jan2,
          jan3: jan3,
          jan4: jan4,
          jan5: jan5,
        },
        vegetariano2: vegetariano2,
      },
    };

    await Cadapio.findByIdAndUpdate({ _id: id }, toUpdate, (err, duc) => {
      if (err) {
        console.log(err);
      }
    }).clone();
  }
  return next();
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
  Cadapio.collection.drop()
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
  findUser,
  findUserByIde,
  validateUser,
  criaNovoUsario,
  postCadapio,
  todosOsReclameAqui,
  todosOscardpio,
  findCardapioByIde,
  crioReclamaAqui,
  crioFeedback,
  updateCardapio,
  dropCollection,
};
