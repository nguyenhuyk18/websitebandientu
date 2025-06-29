const productModels = require('../models/productall');
const pool = require('../database/client');
class ProductAllServices {
    all = async (cond = null, sort = null, limit = null) => {
        let sql = `SELECT * FROM view_allproduct`;

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        if (sort) {
            sql += ` ORDER BY ${sort}`;
        }


        if (limit) {
            sql += ` LIMIT ${limit}`
        }


        try {
            const [result, fields] = await pool.execute(sql);

            return result.map(row => new productModels(
                row.id,
                row.product_name,
                row.price,
                row.id_category,
                row.stock_quantity,
                row.description,
                row.image,
                row.discount,
                row.discount_from_date,
                row.discount_to_date,
                row.name_brand,
                row.name_category,
                row.sale_price,
                row.is_delete,
                row.created_date,
                row.id_brand,
                row.connection_type,
                row.led,
                row.warranty,
                row.color,
                row.weight_laptop,
                row.DPI,
                row.weight_mouse,
                row.weight_keyboard,
                row.key_durability,
                row.size,
                row.cpu,
                row.ram,
                row.graphics_card,
                row.screen_size,
                row.screen_solution,
                row.operating_system,
                row.release_year
            ));

        } catch (err) {
            console.error(err);
            return [];
        }
    }


    getBy = async (cond = [], sort = [], item_per_page = null, page = null) => {
        // câu lệnh where
        let condition = null; // quantrong
        let conditionArray = [];
        if (cond.length) {
            for (const tmp of cond) {
                // Tên thuộc tính
                const column = Object.keys(tmp);
                // các giá trị
                const values = Object.values(tmp);
                // console.log(value);
                const value = values[0];
                const type = value.type;
                let condistring = `${column} ${type} `;
                const val = value.val;
                if (['LIKE', 'BETWEEN'].includes(type)) {
                    condistring += `${val}`;
                } else {
                    condistring += `'${val}'`;
                }
                conditionArray.push(condistring);
            }
        }

        if (conditionArray.length) {
            condition = conditionArray.join(' AND ');
        }

        // câu lệnh sort
        let sortigation = null;
        let sortArr = [];

        for (const tmp of sort) {
            const column = Object.keys(tmp);
            const value = Object.values(tmp);

            const sortString = `${column} ${value[0]}`;
            sortArr.push(sortString);
        }

        if (sortArr.length) {
            sortigation = sortArr.join(' , ')
        }
        // console.log(sortigation);


        let pageIndex = null;
        let limit = null;
        if (page) {
            pageIndex = page - 1;
        }

        if (pageIndex != null) {
            const start = pageIndex * item_per_page;
            limit = `${start} , ${item_per_page}`;
        }
        // console.log(limit);

        return await this.all(condition, sortigation, limit);
    }


    getByNumber = async (cond = [], sort = [], item_per_page = null, page = null) => {
        // câu lệnh where
        let condition = null; // quantrong
        let conditionArray = [];
        if (cond.length) {
            for (let tmp of cond) {
                // Tên thuộc tính
                const column = Object.keys(tmp);
                // các giá trị
                const values = Object.values(tmp);
                // console.log(value);
                const value = values[0];
                const type = value.type;
                let condistring = `${column} ${type} `;
                const val = value.val;
                if (['LIKE', 'BETWEEN'].includes(type)) {
                    condistring += `${val}`;
                } else {
                    condistring += `'${val}'`;
                }
                conditionArray.push(condistring);
            }
        }

        if (conditionArray.length) {
            condition = conditionArray.join(' AND ');
        }

        // câu lệnh sort
        let sortigation = null;
        let sortArr = [];

        for (let tmp of sort) {
            const column = Object.keys(tmp);
            const value = Object.values(tmp);

            const sortString = `${column} ${value[0]}`;
            sortArr.push(sortString);
        }

        if (sortArr.length) {
            sortigation = sortArr.join(' , ')
        }


        // let pageIndex = null;
        // let limit = null;
        // if (page) {
        //     pageIndex = page - 1;
        // }

        // if (pageIndex) {
        //     const start = pageIndex * item_per_page;
        //     limit = `${start} , ${item_per_page}`;
        // }

        const list = await this.all(condition, sortigation, null);
        // console.log(list);
        return list.length;
    }

    find = async (id) => {
        const cond = ` \`id\` = ${id}`;
        const tmp = await this.all(cond, null, null);
        if (tmp.length == 0) return [];
        return tmp[0];
    }
}

module.exports = ProductAllServices;