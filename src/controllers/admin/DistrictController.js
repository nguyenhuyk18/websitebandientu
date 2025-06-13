const district = require('../../services/DistrictService');

class DistrictController {
    static getAll = async (req, res) => {
        const id_province = req.params.id_province;
        const mDistrict = new district();
        const listDistrict = await mDistrict.findByProvinceID(id_province);
        // console.log(listDistrict);
        const tmp = listDistrict.map(row => {
            return {
                id: row.id,
                name: row.name
            }
        })

        res.json(tmp);
    }
}

module.exports = DistrictController