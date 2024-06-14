import {
    cortarArray,
    misturarArray,
    mostrarAcerto,
    mostrarErro,
    finish,
    limpar,
    limparRadios,
    chequearDuplicadosArray,
    displaySeExiste,
    xerarNumeroCercano,
} from './utils.js'
import {
    preguntasCompletarTitPre,
    preguntasCompletarTitulo1,
    preguntasCompletarTitulo2,
    preguntasCompletarTitulo3,
    preguntasCompletarTitulo8,
} from './data-preguntasCompletar.js'
import {
    preguntasNumeroPre,
    preguntasNumero1,
    preguntasNumero2,
    preguntasNumero3,
    preguntasNumero8,
} from './data-preguntasNumero.js'

export function xerarPreguntas(
    seleccionModo,
    seleccionTitulos,
    seleccionNumero,
    seleccionDificultade
) {
    let preguntas = []

    if (seleccionModo === 'preguntas-completar') {
        preguntas = insertPreguntasCompletar(seleccionTitulos)
    } else if (seleccionModo === 'numero-puntos') {
        preguntas = insertPreguntasNumero(seleccionTitulos)
    }

    preguntas = misturarArray(preguntas)
    preguntas = cortarArray(preguntas, seleccionNumero)

    if (seleccionModo === 'preguntas-completar') {
        limpar()
        iniciarXogoCompletar(preguntas)
    } else if (seleccionModo === 'numero-puntos') {
        limpar()
        iniciarXogoNumero(preguntas, seleccionDificultade)
    }
}

function insertPreguntasCompletar(titulos) {
    let preguntas = []
    titulos.forEach((titulo) => {
        switch (titulo.id) {
            case 'titpre':
                preguntas = [...preguntas, ...preguntasCompletarTitPre]
                break
            case 'tit1':
                preguntas = [...preguntas, ...preguntasCompletarTitulo1]
                break
            case 'tit2':
                preguntas = [...preguntas, ...preguntasCompletarTitulo2]
                break
            case 'tit3':
                preguntas = [...preguntas, ...preguntasCompletarTitulo3]
                break
            case 'tit8':
                preguntas = [...preguntas, ...preguntasCompletarTitulo8]
                break
        }
    })
    return preguntas
}

function iniciarXogoCompletar(preguntas) {
    const respostasSubmit = crearSubmit('Completar')
    const respostasForm = document.querySelector('#respostas')
    const respostasMostrar = crearMostrarResposta('Completar')
    const textoCompletar = crearTextoCompletar()
    let pedirAxuda = false
    let totalPreguntas = 0
    let totalAcertos = 0
    let indice = 0

    mostrarPreguntaCompletar(indice, preguntas)
    displaySeExiste('#botons', 'grid')
    displaySeExiste('#respostas', 'block')
    displaySeExiste('#resultado', 'block')

    respostasSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        let resposta = textoCompletar.value
        if (
            resposta.toLowerCase() === preguntas[indice].solucion.toLowerCase()
        ) {
            totalPreguntas++
            if (!pedirAxuda) {
                totalAcertos++
                mostrarAcerto()
            } else {
                pedirAxuda = false
            }
            indice++
            textoCompletar.value = ''
            if (indice < preguntas.length) {
                mostrarPreguntaCompletar(indice, preguntas)
            } else {
                finish(totalAcertos, totalPreguntas)
            }
        } else {
            mostrarErro()
        }
    })

    respostasMostrar.addEventListener('click', (f) => {
        f.preventDefault()
        textoCompletar.value = preguntas[indice].solucion
        pedirAxuda = true
    })
}

function mostrarPreguntaCompletar(indice = 0, arrayPreguntas) {
    document.querySelector('#nPregunta').style.display = 'block'
    document.querySelector('#preguntaUno').style.display = 'block'
    document.querySelector('#preguntaDos').style.display = 'block'

    document.querySelector('#nPregunta').innerText = `Pregunta ${
        indice + 1
    } de ${arrayPreguntas.length}`
    document.querySelector('#preguntaUno').innerText =
        arrayPreguntas[indice].tit
    document.querySelector('#preguntaDos').innerText =
        arrayPreguntas[indice].texto

    document.querySelector('#textocompletar').style.display = 'block'
}

function insertPreguntasNumero(seleccionTitulos) {
    let preguntas = []
    seleccionTitulos.forEach((titulo) => {
        switch (titulo.id) {
            case 'titpre':
                preguntas = [...preguntas, ...preguntasNumeroPre]
                break
            case 'tit1':
                preguntas = [...preguntas, ...preguntasNumero1]
                break
            case 'tit2':
                preguntas = [...preguntas, ...preguntasNumero2]
                break
            case 'tit3':
                preguntas = [...preguntas, ...preguntasNumero3]
                break
            case 'tit8':
                preguntas = [...preguntas, ...preguntasNumero8]
                break
        }
    })
    return preguntas
}

function iniciarXogoNumero(preguntas, seleccionDificultade) {
    const formRespostas = document.querySelector('#respostas')
    const respostasSubmit = crearSubmit('Numero')
    const respostasMostrar = crearMostrarResposta('Numero')
    let pedirAxuda = false
    let totalPreguntas = 0
    let totalAcertos = 0
    let indice = 0

    displaySeExiste('#respostas', 'block')

    mostrarPreguntaNumero(indice, preguntas, seleccionDificultade)
    document.querySelector('#botons').style.display = 'grid'

    respostasSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        let resposta = ''
        if (formRespostas.querySelector('input[name="respostas"]:checked')) {
            resposta = formRespostas.querySelector(
                'input[name="respostas"]:checked'
            ).value
        }
        if (resposta === preguntas[indice].id) {
            totalPreguntas++
            if (!pedirAxuda) {
                totalAcertos++
                mostrarAcerto(false)
            } else {
                pedirAxuda = false
            }
            document.getElementById(preguntas[indice].id).checked = false
            indice++
            limparRadios()
            if (indice < preguntas.length) {
                mostrarPreguntaNumero(indice, preguntas, seleccionDificultade)
            } else {
                finish(totalAcertos, totalPreguntas)
            }
        } else {
            mostrarErro(false)
        }
    })

    respostasMostrar.addEventListener('click', (f) => {
        f.preventDefault()
        document.getElementById(preguntas[indice].id).checked = true
        pedirAxuda = true
    })
}

function prepararArrayRespostas(pregunta, seleccionDificultade = 2) {
    let respostas = []
    let id = pregunta.id
    respostas[0] = id
    let nPreguntas = 6;
    switch(seleccionDificultade) {
        case 1: nPreguntas = 4; break;
        case 2: nPreguntas = 6; break;
        case 3: nPreguntas = 8; break
    }

    for (let i = 1; i < nPreguntas; i++) {
        respostas[i] = xerarArtigo(id, seleccionDificultade)
    }

    respostas = chequearDuplicadosArray(respostas, id)
    respostas = misturarArray(respostas)
    return respostas
}

function xerarArtigo(id, seleccionDificultade = 2) {
    let artigo
    let tituloArray = id.split('.')
    let titulo = parseInt(tituloArray[0])
    switch(seleccionDificultade) {
        case 1: artigo = xerarNumeroCercano(titulo, 2); break;
        case 2: artigo = xerarNumeroCercano(titulo, 1.3); break;
        case 3: artigo = xerarNumeroCercano(titulo, 0.9); break;
    }
    if (artigo === 0) {
        artigo = artigo + 1
    }
    if (artigo < 0) {
        artigo = artigo * -1
    }

    let punto = Math.floor(Math.random() * 6)

    return `${artigo}.${punto}`
}

function mostrarPreguntaNumero(indice = 0, arrayPreguntas, seleccionDificultade = 2) {
    const form = document.querySelector('#respostas')
    const radios = document.createElement('div')
    radios.setAttribute('id', 'radios')
    form.prepend(radios)
    document.querySelector('#nPregunta').style.display = 'block'
    document.querySelector('#preguntaDos').style.display = 'block'

    let respostas = prepararArrayRespostas(arrayPreguntas[indice], seleccionDificultade)

    respostas.forEach((resposta, index) => {
        const label = document.createElement('label')
        const radio = document.createElement('input')

        radio.type = 'radio'
        radio.name = 'respostas'
        radio.value = resposta
        radio.id = resposta

        label.htmlFor = radio.id
        label.appendChild(radio)
        label.appendChild(document.createTextNode(quitarPuntoCero(resposta)))

        radios.appendChild(label)
    })

    document.querySelector('#nPregunta').innerText = `Pregunta ${
        indice + 1
    } de ${arrayPreguntas.length}`
    document.querySelector('#preguntaUno').innerText =
        arrayPreguntas[indice].tit
    document.querySelector('#preguntaDos').innerText =
        arrayPreguntas[indice].texto

    displaySeExiste('#textocompletar', 'none')
}

function crearTextoCompletar() {
    const respostasForm = document.getElementById('respostas')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'textocompletar')
    input.setAttribute('id', 'textocompletar')
    input.setAttribute('placeholder', 'Respuesta')
    input.setAttribute('aria-label', 'Respuesta')

    respostasForm.prepend(input)
    return input
}

function crearSubmit(tipo) {
    const botons = document.getElementById('botons')
    const input = document.createElement('input')
    input.setAttribute('type', 'submit')
    input.setAttribute('value', 'Enviar')
    input.setAttribute('id', `submit${tipo}`)
    input.setAttribute('class', 'botonenviar botons submit')
    input.setAttribute('aria-label', 'Enviar')

    botons.append(input)
    return input
}

function crearMostrarResposta(tipo) {
    const botons = document.getElementById('botons')
    const input = document.createElement('input')
    input.setAttribute('type', 'submit')
    input.setAttribute('value', 'No sé')
    input.setAttribute('id', `mostrarrespuesta${tipo}`)
    input.setAttribute('class', 'botonenviar botons mostrarresposta')
    input.setAttribute('aria-label', 'No sé')

    botons.append(input)
    return input
}

function quitarPuntoCero(artigo) {
    let artigoArray = artigo.split('.')
    if (artigoArray[1] === '0') {
        return artigoArray[0]
    } else {
        return artigo
    }
}
