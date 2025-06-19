const ward = require('../../services/WardService');

class WardController {
    static getAll = async (req, res) => {
        const id_district = req.params.id_district;

        const mWard = new ward();
        const listWard = await mWard.findByDistrictID(id_district);

        const tmp = listWard.map(row => {
            return {
                id: row.id,
                name: row.name
            };
        });

        res.json(tmp);
    }
}

module.exports = WardController;