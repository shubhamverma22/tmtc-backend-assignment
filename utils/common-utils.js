function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateNumber(number) {
  // const phoneno = /^\d{10}$/;
  const phoneno = /^\d+$/;
  return phoneno.test(number);
}

function isValidDate(date) {
  if (!date) {
    return false;
  }
  return !isNaN(new Date(date).getTime());
}

function convertToDisplayString(str) {
  return str
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (firstLetter) => firstLetter.toUpperCase());
}

module.exports = {
  validateEmail,
  validateNumber,
  isValidDate,
  convertToDisplayString,
};
