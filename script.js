import characters from "./data.js";

function addGlobalEventListener(type, selector, callback, options){
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    }, options)
}

const main = document.querySelector('.main')
const node = element => document.createTextNode(element);

let createCharacter = ({name, image}) => {
    
    const card = document.createElement('div')
    card.classList.add('card')

    const characterName = document.createElement('h2')
    characterName.classList.add('card-title')
    const img = document.createElement('img')
    
    const sliderContainer = document.createElement('div')
    sliderContainer.classList.add('sliders')

    const sliders = ["wind", "fire", "earth", "water"]
    sliders.forEach((slider) => {
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
    const sortingButtonContainer = document.createElement('div')
    sortingButtonContainer.classList.add('sorting-hat')

    const sortingButton = document.createElement('button')
    sortingButton.appendChild(node("Go to..."))
    sortingButtonContainer.appendChild(sortingButton)
    sliderContainer.appendChild(sortingButtonContainer)

    characterName.appendChild(node(name))
    img.src = image

    card.appendChild(characterName)
    card.appendChild(img)
    card.appendChild(sliderContainer)

    main.appendChild(card)
}

characters.forEach(character => {
    createCharacter(character);
})

addGlobalEventListener('click', 'button', (e) => {
    const card = e.target.closest('.card')
    const inputs = card.querySelectorAll('input')

    let chosenIndex = 0
    let maxElement = inputs[chosenIndex].value;
    for (let index = 0; index < inputs.length; index++) {
        const newMaxElement = inputs[index].value
        if (maxElement < newMaxElement) {
            maxElement = newMaxElement
            chosenIndex = index
        }
    }

    let colourForHouse = {
        "fire": "gold",
        "water": "green",
        "earth": "black",
        "wind": "#CD7F32"
    }
    card.style.backgroundColor = colourForHouse[inputs[chosenIndex].className]
    // console.log(card)
}, null)

