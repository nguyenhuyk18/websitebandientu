const promotionModel = require('../../services/PromotionService');
const categoryModel = require('../../services/CategoryService');
const productModel = require('../../services/ProductService');
// const promotion = require('../../models/promotions');

class PromotionController {
    static index = async (req, res) => {
        const mPromotion = new promotionModel();
        const message = req.session.message;
        delete req.session.message;
        const listPromotion = await mPromotion.getAll();
        return res.render('admin/promotion/index', { listPromotion: listPromotion, message: message })
    }


    static listProductByCategory = async (req, res) => {
        const id = req.params.id;
        // if (!id) return res.json(false);
        const mProduct = new productModel();

        const listProductByCategory = await mProduct.getAll(`id_category = ${id}`);
        if (!(listProductByCategory.length)) {
            return res.json(false);
        }

        return res.json(listProductByCategory);
    }



    static create = async (req, res) => {
        const category = new categoryModel();
        const listCatebgory = await category.getAll();

        return res.render('admin/promotion/create', { listCategory: listCatebgory });
    }

    static store = async (req, res) => {
        const data = req.body;

        const mPromotion = new promotionModel();
        const listPro = await mPromotion.getAll();

        if (listPro.length) {
            const dateExist = new Date(listPro[0].to_date);
            const dateInput = new Date(data.from_date);
            // console.log(dateInput, ' ', dateExist);
            if (dateInput.getTime() <= dateExist.getTime()) {
                req.session.message = {
                    mess: `Bị Trùng Đợt Khuyến Mãi`,
                    type: 'danger'
                }
                req.session.save(() => {
                    res.redirect(`/admin/promotion.html`);
                })
                return;
            }
        }

        let id_product = [];

        if (typeof data.id_product == 'string') {
            id_product.push(data.id_product);
            data.id_product = id_product;
        }




        if (await mPromotion.save(data)) {
            req.session.message = {
                mess: `Thêm khuyến mãi thành công`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect(`/admin/promotion.html`);
            })
            return;
        }

        req.session.message = {
            mess: `Thêm khuyến mãi thất bại`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect(`/admin/promotion.html`);
        })


    }

    static delete = async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const mPromotion = new promotionModel();

        if (await mPromotion.delete(id)) {
            req.session.message = {
                mess: `Xóa khuyến mãi thành công`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect(`/admin/promotion.html`);
            })
            return;
        }
        req.session.message = {
            mess: `Xóa khuyến mãi thất bại`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect(`/admin/promotion.html`);
        })
    }
}

module.exports = PromotionController;