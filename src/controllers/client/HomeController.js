const brandModels = require('../../services/BrandService');
const productModels = require('../../services/ProductAllServices');


class HomeController {
    static index = async (req, res) => {
        const sort = [];
        const cond = [];

        const message = req.session.message;
        delete req.session.message;

        const mBrand = new brandModels();
        const mProduct = new productModels();

        const listBrand = await mBrand.getAll();
        const listProduct = await mProduct.getBy();



        const productByCategory = [];

        const allProduct = await mProduct.getBy(cond, sort, 6, 1);
        let dem = 0;
        for (const brand of listBrand) {
            let products = [];
            dem = 0;
            // console.log(dem);
            for (const product of listProduct) {
                if (product.id_brand == brand.id) {
                    if (dem < 6) {
                        products.push(product);
                    }
                    dem++;
                }

            }

            productByCategory.push({
                brand: brand,
                product: products
            })
        }
        // console.log(productByCategory);

        sort.push({
            created_date: 'DESC'
        })

        const listLatestProduct = await mProduct.getBy(cond, sort, 4, 1)
        // console.log(productByCategory);
        // console.log(listLatestProduct.length);


        return res.render('client/home/index', { listLatestProduct: listLatestProduct, listBrand: listBrand, productByCategory: productByCategory, allProduct: allProduct, message: message });
    }
}

module.exports = HomeController