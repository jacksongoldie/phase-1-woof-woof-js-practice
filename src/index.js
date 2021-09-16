//On the page, there is a div with the id of "dog-bar". When the page loads, use fetch to get all of the pup data from your server. When you have this information, you'll need to add a span with the pup's name to the dog bar (ex: <span>Mr. Bonkers</span>).

const filterDiv = document.querySelector('#filter-div');
const dogBarDiv = document.querySelector('div#dog-bar');
const dogCardDiv = document.querySelector('#dog-summary-container');
const button = document.createElement('button');

//invoke start
getPupData();

//Event Listeners


function getPupData(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    //sending data to renderPup without using forEach, but maybe need to??????
    .then(json => json.forEach(renderPup))
}

function renderPup(pup){
    //debugger;
    //takes in resp.json and does something
    //create span element using resp.json
    const newSpanWithPupData = document.createElement('span');
    newSpanWithPupData.innerText = pup.name;
    newSpanWithPupData.id = pup.id;

    //console.log(newSpanWithPupData)
    //append span to filterDiv
    dogBarDiv.appendChild(newSpanWithPupData);
};

//user clicks on span and the pup's info shows up in the div "#dog-info"

//add event listener to div#dog-bar w cb handlePupSpanClick
dogBarDiv.addEventListener('click', handlePupSpanClick);


//function handlePupSpanClick
function handlePupSpanClick(e){

    //HOW DO I KEEP JUST DOGGO WITHOUT MANUALLY PUTTING IT BACK IN?
    dogCardDiv.innerHTML = '<h1>DOGGO:</h1>';
///get that pups info - use fetch with specific id?
fetch('http://localhost:3000/pups/' + e.target.id)
.then(resp => resp.json())
.then(renderPupCard)
}

function renderPupCard(pup){
    ////img: create, set attributes, append
    const image = document.createElement('img');
    image.setAttribute('src', pup.image);
    image.id = `${pup.id}`;
    image.style.height = '300px';
    image.style.width = '300px';
    dogCardDiv.appendChild(image);

////h2 with name
    const h2Name = document.createElement('h2');
    h2Name.innerText = pup.name;
    dogCardDiv.append(h2Name);

////button that says good dog or bad dog based on whether isGoodDog is true or false
    if(pup.isGoodDog === true){
        button.innerText = 'Good dog!';
        button.value = true;} 
    else{
        button.innerText = 'Bad dog!';
        button.value = false;}
    dogCardDiv.append(button)

    //add event listener and cb handleButtonClick
    button.addEventListener('click', handleButtonClick)
    
}

function handleButtonClick(e){
    //debugger;
    console.log(e.target.value)
//user clicks button text should change to other option
if (button.innerText === 'Good dog!'){
    button.innerText = 'Bad dog!';
    button.value = false;
}
else{
    button.innerText = 'Good dog!';
    button.value = true;
}

//WHAT ARE YOU EVEN DOING DOWN HERE
isGoodDogValue = button.value;
//pup object is updated with patch request
updatePupData(isGoodDogValue)
}

function updatePupData(isGoodDog){
    //regrab from DOM?
    //debugger;

    const img = document.querySelector("#dog-summary-container > img");

    fetch(`http://localhost:3000/pups/${img.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({isGoodDog: JSON.parse(isGoodDog)})
    });
}