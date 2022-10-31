const unitDetailsBtnMed = document.getElementById("typeInfoMed")
const unitDetailsBtnLarge = document.getElementById("typeInfoLarge")
const unitDetailsBtnXLarge = document.getElementById("typeInfoXLarge")
const unitDetailsBtnFlex = document.getElementById("typeInfoFlex")
const getAllUnitsModal = document.getElementById("allUnits")

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
    .catch(err => {
        console.log(err)
    })
}
const getUnitSizeGroup = (size) => {
    axios.get(`http://localhost:4000/api/units/${size}`)
    .then(res => {
        console.log(res)
        // bind to the new modal
        // loop through the res.data
        // create new little html elements with that data
    })
    .catch(err => {
        console.log(err)
    })
}
//create clickHandlers for the specific unit sizes

//call that function

unitDetailsBtnMed.addEventListener('click', () => getUnitSizeGroup('10x24'));
// unitDetailsBtnLarge.addEventListener('click', getIndividualUnitInfo);
// unitDetailsBtnXLarge.addEventListener('click', getIndividualUnitInfo);
// unitDetailsBtnFlex.addEventListener('click', getIndividualUnitInfo);


getAllUnits()