const action = require('../../services/ActionService');

class ActionController {
    static index = async (req, res) => {
        const mAction = new action();
        const listAction = await mAction.getAll();
        return res.render('admin/action/index', { listAction: listAction });
    }
}

module.exports = ActionController;
