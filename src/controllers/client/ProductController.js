const productModels = require('../../services/ProductAllServices');

class ProductController {
    static index = async (req, res) => {
        let conds = [];
        let sorts = [];
        const page = req.query['page'] ?? 1;
        const item_per_page = 9;

        const mProduct = new productModels();


        // phân trang pagination
        const sumOfProduct = await mProduct.getByNumber(conds, sorts);
        const sumOfPage = Math.ceil(Number(sumOfProduct) / Number(item_per_page));
        // console.log(sumOfProduct);



        const listProduct = await mProduct.getBy(conds, sorts, item_per_page, page);


        return res.render('client/product/index', { listProduct: listProduct, sumOfPage: sumOfPage, currentPage: page });
    }

    static detail = async (req, res) => {
        const id = req.params.id;
        // console.log(id);
        const mProduct = new productModels();
        const product = await mProduct.find(id);
        // console.log(product);

        const listImageItem = await product.getImageItem();
        return res.render('client/product/detail', { product: product, listImageItem: listImageItem })
    }
}

module.exports = ProductController