const unitDetailsBtnMed = document.getElementById("typeInfoMed")
const unitDetailsBtnLarge = document.getElementById("typeInfoLarge")
const unitDetailsBtnXLarge = document.getElementById("typeInfoXLarge")
const unitDetailsBtnFlex = document.getElementById("typeInfoFlex")
const getAllUnitsModal = document.getElementById("allUnits")

const errCallback = err => console.log(err)

//function to create the html from all of the unit info
//// call axios
//// loop over data -> build html elements per unit
const getAllUnits = () => {
    axios.get("http://localhost:4000/api/units")
    .then(res => {
        console.log(res)
        // check if all available === false -> show banner or something
        // add all unit elements to the "get all unit info" modal
    })
    .catch(errCallback)
}
const getUnitSizeGroup = (size) => {
    axios.get(`http://localhost:4000/api/units/${size}`)
    .then(res => {
        console.log(res)
        // bind to the new modal
        // loop through the res.data
        // create new little html elements with that data
    })
    .catch(errCallback)
}
const addReview = () => {
    axios.post('http://localhost4000/api/submitReview', )
    .then(res => {
        console.log(res)
    })
    .catch(errCallback)
}
const addWaiter = () => {
    axios.post('http://localhost4000/api/waitingList')
    then(res => {
        console.log(res)
    })
    .catch(errCallback)
}

const submitNewReview = () => {
    
}

unitDetailsBtnMed.addEventListener('click', () => getUnitSizeGroup('10x24'));
unitDetailsBtnLarge.addEventListener('click', () => getUnitSizeGroup('12x32'));
unitDetailsBtnXLarge.addEventListener('click', () => getUnitSizeGroup('12x40'));
unitDetailsBtnFlex.addEventListener('click', () => getUnitSizeGroup('45x45'));



getAllUnits()