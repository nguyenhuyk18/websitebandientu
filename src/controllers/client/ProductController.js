const productModels = require('../../services/ProductAllServices');
const commentModels = require('../../services/CommentService');
const dayjs = require('dayjs');
class ProductController {
    static index = async (req, res) => {
        let conds = [];
        let sorts = [];
        const page = req.query['page'] ?? 1;
        const item_per_page = 9;

        const mProduct = new productModels();


        // phân trang pagination
        const sumOfProduct = await mProduct.getByNumber(conds, sorts);
        const sumOfPage = Math.ceil(Number(sumOfProduct) / Number(item_per_page));
        // console.log(sumOfProduct);



        const listProduct = await mProduct.getBy(conds, sorts, item_per_page, page);


        return res.render('client/product/index', { listProduct: listProduct, sumOfPage: sumOfPage, currentPage: page });
    }

    static detail = async (req, res) => {
        const id = req.params.id;
        // console.log(id);
        const mProduct = new productModels();
        const product = await mProduct.find(id);
        // console.log(product);



        const attributeNotConcern = ['product_name', 'name_brand', 'sale_price', 'is_delete', 'created_date', 'id_brand', 'getComments', 'getImageItem', 'price', 'discount', 'discount_from_date', 'discount_to_date', 'name_category', 'id', 'stock_quantity', 'id_category', 'description', 'image'];

        const informationTech = [];

        const mapping = {
            connection_type: 'Kiểu Kết Nối',
            led: 'Đèn LED',
            warranty: 'Bảo Hành',
            color: 'Màu Sắc',
            weight_laptop: 'Trọng Lượng (kg)',
            DPI: 'DPI',
            weight_mouse: 'Trọng Lượng (kg)',
            weight_keyboard: 'Trọng Lượng (kg)',
            key_durability: 'Độ Bền Phím',
            size: 'Kích Thước (cm)',
            cpu: 'CPU',
            ram: 'RAM',
            graphics_card: 'Card Đồ Họa',
            screen_size: 'Kích Thước Màn Hình (Inch)',
            screen_solution: 'Độ Phân Giải Màn Hình',
            operating_system: 'Hệ Điều Hành',
            release_year: 'Năm Ra Mắt'
        }

        for (const tmp in product) {

            //           true
            if (!attributeNotConcern.includes(tmp) && product[tmp] != null) {
                // if () {
                const nameAtributeDisplay = mapping[tmp];
                informationTech.push({ [nameAtributeDisplay]: product[tmp] });
                // }
            }
        }

        // console.log(informationTech);

        // Lấy danh sách bình luận
        const listComment = await product.getComments();
        console.log(listComment);

        const listImageItem = await product.getImageItem();
        return res.render('client/product/detail', { product: product, listImageItem: listImageItem, informationTech: informationTech, listComment: listComment })
    }


    static storeComment = async (req, res) => {
        const data = req.body;
        // console.log(data);
        const mComment = new commentModels();
        const mProduct = new productModels();
        data.created_date = dayjs().format('YYYY-MM-DD HH:mm:ss');


        await mComment.save(data);
        const product = await mProduct.find(data.product_id);
        const listComment = await product.getComments();


        res.render('client/product/comment', { listComment: listComment });
    }
}

module.exports = ProductController