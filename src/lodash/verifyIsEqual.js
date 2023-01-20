const _ = require("lodash");
const { findCardapioByDate } = require("../databases/querys");

async function isItNeedToNotify(a, date, next) {
  const b = await findCardapioByDate(date, (e) => e);

  return next(_.isEqual(a, b));
}

module.exports = { isItNeedToNotify };
