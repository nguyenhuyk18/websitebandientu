const product = require('../../services/ProductService');
class ProductController {
    static index = async (req, res) => {
        const mProduct = new product();

        const listProduct = await mProduct.getAll();
        // console.log(listProduct)
        const message = req.session.message;
        delete req.session.message;

        return res.render('admin/image_item/index', { listProduct: listProduct, message: message });
    }
}

module.exports = ProductController;