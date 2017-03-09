'use strict';

import moment from 'moment';

const helpers = {
  verifyDateIsValid
}

function verifyDateIsValid(date, format) {
  const dateConvert = moment(date, format);
  return dateConvert.isValid();
}

export default helpers;
