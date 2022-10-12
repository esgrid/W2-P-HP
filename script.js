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

const main = document.querySelector('.main')

function createCharacter ({name, image}) {
    const card = document.createElement('div')
    card.classList.add('card')

    const characterName = document.createElement('h2')
    characterName.classList.add('card-title')
    const img = document.createElement('img')
    characterName.append(name)
    img.src = image

    const sliderContainer = document.createElement('div')
    sliderContainer.classList.add('sliders')

    function createSlider(slider){
        return `
            <div class="single-slider">
                <input type="range" min="1" max="100" value="50" class="${slider}">
                <label>${slider}</label>
            </div>          
        `
    }

    ["wind", "fire", "earth", "water"].forEach( slider => sliderContainer.innerHTML += createSlider(slider))

    const sortingButton = document.createElement('button')
    sortingButton.append("Go to...")
    sliderContainer.append(sortingButton)

    card.append(characterName, img, sliderContainer)

    main.appendChild(card)
}

characters.forEach(character => {
    createCharacter(character);
})

document.addEventListener('click', e => {
    if (e.target.matches('button')){
        const card = e.target.closest('.card')
        const inputs = card.querySelectorAll('input')
    
        let chosenIndex = Math.round(Math.random() * 3)
        let maxElement = inputs[chosenIndex].value;
    
        for (let index = 0; index < inputs.length; index++) {
            const newMaxElement = inputs[index].value
            if (maxElement < newMaxElement) {
                maxElement = newMaxElement
                chosenIndex = index
            }
        }
    
        if (card.classList.length > 1){
            card.classList.replace(card.classList[1], inputs[chosenIndex].className)
        } else{
            card.classList.toggle(inputs[chosenIndex].className) 
        }
    }    
})

