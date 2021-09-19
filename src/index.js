//OFFICE HOUR QUESTIONS
/// best practice for pulling fetch data once and using an array/object to work with data before sending back or sending that data function by function
/// currently the index1.js will keep the rendered dog info up to date with the db, however, index will not without refreshing the page/code


const baseURL = 'http://localhost:3000/pups';
const dogBarDiv = document.querySelector('#dog-bar');
const dogInfoDiv = document.querySelector("#dog-info");
const pupGoodDogStatusButton = document.createElement('button');
pupGoodDogStatusButton.addEventListener('click', (event) => changeButtonTextAndUpdate(event, pupFromConvertFetchDataForEach));

//let jsonData;

init();

function init(){
    //debugger;
    fetch(baseURL)
    .then(resp => resp.json())
    .then(json => json.forEach(displayPupButtons))
};

/* function convertFetchData(originalJSONPupData){
console.log(originalJSONPupData)
//assigned so it can be used outside of the function when needed but is it better to pass original?
//jsonData = [...originalJSONPupData];

originalJSONPupData.forEach(displayPupButtons)
} */

function displayPupButtons(pupFromConvertFetchDataForEach){
    const newDogButton = document.createElement('span');
    newDogButton.innerText = pupFromConvertFetchDataForEach.name;
    newDogButton.id =  `pup-${pupFromConvertFetchDataForEach.id}`;
    dogBarDiv.append(newDogButton);
    newDogButton.addEventListener('click', () => displayDogInfo(pupFromConvertFetchDataForEach));
}

//displays img, name, isGoodDog status on button - get's arguments from displayPupButtons where original fetch data is used
function displayDogInfo(pupFromConvertFetchDataForEach){
    //debugger;
    dogInfoDiv.innerHTML = '';
    fetch(baseURL)
    .then(resp => resp.json())
    .then(json => json.forEach(displayPupButtons))

    const pupImage = document.createElement('img');
    pupImage.src = pupFromConvertFetchDataForEach.image;

    const pupName = document.createElement('h2');
    pupName.textContent = pupFromConvertFetchDataForEach.name;

    //taking out button from here and adding to global for event listener??
    //const pupGoodDogStatusButton = document.createElement('button');
    if (pupFromConvertFetchDataForEach.isGoodDog === true){
        pupGoodDogStatusButton.innerText = "Good dog!"}
    else {
    pupGoodDogStatusButton.innerText = "Bad dog!"
    }
    //removing below to post in global
    //pupGoodDogStatusButton.addEventListener('click', (event) => changeButtonTextAndUpdate(event, pupFromConvertFetchDataForEach));

    dogInfoDiv.append(pupImage, pupName, pupGoodDogStatusButton)
}

//PASS THE REFERENCES I NEED THROUGH THE EVENT LISTENER
function changeButtonTextAndUpdate(event, pupFromConvertFetchDataForEach){
    //debugger;
    let currentIsGoodDogStatus;
    if(event.target.textContent === 'Good dog!'){    
            event.target.textContent = "Bad Dog!";
            currentIsGoodDogStatus = false;
    }
    else {
            event.target.textContent = "Good dog!";
            currentIsGoodDogStatus = true;
    }

    fetch(`${baseURL}/${pupFromConvertFetchDataForEach.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({isGoodDog: currentIsGoodDogStatus})
    });
}

