const pool = require("../database/client");
const comment = require("../models/comment");

class CommentService {
    getAll = async (cond = null) => {
        let sql = `SELECT
                    \`comment\`.id,
                    \`comment\`.email,
                    \`comment\`.fullname,
                    \`comment\`.product_id,
                    \`comment\`.star,
                    \`comment\`.created_date,
                    \`comment\`.description,
                    product.product_name
                    FROM
                    \`comment\`
                    INNER JOIN product ON \`comment\`.product_id = product.id
                    `;
        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, field] = await pool.execute(sql);
            return result.map(row => {
                return new comment(row.id, row.product_id, row.email, row.fullname, row.star, row.created_date, row.description, row.product_name);
            })
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    update = async (data) => {
        try {
            const result = await pool.execute("UPDATE `comment` SET `email` = ? , `fullname` = ? , `star` = ?  , `description` = ? WHERE id = ?", [data.email, data.fullname, data.star, data.description, data.id]);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    save = async (data) => {
        // const { product_id , email, fullname , star ,  } = data;

        try {
            const result = await pool.execute("INSERT INTO `comment` (`product_id`, `email`, `fullname`, `star`, `created_date` , `description` ) VALUES (? , ? , ? , ? , ? , ?) ", [data.product_id, data.email, data.fullname, data.star, data.created_date, data.description]);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    destroy = async (id) => {
        try {
            const result = await pool.execute('DELETE FROM `comment` WHERE id = ?', [id]);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    find = async (id) => {
        const cond = ` comment.id = ${id}`;
        const tmp = await this.getAll(cond);
        // console.log(tmp);
        if (tmp.length == 0) {
            return false;
        }
        const comment = tmp[0];
        return comment;
    }


    findByProductID = async (product_id) => {
        const cond = ` product_id = ${product_id}`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        return tmp;
    }




}

module.exports = CommentService;