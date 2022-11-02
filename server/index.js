const express = require("express");
const cors = require("cors");

const app = express()
app.use(cors());
app.use(express.json())

const{
    getSizeGroupInfo,
    getAllUnits, 
    submitReview,
    getOnAWaitingList,
} = require("./controller")

app.get("/api/units/:size", getSizeGroupInfo)
app.get("/api/units", getAllUnits)
app.post("/api/submitReview", submitReview)
app.post("/api/waitingList", getOnAWaitingList)

app.listen(4000, () => console.log("Server running on 4000"))