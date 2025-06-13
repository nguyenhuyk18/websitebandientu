const laptop = require('../../services/LaptopService');
const brand = require('../../services/BrandService');
const category = require('../../services/CategoryService');
const brand_category = require('../../services/BrandCategoryService');
const dayjs = require('dayjs');
// const path = require('path')
// import fs from "fs";
const fs = require('fs');
const path = require('path')

class LaptopController {
    // xem
    static index = async (req, res) => {
        const mLaptop = new laptop();

        const listLaptop = await mLaptop.getAll();
        // console.log(listLaptop);

        const message = req.session.message;
        delete req.session.message

        return res.render('admin/laptop/index', { listLaptop: listLaptop, message: message });
    }

    // giao diện thêm
    static create = async (req, res) => {
        const mBrand = new brand();
        // const mCategory = new category();

        // Lay danh sach
        const listBrand = await mBrand.getAll();
        // const listCategory = await mCategory.getAll();

        // render
        return res.render('admin/laptop/create', { listBrand: listBrand })

    }

    static detail = async (req, res) => {
        const id = req.params.id;
        const mLaptop = new laptop();

        const tmp = await mLaptop.find(id);

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

        return res.render('admin/laptop/detailproduct', { laptop: tmp });
    }

    // thêm
    static store = async (req, res) => {
        const data = req.body;
        data.image = req.file.filename;
        data.is_delete = 1;
        data.created_date = dayjs().format('YYYY-MM-DD HH:mm:ss');
        // data.discount
        const mLaptop = new laptop();
        if (await mLaptop.save(data)) {
            req.session.message = {
                mess: `Thêm sản phẩm ${req.body.product_name} thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/laptop.html');
            })
            return;
        }
        req.session.message = {
            mess: `Thêm sản phẩm ${req.body.product_name} thất bại !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/laptop.html');
        });
        return;
    }

    // xóa
    static delete = async (req, res) => {
        const id = req.params.id;

        // Lấy thông tin laptop củ
        const mLaptop = new laptop();
        const oldData = await mLaptop.find(id);

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

        // thực hiện việc xóa và trả về kết quả
        if (await mLaptop.destroy(id)) {
            req.session.message = {
                mess: `Xóa sản phẩm ${oldData.product_name} thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/laptop.html');
            });
            return;
        }
        req.session.message = {
            mess: `Xóa sản phẩm ${oldData.product_name} thất bại !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/laptop.html');
        });
    }

    // giao diện sửa
    static edit = async (req, res) => {
        // lấy id
        const id = req.params.id;

        // khởi tạo
        const mBrand = new brand();
        // const mCategory = new category();
        const mLaptop = new laptop();
        const mBrandCategory = new brand_category();



        // lấy danh sách

        // const listCategory = await mCategory.getAll();
        const listBrand = await mBrand.getAll();

        // lấy dữ liệu củ
        const product = await mLaptop.find(id);

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

        // lấy danh sách category thuộc brand mà người dùng chọn
        const cate = await mBrandCategory.categoryBelongTo(product.id_brand);

        // render
        return res.render('admin/laptop/edit', { listBrand: listBrand, listCategory: cate, product: product });

    }

    // sửa
    static update = async (req, res) => {
        const data = req.body;
        const id = req.body.id;
        const mLaptop = new laptop();
        const product = await mLaptop.find(id);
        data.image = product.image;
        // console.log(data);
        // lấy dữ liệu củ


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
        // console.log(data);

        // Cập nhật laptop
        if (await mLaptop.update(data)) {
            req.session.message = {
                mess: `Sửa thông tin laptop có mã là ${data.id} thành công`,
                type: 'success'
            }
            req.session.save(() => {
                return res.redirect('/admin/laptop.html');
            })
            return;
        }

        req.session.message = {
            mess: `Sửa thông tin laptop có mã là ${data.id} thất bại`,
            type: 'danger'
        }
        req.session.save(() => {
            return res.redirect('/admin/laptop.html');
        })

    }
}

module.exports = LaptopController;