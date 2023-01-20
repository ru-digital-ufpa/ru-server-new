const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema para criar usaurío.
const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

//Schema para creiar reclama aqui.
const reclamaAquiSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    curso: {
      type: String,
    },
    setor: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Schema para creiar feedback.
const feedbackiSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    msg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Schema para creiaar cardapio.
const cadapioSchema = new Schema(
  {
    dia: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      require: true,
      unique: true,
    },
    amoco: {
      refeicao: {
        type: String,
        require: true,
      },
      nomeDaRefei: {
        type: String,
      },
      ingredintes: {
        amo1: {
          type: String,
        },
        amo2: {
          type: String,
        },
        amo3: {
          type: String,
        },
        amo4: {
          type: String,
        },
        amo5: {
          type: String,
        },
      },
      vegetariano1: {
        type: String,
      },
    },
    jantar: {
      refeicao: {
        type: String,
        require: true,
      },
      nomeDaRefei: {
        type: String,
      },
      ingredintes: {
        jan1: {
          type: String,
        },
        jan2: {
          type: String,
        },
        jan3: {
          type: String,
        },
        jan4: {
          type: String,
        },
        jan5: {
          type: String,
        },
      },
      vegetariano2: {
        type: String,
      },
    },
  }
  // {
  //   timestamps: true,
  // }
);

const postUsersTokens = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", usersSchema);
const Cardapio = mongoose.model("cadapio", cadapioSchema);
const Reclama = mongoose.model("reclamaAqui", reclamaAquiSchema);
const Feedback = mongoose.model("feedback", feedbackiSchema);
const UsersTokens = mongoose.model("tokens", postUsersTokens);

//exportar o modolar
module.exports = {
  User,
  Cardapio,
  Reclama,
  Feedback,
  UsersTokens,
};
