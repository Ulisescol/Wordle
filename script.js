let diccionario = [
    "APPLE",
    "HOUSE",
    "MOUSE",
    "YOUTH",
    "GRADE",
    "MOUTH"
]

let palabra = getWord()
let intentos = 6

const endpoint = "https://random-word-api.herokuapp.com/word?length=5"

fetch(endpoint).then((response) => {
    response.json().then((data) => {
        console.log(data[0])
        palabra = data[0].toUpperCase()
    })
})

function getWord(){
    let min = 0
    let max = diccionario.length
    let i = Math.floor(Math.random() * (max - min)) + min
    return diccionario[i]
}


const grid = document.getElementById("grid")

const boton = document.getElementById("guess-button")

boton.addEventListener("click", ()=>{

    const intento = leerIntento()
    console.clear

    const row = document.createElement("div")
    row.className = "row"

    for (const i in palabra) {
        const span = document.createElement("span")
        span.className = "letter"
        span.innerHTML = intento[i]

        if(palabra[i] == intento[i]){
        span.style.backgroundColor = "#79b851"
        }

        else if(palabra.includes(intento[i])){      
            span.style.backgroundColor = "#f3c237"
        }

        else{    
            span.style.backgroundColor = "#a4aec4"
        }
        row.appendChild(span)
        
    }

    grid.appendChild(row)

    if(palabra == intento){
        terminar("GANASTE!😀")
        return
    }

    intentos--

    if(intentos == 0){
        terminar("PERDISTE!😖")
    }

})

function leerIntento(){
    const input = document.getElementById("guess-input")
    return input.value.toUpperCase()
}

function terminar(mensaje){
    const input = document.getElementById("guess-input")
    input.disabled = true
    boton.disabled = true
    let resultado = document.getElementById('guesses')
    resultado.innerHTML = `<h1>${mensaje}</h1>`
}
