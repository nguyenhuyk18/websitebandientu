const keyboard = require('../../services/KeyboardService');
const brand = require('../../services/BrandService');
const dayjs = require('dayjs');
const category = require('../../services/CategoryService');

// const brand_category = require('../../services/BrandCategoryService');

const fs = require('fs');
const path = require('path')

class KeyboardController {
    // xem
    static index = async (req, res) => {
        const mKeyboard = new keyboard();

        const listKeyboard = await mKeyboard.getAll();

        const message = req.session.message;
        delete req.session.message

        return res.render('admin/keyboard/index', { listKeyboard: listKeyboard, message: message });
    }

    // giao diện thêm
    static create = async (req, res) => {
        const mBrand = new brand();
        const mCategory = new category();

        // Lay danh sach
        const listBrand = await mBrand.getAll();
        const listCategory = await mCategory.getAll();

        // const listCategory = await mCategory.getAll();

        return res.render('admin/keyboard/create', { listBrand: listBrand, listCategory: listCategory })

    }

    static detail = async (req, res) => {
        const id = req.params.id;
        const mKeyboard = new keyboard();

        const tmp = await mKeyboard.find(id);
        if (!tmp) {
            req.session.message = {
                mess: `Sản Phẩm Không Tồn Tại Vui Lòng KHÔNG SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            })
            return;
        }

        return res.render('admin/keyboard/detailproduct', { keyboard: tmp });
    }

    // thêm
    static store = async (req, res) => {
        const data = req.body;
        data.image = req.file.filename;
        data.is_delete = 1; // mặc định là 1
        data.created_date = dayjs().format('YYYY-MM-DD HH:mm:ss');
        // console.log(data);
        const mKeyboard = new keyboard();
        if (await mKeyboard.save(data)) {
            req.session.message = {
                mess: `Thêm sản phẩm ${req.body.product_name} thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/keyboard.html');
            })
            return;
        }

        req.session.message = {
            mess: `Thêm sản phẩm ${req.body.product_name} thất bại !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/keyboard.html');
        });
        return;
    }

    // xóa
    static delete = async (req, res) => {
        const id = req.params.id;

        const mKeyboard = new keyboard();
        const oldData = await mKeyboard.find(id);
        if (!oldData) {
            req.session.message = {
                mess: `Sản Phẩm Không Tồn Tại Vui Lòng KHÔNG SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            })
            return;
        }

        // Xóa ảnh củ
        // const oldimage = oldData.image;
        // const imagePath = path.join(__dirname, '..', '..', '..', 'public', 'upload', oldimage);
        // fs.unlink(imagePath, (err) => {
        //     if (err) console.log('Không thể xóa ảnh cũ:', err);
        // });

        if (await mKeyboard.destroy(id)) {
            req.session.message = {
                mess: `Xóa sản phẩm ${oldData.product_name} thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/keyboard.html');
            });
            return;
        }
        req.session.message = {
            mess: `Xóa sản phẩm ${oldData.product_name} thất bại !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/keyboard.html');
        });
    }

    // giao diện sửa
    static edit = async (req, res) => {
        // lấy id
        const id = req.params.id;

        // khởi tạo
        const mBrand = new brand();
        // const mBrandCategory = new brand_category();
        const mKeyboard = new keyboard();
        const mCategory = new category();

        // lấy danh sách
        const listBrand = await mBrand.getAll();
        const listCategory = await mCategory.getAll();
        // lấy dữ liệu củ
        const product = await mKeyboard.find(id);
        if (!product) {
            req.session.message = {
                mess: `Sản Phẩm Không Tồn Tại Vui Lòng KHÔNG SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            })
            return;
        }
        // const cate = await mBrandCategory.categoryBelongTo(product.id_brand);

        // render
        return res.render('admin/keyboard/edit', { listBrand: listBrand, listCategory: listCategory, product: product });

    }

    // sửa
    static update = async (req, res) => {
        const data = req.body;
        const id = req.body.id;

        const mKeyboard = new keyboard();
        const product = await mKeyboard.find(id);
        data.image = product.image; // ảnh củ

        // Xóa ảnh củ
        if (typeof req.file != 'undefined') {
            const oldimage = product.image;
            const imagePath = path.join(__dirname, '..', '..', '..', 'public', 'upload', 'product', oldimage);
            fs.unlink(imagePath, (err) => {
                if (err) console.log('Không thể xóa ảnh cũ:', err);
            });
            data.image = req.file.filename; // ảnh mới
        }

        if (await mKeyboard.update(data)) {
            req.session.message = {
                mess: `Sửa thông tin bàn phím có mã là ${data.id} thành công`,
                type: 'success'
            }
            req.session.save(() => {
                return res.redirect('/admin/keyboard.html');
            })
            return;
        }

        req.session.message = {
            mess: `Sửa thông tin bàn phím có mã là ${data.id} thất bại`,
            type: 'danger'
        }
        req.session.save(() => {
            return res.redirect('/admin/keyboard.html');
        })

    }
}

module.exports = KeyboardController;