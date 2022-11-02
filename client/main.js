const unitDetailsBtnMed = document.getElementById("typeInfoMed")
const unitDetailsBtnLarge = document.getElementById("typeInfoLarge")
const unitDetailsBtnXLarge = document.getElementById("typeInfoXLarge")
const unitDetailsBtnFlex = document.getElementById("typeInfoFlex")
const unitTableBody = document.getElementById("unitTableBody")
const submitWaiterBtn=document.getElementById("submitWaiterBtn")
const submitReviewBtn=document.getElementById("submitReviewButton")

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
    axios.post('http://localhost:4000/api/submitReview', reviewObj)
    .then(res => {
        console.log(res)
        // close the modal
        // alert?
    })
    .catch(errCallback)
}
const addWaiter = (waiterObj) => {
    axios.post('http://localhost:4000/api/waitingList', waiterObj)
    .then(res => {
        console.log(res)
        // close the modal
        // alert?
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
    let nameInput = document.querySelector("#name")
    let emailInput = document.querySelector("#email")
    let reviewTextInput = document.querySelector("#reviewText")
    let starRatingInput = document.querySelector("input[name='starRatingInput']:checked")
    let shareReviewInput = document.querySelector("#shareReview")

    let newReviewObj = {
        name: nameInput.value,
        email: emailInput.value,
        reviewText: reviewTextInput.value,
        stars: parseInt(starRatingInput.value),
        share: shareReviewInput.checked,
    }

    console.info(newReviewObj)

    addReview(newReviewObj)

    nameInput.value = ""
    emailInput.value = ""
    reviewTextInput.value = ""
    starRatingInput.value = ""
    shareReviewInput.value = ""
} 

const submitWaitingList = () => {
    let firstNameInput = document.querySelector("#firstName")
    let lastNameInput = document.querySelector("#lastName")
    let emailInput = document.querySelector("#inputEmail")
    let phoneNumberInput = document.querySelector("#inputPhoneNumber")
    let sizeRequestInput = document.querySelector("#sizeRequest")

    let newWaiterObj = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phone: phoneNumberInput.value,
        unitSize: sizeRequestInput.value,
    } 
    addWaiter(newWaiterObj)

    firstNameInput.value = ""
    lastNameInput.value = ""
    emailInput.value = ""
    phoneNumberInput.value = ""
    sizeRequestInput.value = ""
} 


unitDetailsBtnMed.addEventListener('click', () => getUnitSizeGroup('10x24'));
unitDetailsBtnLarge.addEventListener('click', () => getUnitSizeGroup('12x32'));
unitDetailsBtnXLarge.addEventListener('click', () => getUnitSizeGroup('12x40'));
unitDetailsBtnFlex.addEventListener('click', () => getUnitSizeGroup('45x45'));
submitWaiterBtn.addEventListener("click", () => submitWaitingList());
submitReviewBtn.addEventListener("click", () => submitNewReview());

getAllUnits()