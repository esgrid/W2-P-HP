import characters from "./data.js";

// A Global event listener function to use with any type, selector, callback and option
function addGlobalEventListener(type, selector, callback, options){
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    }, options)
}

// Selecting the .main section and creating a shortcut "node" for document.createTextNode with an arrow function
const main = document.querySelector('.main')
const node = element => document.createTextNode(element);

// CreateCharacter function receiving a dictionary and destructuring it to use only "name" and "image"
let createCharacter = ({name, image}) => {
    
    // The tree looks like this:
    // <div class="card">
    //     <h2 class="card-title">
    //     <img src="....">
    //     <div class="sliders">
    //        <div class="single-slider">
    //              <input type="range" min="1" max="100" class="wind/fire/earth/water">
    //              <img src="...">
    //        </div> * 4
    //        <button> Go to...</button> 
    //     </div>
    // </div>

    const card = document.createElement('div')
    card.classList.add('card')

    const characterName = document.createElement('h2')
    characterName.classList.add('card-title')
    const img = document.createElement('img')
    characterName.appendChild(node(name))
    img.src = image

    // Construction of the slider container and the sliders, including the button
    const sliderContainer = document.createElement('div')
    sliderContainer.classList.add('sliders')

    // Constructing the sliders
    const sliders = ["wind", "fire", "earth", "water"]
    sliders.forEach( slider => {
        const sliderElement = document.createElement('input')
        sliderElement.type = 'range'
        sliderElement.min = '1'
        sliderElement.max = '100'
        sliderElement.value = '50'
        sliderElement.classList.add(slider)

        const singleSliderContainer = document.createElement('div')
        singleSliderContainer.classList.add('single-slider')

        singleSliderContainer.appendChild(sliderElement)
        const sliderLabel = document.createElement('label')
        sliderLabel.appendChild(node(slider))
        singleSliderContainer.appendChild(sliderLabel)

        sliderContainer.appendChild(singleSliderContainer)
    })

    const sortingButton = document.createElement('button')
    sortingButton.appendChild(node("Go to..."))
    sliderContainer.appendChild(sortingButton)

    card.appendChild(characterName)
    card.appendChild(img)
    card.appendChild(sliderContainer)

    main.appendChild(card)
}

// Iterating over the characters and creating the cards with createCharacter(character)
characters.forEach(character => {
    createCharacter(character);
})

// Calling addGlobalEventListener function with the 'click' event, 'button' selector
// and an anonymous function that selects the "card" class and then
// selects all the sliders ('input') children to find the highest value and change
// add a css class to change the background colour indicating a specific House
addGlobalEventListener('click', 'button', (e) => {
    const card = e.target.closest('.card')
    const inputs = card.querySelectorAll('input')

    // Choosing a random number between 0 and 3 as the default House number when clicking the button without moving the sliders
    let chosenIndex = Math.round(Math.random() * 3)
    let maxElement = inputs[chosenIndex].value;

    // Looking for the index corresponding to the greatest input value (i.e. the highest slider value)
    for (let index = 0; index < inputs.length; index++) {
        const newMaxElement = inputs[index].value
        if (maxElement < newMaxElement) {
            maxElement = newMaxElement
            chosenIndex = index
        }
    }

    // Adding a new class to card if card container doesn't have one, corresponding to the highest input slider class (if they are all the same it'll be random). If there's already more than one class (ie the "card" class and an "element") the if replaces the existing element with the new one.
    if (card.classList.length > 1){
        card.classList.replace(card.classList[1], inputs[chosenIndex].className)
    } else{
        card.classList.toggle(inputs[chosenIndex].className) 
    }
}, null)

