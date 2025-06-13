const brand = require('../../services/BrandService');
const category = require('../../services/CategoryService');
const brand_category = require('../../services/BrandCategoryService')

class BrandCategoryController {
    static getCategory = async (req, res) => {
        // Lấy id brand
        const id_brand = req.params.id;

        // khởi tạo
        const mCategory = new category();
        const mbrand_category = new brand_category();

        // Lấy danh sách danh mục của brand
        const bc = await mbrand_category.categoryBelongTo(id_brand);

        // Lấy ra category chi tiết
        // const cate = await mCategory.find(bc.id_category);
        // const mBrand = new brand()
        const listIDCate = await bc.map((row) => {
            // const cate = await mCategory.find(row.id_category);
            return {
                id: row.id_category,
                name_category: row.name_category
            }
        });
        // console.log(listIDCate);

        res.json(listIDCate);
    }
}

module.exports = BrandCategoryController;