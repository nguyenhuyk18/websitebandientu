const mouse = require('../../services/MouseService');
const brand = require('../../services/BrandService');
const category = require('../../services/CategoryService');
// const brand_category = require('../../services/BrandCategoryService');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path')

class MouseController {
    // xem
    static index = async (req, res) => {
        const mMouse = new mouse();

        const listMouse = await mMouse.getAll();

        const message = req.session.message;
        delete req.session.message

        return res.render('admin/mouse/index', { listMouse: listMouse, message: message });
    }

    // xem chi tiết
    static detail = async (req, res) => {
        // lấy id
        const id = req.params.id;

        // khởi tạo
        const mMouse = new mouse();

        // lấy dữ liệu
        const product = await mMouse.find(id);

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

        // render
        return res.render('admin/mouse/detailproduct', { mouse: product });
    }

    // giao diện thêm
    static create = async (req, res) => {
        const mBrand = new brand();
        const mCategory = new category();

        // Lay danh sach
        const listBrand = await mBrand.getAll();
        const listCategory = await mCategory.getAll();

        return res.render('admin/mouse/create', { listBrand: listBrand, listCategory: listCategory })

    }

    // thêm
    static store = async (req, res) => {
        const data = req.body;
        data.image = req.file.filename;
        const mMouse = new mouse();
        data.is_delete = 1; // mặc định là 1
        data.created_date = dayjs().format('YYYY-MM-DD HH:mm:ss');
        if (await mMouse.save(data)) {
            req.session.message = {
                mess: `Thêm sản phẩm ${req.body.product_name} thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/mouse.html');
            })
            return;
        }

        req.session.message = {
            mess: `Thêm sản phẩm ${req.body.product_name} thất bại !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/mouse.html');
        });
        return;
    }

    // xóa
    static delete = async (req, res) => {
        const id = req.params.id;

        const mMouse = new mouse();
        const oldData = await mMouse.find(id);

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

        if (await mMouse.destroy(id)) {
            req.session.message = {
                mess: `Xóa sản phẩm ${oldData.product_name} thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/mouse.html');
            });
            return;
        }
        req.session.message = {
            mess: `Xóa sản phẩm ${oldData.product_name} thất bại !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/mouse.html');
        });
    }

    // giao diện sửa
    static edit = async (req, res) => {
        // lấy id
        const id = req.params.id;

        // khởi tạo
        const mBrand = new brand();
        const mMouse = new mouse();
        const mCategory = new category();

        // lấy danh sách
        const listBrand = await mBrand.getAll();
        const listCategory = await mCategory.getAll();

        // lấy dữ liệu củ
        const product = await mMouse.find(id);
        // const cate = await mBrandCategory.categoryBelongTo(product.id_brand);
        // console.log(cate);

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


        // render
        return res.render('admin/mouse/edit', { listBrand: listBrand, listCategory: listCategory, mouse: product });

    }

    // sửa
    static update = async (req, res) => {
        const data = req.body;
        // console.log(req.body);
        // res.redirect('/admin/mouse.html');
        // return;
        const id = req.body.id;
        const mMouse = new mouse();
        const product = await mMouse.find(id);
        data.image = product.image; // ảnh củ

        // Xóa ảnh củ
        if (typeof req.file != 'undefined') {
            const oldimage = product.image;
            // const imagePath = path.join(__dirname, '..', '..', '..', 'public', 'upload', oldimage);
            const imagePath = path.join(__dirname, '..', '..', '..', 'public', 'upload', 'product', oldimage);
            fs.unlink(imagePath, (err) => {
                if (err) console.log('Không thể xóa ảnh cũ:', err);
            });
            data.image = req.file.filename;
        }

        if (await mMouse.update(data)) {
            req.session.message = {
                mess: `Sửa thông tin mouse có mã là ${data.id} thành công`,
                type: 'success'
            }
            req.session.save(() => {
                return res.redirect('/admin/mouse.html');
            })
            return;
        }

        req.session.message = {
            mess: `Sửa thông tin mouse có mã là ${data.id} thất bại`,
            type: 'danger'
        }
        req.session.save(() => {
            return res.redirect('/admin/mouse.html');
        })

    }
}

module.exports = MouseController;