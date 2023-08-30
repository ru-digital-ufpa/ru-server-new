// Importe a função isEqual da biblioteca lodash e
// a função findCardapioByDate de um módulo de banco de dados.
const isEqual = require("lodash/isEqual");
const { findCardapioByDate } = require("../databases/querys");

// Defina uma função assíncrona chamada isItNeedToNotify.
async function isItNeedToNotify(oldCardapio, date, next) {
  // Verifique se o objeto oldCardapio não é nulo.
  if (oldCardapio != null) {
    // Busque um novo objeto cardapio para a data fornecida usando a função findCardapioByDate.
    const newCardapio = await findCardapioByDate(date, (e) => e);

    // Compare a propriedade nomeDaRefei do amoço no oldCardapio e no newCardapio.
    const isAlmoco = isEqual(
      oldCardapio.amoco.nomeDaRefei,
      newCardapio.amoco.nomeDaRefei
    );

    // Compare a propriedade nomeDaRefei do jantar no oldCardapio e no newCardapio.
    const isJantar = isEqual(
      oldCardapio.jantar.nomeDaRefei,
      newCardapio.jantar.nomeDaRefei
    );

    // Compare a propriedade nomeDaRefei diretamente no oldCardapio e no newCardapio.
    // const nomeDaRefei = isEqual(
    //   oldCardapio.nomeDaRefei,
    //   newCardapio.nomeDaRefei
    // );

    // console.log(oldCardapio.amoco.nomeDaRefei);

    let almoco;
    let jantar;

    if (!isAlmoco) {
      const old = oldCardapio.amoco.nomeDaRefei;
      const novo = newCardapio.amoco.nomeDaRefei;
      almoco = {
        isAlmocoNeed: true,
        oldAlmoco: old,
        newAlmoco: novo,
      };
    } else {
      almoco = {
        isAlmocoNeed: false,
      };
    }

    if (!isJantar) {
      const old = oldCardapio.jantar.nomeDaRefei;
      const novo = newCardapio.jantar.nomeDaRefei;
      jantar = {
        isJantarNeed: true,
        oldJantar: old,
        newJantar: novo,
      };
    } else {
      jantar = {
        isJantarNeed: false,
      };
    }

    // Retorne um objeto contendo os resultados das três comparações
    // (almoco, jantar, nomeDaRefei) para a função next.
    return next({ almoco, jantar });
  }
}

// Exporte a função isItNeedToNotify para uso em outros módulos.
module.exports = { isItNeedToNotify };
