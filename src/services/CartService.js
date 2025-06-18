const productModels = require('./ProductService');

class CartService {
    constructor(product = [], total_price = 0, total_product = 0) {
        this.product = product;
        this.total_price = total_price;
        this.total_product = total_product;
    }


    addProduct = async (id, qty) => {
        const mProduct = new productModels();
        const product = await mProduct.findByID(id);

        const obj = {
            id_product: product.id,
            image: product.image,
            name: product.product_name,
            price: product.sale_price,
            qty: qty,
            total: qty * product.sale_price
        }

        return await this.addCart(obj);
    }

    addCart = async (obj) => {
        let check = 0;
        if (this.product.length) {
            for (const pro of this.product) {
                if (Object.keys(pro)[0] == obj.id_product) {
                    check++;
                    const arr = Object.values(pro)[0];
                    arr.qty = Number(arr.qty) + Number(obj.qty);
                    arr.total = Number(arr.total) + (Number(obj.qty) * Number(arr.price));
                    break;
                }
            }
        }
        if (check == 0) {
            this.product.push({
                [obj.id_product]: {
                    image: obj.image,
                    name: obj.name,
                    price: obj.price,
                    qty: obj.qty,
                    price: obj.price,
                    total: obj.total,
                }
            })
        }


        this.total_product = this.product.length;
        this.total_price = Number(this.total_price) + (Number(obj.qty) * Number(obj.price));

        return [this.product, this.total_price, this.total_product];
    }


    updateProductCart = (id, qty) => {
        for (const pro of this.product) {
            if (Object.keys(pro)[0] == id) {
                const arr = Object.values(pro)[0];
                // if (Number(qty) > Number(arr.qty)) {
                // xem độ tăng lên
                const step = Number(qty) - Number(arr.qty);
                // cộng vào qty
                arr.qty = Number(arr.qty) + Number(step);
                // cộng vào total
                arr.total = Number(arr.total) + (Number(step) * Number(arr.price));
                // cộng vào tổng giá
                this.total_price = Number(this.total_price) + (Number(step) * Number(arr.price));
            }
        }
        return [this.product, this.total_price, this.total_product];
    }

    deleteProductCart = (id) => {
        this.product = this.product.filter(item => {
            const idpro = Object.keys(item)[0];
            return idpro != id
        });

        this.total_product -= 1;
        this.total_price = 0;
        for (const pro of this.product) {
            const arr = Object.values(pro)[0];
            this.total_price += arr.total;
        }

        return [this.product, this.total_price, this.total_product];
    }
}

module.exports = CartService;