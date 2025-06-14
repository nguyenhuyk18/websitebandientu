const client = require('../database/client');
const promotions = require('../models/promotions');
// const promotionsevent = require('../models/promotionevents');
// cái này dùng để in ra cho đầy đủ thuộc tính của sản phẩm
const productallservice = require('../services/ProductAllServices');
// cái này dùng để sửa
const productservice = require('../services/ProductService');
class PromotionService {
    getAll = async () => {
        const query = 'SELECT * FROM promotions ORDER BY to_date DESC';
        try {
            const [rows] = await client.execute(query);
            return rows.map(row => new promotions(row.id, row.title, row.content, row.discount, row.from_date, row.to_date));
        } catch (error) {
            console.error('Error fetching promotions:', error);
            return [];
        }
    }

    listProductByPromotion = async (id_promotion) => {
        // viet lenh query
        const query = 'SELECT * FROM `promotion_product` WHERE id_promotion = ?';
        try {
            const [rows] = await client.execute(query, [id_promotion]);
            // khoi tao
            const mProduct = new productallservice();

            return rows.map(async (row) => {
                const cond = {
                    id: {
                        type: '=',
                        val: row.id,
                    }
                };
                return await mProduct.getBy(cond, null, null, null);
            })
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    save = async (data) => {
        const mProduct = new productservice();
        console.log(data);
        try {
            const [rows, fields] = await client.execute('INSERT INTO promotions (title, content, discount, from_date, to_date) VALUES (?, ?, ?, ?, ?)', [data.title, data.content, data.discount, data.from_date, data.to_date]);

            const id_promotion = rows.insertId;

            for (const product of data.id_product) {
                // console.log(product);
                console.log("Đã gọi updateDiscount")
                await mProduct.updateDiscount(data.discount, data.from_date, data.to_date, product);

                const [rows1, fields1] = await client.execute('INSERT INTO promotion_product (id_promotion, id_product) VALUES (?, ?)', [id_promotion, product]);
            }

            return true;

        } catch (err) {
            console.error('Error saving promotion:', err);
            return false;
        }
    }


    delete = async (id) => {
        const mProduct = new productservice();
        console.log(id);
        try {
            const query = 'SELECT * FROM `promotion_product` WHERE id_promotion = ?';
            const [rows] = await client.execute(query);
            for (const row of rows) {
                await mProduct.updateDiscount(null, null, null, row.id_product);
            }

            // Xóa các sản phẩm liên kết với chương trình khuyến mãi
            await client.execute('DELETE FROM promotions WHERE id = ?', [id]);

            return true;
        } catch (err) {
            console.error('Error deleting promotion:', err);
            return false;
        }
    }

    update = async (data) => {
        const mProduct = new productservice();
        try {
            const [rows, fields] = await client.execute('UPDATE promotions SET title = ?, content = ?, discount = ?, from_date = ?, to_date = ? WHERE id = ?', [data.title, data.content, data.discount, data.from_date, data.to_date, data.id]);

            // Xóa các sản phẩm cũ liên kết với chương trình khuyến mãi
            await client.execute('DELETE FROM promotion_product WHERE id_promotion = ?', [data.id]);

            // Thêm lại các sản phẩm mới
            for (const product of data.id_product) {
                await mProduct.updateDiscount(product, data.discount, data.from_date, data.to_date);
                await client.execute('INSERT INTO promotion_product (id_promotion, id_product) VALUES (?, ?)', [data.id, product]);
            }

            return true;
        } catch (err) {
            console.error('Error updating promotion:', err);
            return false;
        }
    }
}

module.exports = PromotionService;