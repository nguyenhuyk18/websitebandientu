const brandModels = require('../../services/BrandService');
const productModels = require('../../services/ProductAllServices');


class HomeController {
    static index = async (req, res) => {
        const sort = [];
        const cond = [];

        const mBrand = new brandModels();
        const mProduct = new productModels();

        const listBrand = await mBrand.getAll();
        const listProduct = await mProduct.getBy();



        const productByCategory = [];

        const allProduct = await mProduct.getBy(cond, sort, 6, 1);

        for (const brand of listBrand) {
            let products = [];
            let dem = 0;
            for (const product of listProduct) {
                dem++;
                if (dem < 6) {
                    if (product.id_brand == brand.id) {
                        products.push(product);
                    }
                }
            }
            productByCategory.push({
                brand: brand,
                product: products
            })
        }


        sort.push({
            created_date: 'DESC'
        })

        const listLatestProduct = await mProduct.getBy(cond, sort, 4, 1)
        // console.log(productByCategory);
        console.log(listLatestProduct.length);


        return res.render('client/home/index', { listLatestProduct: listLatestProduct, listBrand: listBrand, productByCategory: productByCategory });
    }
}

module.exports = HomeController