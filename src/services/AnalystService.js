const pool = require('../database/client');
class AnalystService {

	statisticsByQuantity = async () => {
		// thống kê số lượng laptop bán đc
		let sql1 = `SELECT
	SUM(order_item.qty) AS \`Tong So Luong LAPTOP\`
    FROM
	product
	INNER JOIN
	order_item
	ON 
    product.id = order_item.product_id
	INNER JOIN
	laptop
	ON 
    product.id = laptop.id
		INNER JOIN 
	\`order\`
	on order_item.order_id = \`order\`.id
	WHERE \`order\`.order_status_id = 5
        `;

		// thống kê số lượng bàn phím bán đc
		let sql2 = `		
SELECT
	SUM(order_item.qty) AS \`Tong So Luong Ban Phim\`
FROM
	product
	INNER JOIN
	order_item
	ON 
		product.id = order_item.product_id
	INNER JOIN
	keyboard
	ON 
		product.id = keyboard.id
		INNER JOIN 
	\`order\`
	on order_item.order_id = \`order\`.id
	WHERE \`order\`.order_status_id = 5
		`;


		// thống kê số lượng chuot ban dc
		let sql3 = `
        SELECT
	SUM(order_item.qty) AS \`Tong So Luong Chuot\`
FROM
	product
	INNER JOIN
	order_item
	ON 
		product.id = order_item.product_id
	INNER JOIN
	mouse
	ON 
		product.id = mouse.id
		INNER JOIN 
	\`order\`
	on order_item.order_id = \`order\`.id
	WHERE \`order\`.order_status_id = 5
        `;


		try {
			const [laptopRs, fields1] = await pool.execute(sql1);
			const [keyboardRs, fields2] = await pool.execute(sql2);
			const [mouseRs, fields3] = await pool.execute(sql3);

			// console.log(laptopRs, ' ', keyboardRs, ' ', mouseRs);
			return {
				"Laptop": laptopRs[0]['Tong So Luong LAPTOP'],
				"Chuột": mouseRs[0]['Tong So Luong Chuot'],
				"Bàn Phím": keyboardRs[0]['Tong So Luong Ban Phim']
			}
		} catch (err) {
			console.log(err);
			return {
				"Laptop": 0,
				"Chuột": 0,
				"Bàn Phím": 0
			}
		}

	}

	analByVenue = async () => {
		// thống kê số lượng laptop bán đc
		let sql1 = `SELECT
	SUM(order_item.total_price) AS \`tong so tien laptop\`
FROM
	product
	INNER JOIN
	order_item
	ON 
		product.id = order_item.product_id
	INNER JOIN
	laptop
	ON 
		product.id = laptop.id
				INNER JOIN 
	\`order\`
	on order_item.order_id = \`order\`.id
	WHERE \`order\`.order_status_id = 5
        `;

		// thống kê số lượng bàn phím bán đc
		let sql2 = `		
SELECT
	SUM(order_item.total_price) AS \`tong so tien banphim\`
FROM
	product
	INNER JOIN
	order_item
	ON 
		product.id = order_item.product_id
	INNER JOIN
	keyboard
	ON 
		product.id = keyboard.id
				INNER JOIN 
	\`order\`
	on order_item.order_id = \`order\`.id
	WHERE \`order\`.order_status_id = 5
		`;


		// thống kê số lượng chuot ban dc
		let sql3 = `
        SELECT
	SUM(order_item.total_price) AS \`tong so tien chuot\`
FROM
	product
	INNER JOIN
	order_item
	ON 
		product.id = order_item.product_id
	INNER JOIN
	mouse	
	ON 
		product.id = mouse.id
		INNER JOIN 
	\`order\`
	on order_item.order_id = \`order\`.id
	WHERE \`order\`.order_status_id = 5
        `;


		try {
			const [laptopRs, fields1] = await pool.execute(sql1);
			const [keyboardRs, fields2] = await pool.execute(sql2);
			const [mouseRs, fields3] = await pool.execute(sql3);

			// console.log(laptopRs, ' ', keyboardRs, ' ', mouseRs);
			return {
				"Laptop": laptopRs[0]['tong so tien laptop'],
				"Chuột": mouseRs[0]['tong so tien chuot'],
				"Bàn Phím": keyboardRs[0]['tong so tien banphim']
			}
		} catch (err) {
			console.log(err);
			return {
				"Laptop": 0,
				"Chuột": 0,
				"Bàn Phím": 0
			}
		}
	}

	allNewOrder = async () => {
		const sql = `
		SELECT * FROM \`order\` WHERE order_status_id = 1
		`
		try {
			const [result] = await pool.execute(sql);
			return result.length;
		} catch (err) {
			console.log(err);
			return 0;
		}
	}




	allNewConversation = async () => {
		const sql = `
		SELECT * FROM \`conversation\` WHERE is_read_admin = 2
		`;


		try {
			const [result] = await pool.execute(sql);
			return result.length;
		} catch (err) {
			console.log(err);
			return 0;
		}
	}

}

module.exports = AnalystService