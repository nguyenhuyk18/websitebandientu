const category = require('../../services/CategoryService');

class CategoryController {
    static index = async (req, res) => {
        const mCategory = new category();
        const listCategory = await mCategory.getAll();
        const message = req.session.message;
        delete req.session.message
        return res.render('admin/category/index', { listCategory: listCategory, message: message });
    }

    // giao diện sửa
    static edit = async (req, res) => {
        const id = req.params.id;
        const mCategory = new category();
        const cate = await mCategory.find(id);
        if (!cate) {
            req.session.message = {
                mess: `Danh Mục Không Tồn Tại Vui Lòng KHÔNG SỬA ĐƯỜNG LINK URL!!!   `,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            })
            return
        }
        // console.log(br)

        return res.render('admin/category/edit', { category: cate });
    }

    // sửa
    static update = async (req, res) => {
        const data = req.body;
        // console.log()
        const mCategory = new category();
        const oldData = await mCategory.find(data.id)

        if (await mCategory.update(data)) {
            req.session.message = {
                mess: `Sửa danh mục từ tên ${oldData.name_category} sang ${data.name_category} thành công`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/category.html');
            })
            return;
        }

        req.session.message = {
            mess: `Sửa danh mục từ tên ${oldData.name_category} sang ${data.name_category} thất bại`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/category.html');
        })
        return;
    }

    // giao diện thêm
    static create = async (req, res) => {
        // const mBrand = new brand();
        return res.render('admin/category/create');
    }

    // thêm
    static store = async (req, res) => {
        const mCategory = new category();
        const data = req.body;
        if (await mCategory.save(data)) {
            req.session.message = {
                mess: `Thêm danh mục ${data.name_category} thành công !!`,
                type: 'success'
            };
            req.session.save(() => {
                res.redirect('/admin/category.html');
            });
            return;
        }
        req.session.message = {
            mess: `Thêm danh mục ${data.name_category} thất bại vui lòng xem lại !!!`,
            type: 'danger'
        };
        req.session.save(() => {
            res.redirect('/admin/category.html');
        });
        return;
    }

    // Xóa
    static delete = async (req, res) => {
        const id = req.params.id;
        const mCategory = new category();
        const br = await mCategory.find(id);

        if (!br) {
            req.session.message = {
                mess: `Danh Mục Không Tồn Tại Vui Lòng KHÔNG SỬA ĐƯỜNG LINK URL!!!   `,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            })
            return
        }

        // console.log(br)
        if (await mCategory.destroy(id)) {
            req.session.message = {
                mess: `Xóa danh mục ${br.name_category} thành công`,
                type: "success"
            }
            req.session.save(() => {
                res.redirect('/admin/category.html');
            });
            return;
        }

        req.session.message = {
            mess: `Xóa danh mục ${br.name_category} thất bại`,
            type: "danger"
        }
        req.session.save(() => {
            res.redirect('/admin/category.html');
        });
        return;

    }

}

module.exports = CategoryController