const path = require('path')
const unitdb = require('./unitdb.json')
const newID = 10

module.exports = {
    getSizeGroupInfo: (req, res) => {
        // console.log(req.params)
        // req.params = {size: '10x24'}
        const {size} = req.params
        const sizeGroup = unitdb.filter(unit => unit.category === size);
        res.status(200).send(sizeGroup)
    },
    getAllUnits: (req, res) => {
        res.status(200).send(unitdb)

    },
    getOnAWaitingList: (req,res) => {

    },
    contactUs: (req,res) => {

    }
}