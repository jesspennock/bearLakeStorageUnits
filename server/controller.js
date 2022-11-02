// const path = require('path')
const unitDB = require('./unitDB.json')
const waitinglistDB = require('./waitingListDB.json')
const reviewDB = require('./reviewDB.json')
let globalIDReview = 2
let globalIDWaitingList = 2


module.exports = {
    getSizeGroupInfo: (req, res) => {
        // console.log(req.params)
        // req.params = {size: '10x24'}
        const {size} = req.params
        const sizeGroup = unitDB.filter(unit => unit.category === size);
        res.status(200).send(sizeGroup)
    },
    getAllUnits: (req, res) => {
        res.status(200).send(unitDB)
    },
    getOnAWaitingList: (req,res) => {
        console.log(req.body)
        const {firstName, lastName, email, phone, unitSize} = req.body
        let newWaiter = {
           id: globalIDWaitingList,
           firstName,
           lastName,
           email,
           phone,
           unitSize
        }
        waitinglistDB.push(newWaiter)
        globalIDWaitingList++
        res.status(200).send(waitinglistDB)
    },
    submitReview: (req,res) => {
        const {name, email, reviewText, stars, share} =req.body
        let newReview = {
            id: globalIDReview,
            name,
            email,
            reviewText,
            stars,
            share

        }
        reviewDB.push(newReview)
        globalIDReview++
        res.status(200).send(reviewDB)
    }
}