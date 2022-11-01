const unitDetailsBtnMed = document.getElementById("typeInfoMed")
const unitDetailsBtnLarge = document.getElementById("typeInfoLarge")
const unitDetailsBtnXLarge = document.getElementById("typeInfoXLarge")
const unitDetailsBtnFlex = document.getElementById("typeInfoFlex")
const unitTableBody = document.getElementById("unitTableBody")

const errCallback = err => console.log(err)

//function to create the html from all of the unit info
//// call axios
//// loop over data -> build html elements per unit
const getAllUnits = () => {
    axios.get("http://localhost:4000/api/units")
    .then(res => {
        console.log(res)
        loadUnitTable(res.data)
    })
    .catch(errCallback)
}
const getUnitSizeGroup = (size) => {
    axios.get(`http://localhost:4000/api/units/${size}`)
    .then(res => {
        console.log(res)
        loadUnitSizeGroup(size, res.data)
    })
    .catch(errCallback)
}
const addReview = (reviewObj) => {
    axios.post('http://localhost4000/api/submitReview', reviewObj)
    .then(res => {
        console.log(res)
    })
    .catch(errCallback)
}
const addWaiter = (waiterObj) => {
    axios.post('http://localhost4000/api/waitingList', waiterObj)
    then(res => {
        console.log(res)
    })
    .catch(errCallback)
}

const loadUnitSizeGroup = (size, data) => {
    const {annualRate, monthlyRate, squareFootage} = data[0]
    let collapseDetailsElement
    switch (size) {
        case '10x24':
            collapseDetailsElement = document.getElementById("collapseTypeInfoMed")
        break;
        case '12x32':
            collapseDetailsElement = document.getElementById("collapseTypeInfoLarge")
        break;
        case '12x40':
            collapseDetailsElement = document.getElementById("collapseTypeInfoXLarge")
        break;
        default:
            collapseDetailsElement = document.getElementById("collapseTypeInfoFlex")
    }

    let availableUnitCount = data.filter((unit) => unit.available === true).length
    let monthlyRateDisplay 
    let annualRateDisplay 

    if(monthlyRate>0){
         monthlyRateDisplay = `$${monthlyRate}`
    }
    else{
        monthlyRateDisplay="Call for Details"
    }
    if(annualRate>0){
         annualRateDisplay = `$${annualRate}`
    }
    else{
        annualRateDisplay = "Call for Details"

    }
    collapseDetailsElement.innerHTML = `
        <ul>
            <li>Annual Rate: ${annualRateDisplay}</li>
            <li>Monthly Rate: ${monthlyRateDisplay}</li>
            <li>Square Footage: ${squareFootage}</li>
            <li>Availability: ${availableUnitCount} / ${data.length}</li>
        </ul>
    `
}

const loadUnitTable = (data) => {
    for(i=0; i<data.length; i++){
        const {id, category, annualRate, available} = data[i]
        let annualRateDisplay
       if(annualRate>0){
            annualRateDisplay = `$${annualRate} per month with annual lease`
       }
       else{
           annualRateDisplay = "Call for Details"
   
       }
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `
            <td>${id}</td>
            <td>${category}</td>
            <td>${annualRateDisplay} </td>
            <td>${available ? 'yes' : 'not at this time'}</td>
        `
        unitTableBody.appendChild(tableRow)
    }
  
}

const submitNewReview = () => {
    //TODO collect data from the form, give it the new object
}

const submitWaitingList = () => {
    //TODO
}

unitDetailsBtnMed.addEventListener('click', () => getUnitSizeGroup('10x24'));
unitDetailsBtnLarge.addEventListener('click', () => getUnitSizeGroup('12x32'));
unitDetailsBtnXLarge.addEventListener('click', () => getUnitSizeGroup('12x40'));
unitDetailsBtnFlex.addEventListener('click', () => getUnitSizeGroup('45x45'));

getAllUnits()