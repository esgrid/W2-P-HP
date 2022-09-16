const characters = [
    {
        "name": "Harry Potter",
        "image": "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg"
    },
    {
        "name": "Ginny Weasley",
        "image": "https://upload.wikimedia.org/wikipedia/en/e/e7/Ginny_Weasley_poster.jpg"
    },
    {
        "name": "Hermione Granger",
        "image": "https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg"
    },
    {
        "name": "Tom Riddle",
        "image": "https://upload.wikimedia.org/wikipedia/en/e/e1/Riddleinhogwarts.jpg"
    },
    {
        "name": "Severus Snape",
        "image": "https://upload.wikimedia.org/wikipedia/en/b/b9/Ootp076.jpg"
    },
    {
        "name": "Draco Malfoy",
        "image": "https://upload.wikimedia.org/wikipedia/en/1/16/Draco_Mal.JPG"
    },
    {
        "name": "Hagrid",
        "image": "https://upload.wikimedia.org/wikipedia/en/1/10/RubeusHagrid.jpg"
    },
    {
        "name": "Luna Lovegood",
        "image": "https://upload.wikimedia.org/wikipedia/en/c/c2/LunaLovegood.jpeg"
    },
    {
        "name": "Ron Weasley",
        "image": "https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg"
    },
    {
        "name": "Sirius Black",
        "image": "https://upload.wikimedia.org/wikipedia/en/6/6b/Sirius_Black.jpeg"
    },
    {
        "name": "Neville Longbottom",
        "image": "https://upload.wikimedia.org/wikipedia/en/7/75/Neville_Longbottom.jpeg"
    }
]


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
        sliderLabel = document.createElement('label')
        sliderLabel.appendChild(node(slider))
        singleSliderContainer.appendChild(sliderLabel)

        sliderContainer.appendChild(singleSliderContainer)
    })
    sortingButtonContainer = document.createElement('div')
    sortingButtonContainer.classList.add('sorting-hat')

    sortingButton = document.createElement('button')
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
    console.log(card)
}, null)

