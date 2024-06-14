import {
    cargarModalModos,
    cargarModalSobre,
    cargarModalAxuda,
    valorRango,
} from './modals.js'
import { limpar, preChecks } from './utils.js'
import { xerarPreguntas } from './xogar.js'

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#modalModos').style.display = 'block'
    cargarModalModos()
    valorRango()
    cargarModalSobre()
    cargarModalAxuda()

    document.querySelector('#form-modos').addEventListener('submit', (e) => {
        e.preventDefault()
        limpar()

        let seleccionModo = document.querySelector(
            'input[name=xogo-modo]:checked'
        ).id
        let seleccionTitulos = document.querySelectorAll(
            'input[name=titulos]:checked'
        )
        let seleccionNumero = parseInt(
            document.querySelector('#num-preguntas').value
        )
        if (seleccionNumero === 0 || !seleccionNumero) seleccionNumero = 1

        let seleccionDificultade = parseInt(document.querySelector(
            'input[name=xogo-dificultade]:checked'
        ).id.slice(-1))
        

        if (!seleccionModo || seleccionTitulos.length === 0) {
            preChecks()
        } else {
            xerarPreguntas(seleccionModo, seleccionTitulos, seleccionNumero, seleccionDificultade)
            document.querySelector('#modalModos').style.display = 'none'
        }
    })

    document.querySelector('#logo').addEventListener('click', () => {
        window.location.reload()
    })
})
