const transport = require('../../services/TransportService');
const province = require('../../services/ProvinceService');

class TransportController {
    static index = async (req, res) => {
        const mTransport = new transport();
        const mProvince = new province();

        const listTransport = await mTransport.getAll();
        const list = [];

        const message = req.session.message;
        delete req.session.message

        for (const tmp of listTransport) {
            const pro = await mProvince.find(tmp.province_id)
            const data = {
                id: tmp.id,
                name_province: pro.name,
                price: tmp.price
            }
            list.push(data);
        }

        return res.render('admin/transport/index', { listTransport: list, message: message });
    }

    static edit = async (req, res) => {
        const id = req.params.id;
        const mTransport = new transport();
        const mProvince = new province();


        const tran = await mTransport.find(id);

        if (!tran) {
            req.session.message = {
                mess: `Tỉnh thành này không tồn tại VUI LÒNG KHÔNG CHỈNH SỬA ĐƯỜNG LINK URL !!!`,
                type: 'danger'
            }
            req.session.save(() => {
                res.redirect('/admin/dashboard.html');
            });
            return;
        }
        // console.log(id);
        const pro = await mProvince.find(tran.province_id);


        return res.render('admin/transport/edit', { transport: tran, province_name: pro.name })
    }

    static update = async (req, res) => {
        const data = req.body;

        const mTransport = new transport();

        if (await mTransport.update(data)) {
            req.session.message = {
                mess: `Cập nhật giá vận chuyển tỉnh thành ${data.province_name} thành công !!!`,
                type: 'success'
            }
            req.session.save(() => {
                res.redirect('/admin/transport.html');
            })
            return;
        }

        req.session.message = {
            mess: `Cập nhật giá vận chuyển tỉnh thành ${data.province_name} thất bại !!!`,
            type: 'danger'
        }
        req.session.save(() => {
            res.redirect('/admin/transport.html');
        })
        return;
    }
}

module.exports = TransportController;