const AnalystService = require('../../services/AnalystService');

class DashboardController {
    static index = async (req, res) => {
        const message = req.session.message;
        delete req.session.message;

        return res.render('admin/dashboard/index', { message: message });
    }


    static resultAnalystByProduct = async (req, res) => {
        if (!req.session?.login) {
            res.send('false');
            return;
        }

        // thống kê số lượng bán theo chuột phím laptop
        const anal = new AnalystService();
        const rs = await anal.statisticsByQuantity();

        return res.json(rs);
    }


    static resultAnalystByVenueProduct = async (req, res) => {
        if (!req.session?.login) {
            res.send('false');
            return;
        }


        const anal = new AnalystService();
        const rs = await anal.analByVenue();


        return res.json(rs);
    }


    static resultNumberOfNewOrder = async (req, res) => {
        if (!req.session?.login) {
            res.send('false');
            return;
        }
        const anal = new AnalystService();
        const rs = await anal.allNewOrder();

        return res.json(rs);
    }


    static resultNewMessage = async (req, res) => {
        if (!req.session?.login) {
            res.send('false');
            return;
        }
        const anal = new AnalystService();
        const rs = await anal.allNewConversation();

        return res.json(rs);
    }
}

module.exports = DashboardController;