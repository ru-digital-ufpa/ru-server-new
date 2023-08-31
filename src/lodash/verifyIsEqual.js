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

    // Declare variáveis para armazenar informações sobre o almoço e o jantar.
    let almoco;
    let jantar;

    // Verifique se é necessário fazer algo para o almoço (isAlmoco é uma variável que deve ser definida anteriormente).
    if (!isAlmoco) {
      // Se for necessário fazer algo para o almoço, obtenha o nome antigo e novo do cardápio.
      const old = oldCardapio.amoco.nomeDaRefei;
      const novo = newCardapio.amoco.nomeDaRefei;

      // Crie o objeto almoco com informações sobre o almoço.
      almoco = {
        isAlmocoNeed: true, // Indica que é necessário fazer algo para o almoço.
        oldAlmoco: old, // Nome antigo do almoço.
        newAlmoco: novo, // Nome novo do almoço.
      };
    } else {
      // Se não for necessário fazer nada para o almoço, crie um objeto almoco com isAlmocoNeed definido como falso.
      almoco = {
        isAlmocoNeed: false, // Indica que não é necessário fazer nada para o almoço.
      };
    }

    // Repita o mesmo processo para o jantar.
    if (!isJantar) {
      const old = oldCardapio.jantar.nomeDaRefei;
      const novo = newCardapio.jantar.nomeDaRefei;

      jantar = {
        isJantarNeed: true, // Indica que é necessário fazer algo para o jantar.
        oldJantar: old, // Nome antigo do jantar.
        newJantar: novo, // Nome novo do jantar.
      };
    } else {
      jantar = {
        isJantarNeed: false, // Indica que não é necessário fazer nada para o jantar.
      };
    }

    // Retorne um objeto contendo os resultados das três comparações
    // (almoco, jantar, nomeDaRefei) para a função next.
    return next({ almoco, jantar });
  }
}

// Exporte a função isItNeedToNotify para uso em outros módulos.
module.exports = { isItNeedToNotify };
