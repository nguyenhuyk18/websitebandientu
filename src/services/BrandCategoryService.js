const pool = require("../database/client");
const brand_category = require('../models/brand_category');

class BrandCategoryService {
    categoryBelongTo = async (id_brand) => {
        // let sql = " "
        try {
            const [result, field] = await pool.execute("SELECT brand.name_brand, category.name_category, category_brand.id_category, category_brand.id_brand FROM category_brand INNER JOIN category ON category_brand.id_category = category.id INNER JOIN brand ON category_brand.id_brand = brand.id WHERE category_brand.id_brand = ?", [id_brand]);
            return result.map(row => {
                return new brand_category(row.id_brand, row.id_category, row.name_category, row.name_brand);
            })
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    destroy = async (id_brand) => {
        try {
            const result = await pool.execute("DELETE FROM `category_brand` WHERE id_brand = ?", [id_brand]);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    save = async (data) => {
        try {
            const result = await pool.execute("INSERT INTO `category_brand` (`id_brand`, `id_category`) VALUES (?, ?)", [data.id_brand, data.id_category]);
            return true;
        }
        catch (err) {
            console.log(data);
            console.log(err);
            return false;
        }
    }


}

module.exports = BrandCategoryService;