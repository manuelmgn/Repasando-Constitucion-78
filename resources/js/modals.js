import { displaySeExiste, limpar } from './utils.js'

export function cargarModalModos() {
    const link = document.querySelector('#clickModalModos')
    const modalModos = document.querySelector('#modalModos')
    const closeModos = modalModos.getElementsByClassName('close')[0]
    const cabeceiraBenvida = document.querySelector('#cabeceira-benvida')
    const numerarArtigos = document.querySelector('input[id="numero-puntos"]')
    const completarPreguntas = document.querySelector(
        'input[id="preguntas-completar"]'
    )

    numerarArtigos.addEventListener('change', () => {
        if (numerarArtigos.checked) {
            displaySeExiste('#dificultade-pregunta', 'block')
            displaySeExiste('#dificultade-opcions', 'block')
            console.log('selectionado')
        }
    })
    completarPreguntas.addEventListener('change', () => {
        if (completarPreguntas.checked) {
            displaySeExiste('#dificultade-pregunta', 'none')
            displaySeExiste('#dificultade-opcions', 'none')
            console.log('COMPLETAR PREGUNTAS selectionado')
        }
    })

    link.addEventListener('click', () => {
        modalModos.style.display = 'block'
        displaySeExiste('#modalAxuda', 'none')
        displaySeExiste('#modalSobre', 'none')
        cabeceiraBenvida.innerText = '¿Quieres comenzar de nuevo?'
    })

    closeModos.addEventListener('click', () => {
        modalModos.style.display = 'none'
    })

    window.onclick = function (event) {
        if (event.target == modalModos) {
            modalModos.style.display = 'none'
        }
    }
}

export function valorRango() {
    const numInput = document.querySelector('#num-preguntas')
    const valorRango = document.querySelector('#valor-rango')
    valorRango.textContent = numInput.value
    numInput.addEventListener('input', (event) => {
        if (event.target.value === '0') {
            valorRango.textContent = 1
        } else {
            valorRango.textContent = numInput.value
        }
    })
}

export function lanzarModos() {
    const inputCompletar = document.querySelector('#preguntas-completar')
    const inputNumero = document.querySelector('#numero-puntos')

    inputCompletar.addEventListener('click', () => {
        console.log('Seleccionado:  completar')
        limpar()
        lanzarPreguntasCompletar()
        document.querySelector('#botons').style.display = 'block'
        //document.querySelector('#mostrarresposta').style.display = 'block';
    })
    inputNumero.addEventListener('click', () => {
        console.log('Seleccionado:  numero')
        limpar()
        document.querySelector('#botons').style.display = 'block'
        //document.querySelector('#mostrarresposta').style.display = 'block';
    })
}

export function cargarModalAxuda() {
    const linkAxuda = document.querySelector('#clickModalAxuda')
    const modalAxuda = document.querySelector('#modalAxuda')
    const closeAxuda = modalAxuda.getElementsByClassName('close')[0]

    linkAxuda.addEventListener('click', () => {
        displaySeExiste('#modalModos', 'none')
        displaySeExiste('#modalSobre', 'none')
        modalAxuda.style.display = 'block'
    })

    closeAxuda.addEventListener('click', () => {
        modalAxuda.style.display = 'none'
    })

    window.onclick = function (event) {
        if (event.target == modalAxuda) {
            modalAxuda.style.display = 'none'
        }
    }
}

export function cargarModalSobre() {
    const linkSobre = document.querySelector('#clickModalSobre')
    const modalSobre = document.querySelector('#modalSobre')
    const closeSobre = modalSobre.getElementsByClassName('close')[0]

    linkSobre.addEventListener('click', () => {
        displaySeExiste('#modalModos', 'none')
        displaySeExiste('#modalAxuda', 'none')
        modalSobre.style.display = 'block'
    })

    closeSobre.addEventListener('click', () => {
        modalSobre.style.display = 'none'
    })

    window.onclick = function (event) {
        if (event.target == modalSobre) {
            modalSobre.style.display = 'none'
        }
    }
}
