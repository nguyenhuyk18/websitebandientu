const image_item = require('../../services/ImageItemService');
const product = require('../../services/ProductService');
const fs = require('fs');
const path = require('path')

class ImageItemController {
    static index = async (req, res) => {
        const id = req.params.id;

        const mImageItem = new image_item();

        const mProduct = new product();

        const tmp = await mProduct.findByID(id);
        console.log(tmp);

        if (tmp == null || tmp.is_delete == 0) {
            req.session.message = {
                mess: `Sản phẩm không tồn tại`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect(`/admin/image-child.html`);
            })
            return;
        }

        const message = req.session.message;
        delete req.session.message
        const list = await mImageItem.findImageItemByProductID(id);




        return res.render('admin/image_item/detail', { listImageItem: list, product_id: id, message: message });
    }


    static delete = async (req, res) => {
        const id = req.params.id;
        const mImageItem = new image_item();

        const oldData = await mImageItem.findByID(id);

        // Xóa ảnh củ đi
        const oldimage = oldData.name_image;
        // console.log(oldimage);
        const imagePath = path.join(__dirname, '..', '..', '..', 'public', 'upload', 'image-item', oldimage);
        fs.unlink(imagePath, (err) => {
            if (err) console.log('Không thể xóa ảnh cũ:', err);
        });


        if (await mImageItem.destroy(id)) {
            req.session.message = {
                mess: `Xóa hình ảnh phụ thành công !!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect(`/admin/image-item/detail/${oldData.product_id}`);
            })
            return;
        }

        req.session.message = {
            mess: `Xóa hình ảnh phụ không thành công !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect(`/admin/image-item/detail/${oldData.product_id}`);
        })
        return;


    }


    static store = async (req, res) => {
        const data = req.body;

        const mImageItem = new image_item();
        const mProduct = new product();

        const pro = await mProduct.findByID(data.product_id);

        data.name_image = req.file.filename;

        if (await mImageItem.save(data)) {
            req.session.message = {
                mess: `Thêm hình ảnh phụ cho sản phẩm ${pro.product_name} thành công!!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect(`/admin/image-item/detail/${data.product_id}`);
            })
            return;
        }

        req.session.message = {
            mess: `Thêm hình ảnh phụ cho sản phẩm ${pro.product_name} không thành công !!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect(`/admin/image-item/detail/${data.product_id}`);
        })
        return;
    }
}

module.exports = ImageItemController