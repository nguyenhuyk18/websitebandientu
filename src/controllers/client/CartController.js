const cartModels = require('../../services/CartService');

class CartController {
    static addCart = async (req, res) => {
        // Lấy ID và Số lượng
        const id = req.query['id'];
        const qty = req.query['quantity'];
        // console.log(id, ' ', qty)
        let arrResult = null;
        // Khởi tạo cart
        let cart = null;

        const data = req.cookies?.cart ?? null;

        if (!data) {
            cart = new cartModels();
            // Thêm Product vào cart
            arrResult = await cart.addProduct(id, qty);
        }
        else {
            const dataconvert = JSON.parse(data);

            cart = new cartModels(dataconvert.product, dataconvert.total_price, dataconvert.total_product);
            arrResult = await cart.addProduct(id, qty);
        }


        const tmp = {
            product: arrResult[0],
            total_price: arrResult[1],
            total_product: arrResult[2]
        }


        const datasend = JSON.stringify(tmp);
        // console.log(JSON.parse(datasend));
        res.cookie('cart', datasend, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: false
        })
        res.end();
    }


    static updateCart = (req, res) => {
        const id = req.query['id'];
        const qty = req.query['qty'];

        const data = req.cookies.cart ?? null;
        if (!data) res.end();

        const dataParse = JSON.parse(data);

        // KHỞI TẠO ĐỐI TƯỢNG CART 
        const mCart = new cartModels(dataParse.product, dataParse.total_price, dataParse.total_product);
        const newData = mCart.updateProductCart(id, qty);
        const tmp = {
            product: newData[0],
            total_price: newData[1],
            total_product: newData[2]
        }
        // JSON HÓA
        const datasend = JSON.stringify(tmp);

        // ĐEM VÀO COOKIE
        res.cookie('cart', datasend, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: false
        });
        res.end();

    }


    static deleteCart = (req, res) => {
        // LẤY ID SẢN PHẨM MUỐN XÓA
        const id = req.params.id;

        // LẤY COOKIE
        const data = req.cookies.cart ?? null;
        if (!data) res.end();

        // GIẢI JSON SANG OBJECT
        const dataParse = JSON.parse(data);

        // KHỞI TẠO ĐỐI TƯỢNG CART 
        const mCart = new cartModels(dataParse.product, dataParse.total_price, dataParse.total_product);

        // XÓA SP KHỎI CART
        const newData = mCart.deleteProductCart(id);
        const tmp = {
            product: newData[0],
            total_price: newData[1],
            total_product: newData[2]
        }

        // JSON HÓA
        const datasend = JSON.stringify(tmp);

        // ĐEM VÀO COOKIE
        res.cookie('cart', datasend, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: false
        });
        res.end();
    }
}

module.exports = CartController;