const numeral = require('numeral');
require('numeral/locales/vi');
numeral.locale('vi');

exports.formatMoney = (money) => {
    const formatMoney = numeral(money).format('0,0');
    // const value = formatMoney.replaceAll(',', '.');
    return formatMoney
}