const brand = require("../../services/BrandService");
const category = require('../../services/CategoryService');
const brand_category = require('../../services/BrandCategoryService');
// const brand = require("../../models/brand")

class BrandController {
    static index = async (req, res) => {
        const mBrand = new brand();
        const listBrand = await mBrand.getAll();
        const message = req.session.message
        delete req.session.message;
        // console.log(listBrand[0].name_brand);
        return res.render('admin/brand/index', { listBrand: listBrand, message: message });
    }

    static provideCategory = async (req, res) => {
        // Lấy id của brand
        const id = req.params.id;
        const mBrandCategory = new brand_category();
        // const mBrand = new brand();


        // lấy danh sách danh mục
        const mCategory = new category();
        const listCategory = await mCategory.getAll();
        const tmp = await mBrandCategory.categoryBelongTo(id);
        const listIDCategory = tmp.map(row => { return row.id_category });
        // tìm kiếm brand
        const mBrand = new brand();
        const br = await mBrand.find(id);

        if (!br) {
            req.session.message = {
                mess: `Thương Hiệu Không Tồn Tại Vui Lòng KHÔNG SỬA ĐƯỜNG LINK URL!!!   `,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            })
            return
        }

        // render giao diện
        res.render('admin/brand/provide', { brand: br, listCategory: listCategory, listIDCategory: listIDCategory })
    }
    // { id_brand: '15', id_category: [ '3', '7' ] }
    static saveCategoryOfBrand = async (req, res) => {
        // Lấy dữ liệu cần thiết
        const id_brand = req.body.id_brand;
        let arrCategory = [];

        // Người dùng chỉ chọn 1 category
        if (typeof req.body.id_category == 'string') {
            arrCategory.push(req.body.id_category);
        }
        // người dùng chọn nhiều category
        else if (typeof req.body.id_category == 'object') {
            for (const idcate of req.body.id_category) {
                arrCategory.push(idcate);
            }
        }
        // người dùng kh chọn category nào 
        else {
            arrCategory.push();
        }

        const mBrandCategory = new brand_category();

        // Xóa Toàn Bộ Mối Quan hệ giữa brand và category
        if (await mBrandCategory.destroy(id_brand) == false) {
            req.session.message = {
                mess: `Cập nhật thương hiệu cung cấp danh mục thất bại 1`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/brand.html');
            })
            return;
        }

        // thêm mới mối quan hệ
        if (typeof arrCategory != 'undefined') {
            for (const id_category of arrCategory) {
                const tmp = {
                    id_brand: id_brand,
                    id_category: id_category
                };
                if (await mBrandCategory.save(tmp) == false) {
                    req.session.message = {
                        mess: `Cập nhật thương hiệu cung cấp danh mục thất bại 2`,
                        type: 'danger'
                    }
                    req.session.save(() => {
                        res.redirect('/admin/brand.html');
                    })
                    return;
                }
            }
        }


        // trả về đúng redirect
        req.session.message = {
            mess: `Cập nhật thương hiệu cung cấp danh mục thành công`,
            type: 'success'
        }
        req.session.save(() => {
            res.redirect('/admin/brand.html');
        })
        // res.redirect('/admin/brand.html');
    }

    static edit = async (req, res) => {
        const id = req.params.id;
        const mBrand = new brand();
        const br = await mBrand.find(id);

        if (!br) {
            req.session.message = {
                mess: `Thương Hiệu Không Tồn Tại Vui Lòng KHÔNG SỬA ĐƯỜNG LINK URL!!!   `,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            })
            return
        }

        // console.log(br)

        return res.render('admin/brand/edit', { brand: br });
    }

    static update = async (req, res) => {
        const data = req.body;
        // console.log()
        const mBrand = new brand();
        const oldData = await mBrand.find(data.id)

        if (await mBrand.update(data)) {
            req.session.message = {
                mess: `Sửa thương hiệu từ tên ${oldData.name_brand} sang ${data.name_brand} thành công`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/brand.html');
            })
            return;
        }

        req.session.message = {
            mess: `Sửa thương hiệu từ tên ${oldData.name_brand} sang ${data.name_brand} thất bại`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/brand.html');
        })
        return;
    }

    static create = async (req, res) => {
        // const mBrand = new brand();
        return res.render('admin/brand/create');
    }

    static store = async (req, res) => {
        const mBrand = new brand();
        const data = req.body;
        if (await mBrand.save(data)) {
            req.session.message = {
                mess: `Thêm thương hiệu ${data.name_brand} thành công !!`,
                type: 'success'
            };
            req.session.save(() => {
                res.redirect('/admin/brand.html');
            });
            return;
        }
        req.session.message = {
            mess: `Thêm thương hiệu ${data.name_brand} thất bại vui lòng xem lại !!!`,
            type: 'danger'
        };
        req.session.save(() => {
            res.redirect('/admin/brand.html');
        });
        return;
    }

    static delete = async (req, res) => {
        const id = req.params.id;
        const mBrand = new brand();
        const br = await mBrand.find(id);
        if (!br) {
            req.session.message = {
                mess: `Thương Hiệu Không Tồn Tại Vui Lòng KHÔNG SỬA ĐƯỜNG LINK URL!!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            })
            return
        }

        // console.log(br)
        if (await mBrand.destroy(id)) {
            req.session.message = {
                mess: `Xóa thương hiệu ${br.name_brand} thành công`,
                type: "success"
            }
            req.session.save(() => {
                res.redirect('/admin/brand.html');
            });
            return;
        }

        req.session.message = {
            mess: `Xóa thương hiệu ${br.name_brand} thất bại`,
            type: "danger"
        }
        req.session.save(() => {
            res.redirect('/admin/brand.html');
        });
        return;

    }
}

module.exports = BrandController;