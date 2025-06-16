const numeral = require('numeral');
const slugify = require('slugify');

require('numeral/locales/vi');
numeral.locale('vi');

exports.formatMoney = (money) => {
    const formatMoney = numeral(money).format('0,0');
    // const value = formatMoney.replaceAll(',', '.');
    return formatMoney
}


exports.getCurrentRoute = (requestPath) => {

    // /san-pham.html => san-pham.html 
    path = requestPath.startsWith('/') ? requestPath.slice(1) : requestPath
    // console.log(path);
    if (path === '') {
        return 'home';
    }

    // console.log(path);

    if (path === 'san-pham.html') {
        return 'product';
    }



    if (path.match(/^san-pham/)) {
        return 'productDetail';
    }
}


exports.getSlugName = (name) => {
    const newName = slugify(name, {
        replacement: "-",
        lower: true
    });
    return newName;
}