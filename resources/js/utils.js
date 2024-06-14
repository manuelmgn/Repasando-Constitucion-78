export function mostrarErro(placeholder = true) {
    document.querySelector('#metade2').classList.add('erro')
    document.querySelector('#resultado').style.display = 'block'
    if (placeholder) {
        document.querySelector('#textocompletar').placeholder = '¡Incorrecto!'
    }
    setTimeout(() => {
        document.querySelector('#metade2').classList.remove('erro')
        if (placeholder) {
            document.querySelector('#textocompletar').placeholder = ''
        }
    }, 1000)
}

export function mostrarAcerto(placeholder = true) {
    document.querySelector('#metade2').classList.add('acerto')
    if (placeholder) {
        document.querySelector('#textocompletar').placeholder = '¡Muy bien!'
    }
    setTimeout(() => {
        document.querySelector('#metade2').classList.remove('acerto')
        if (placeholder) {
            document.querySelector('#textocompletar').placeholder = ''
        }
    }, 1000)
}

export function limpar() {
    document.querySelector('#nPregunta').style.display = 'none'
    document.querySelector('#preguntaUno').style.display = 'none'
    document.querySelector('#preguntaDos').style.display = 'none'
    document.querySelector('#botons').style.display = 'none'
    document.querySelector('#resultado').style.display = 'none'

    document.querySelector('#nPregunta').innerText = ''
    document.querySelector('#preguntaUno').innerText = ''
    document.querySelector('#preguntaDos').innerText = ''
    document.querySelector('#resultado').innerText = ''

    removeSeExiste('#textocompletar')
    removeSeExiste('#radios')
    removeSeExiste('#submitCompletar')
    removeSeExiste('#mostrarrespuestaCompletar')
    removeSeExiste('#submitNumero')
    removeSeExiste('#mostrarrespuestaNumero')
}

export function limparRadios() {
    const radios = document.querySelector('#radios')
    radios.remove()
}

export function finish(acertos, total) {
    preguntaUno.style.display = 'block'
    preguntaUno.innerText = '¡Fin!'
    preguntaDos.style.display = 'none'
    let porcentaxeAcertos = Math.round(acertos / total) * 100
    let parabens = ''
    if (porcentaxeAcertos > 0 && porcentaxeAcertos < 20) {
        parabens = ' Te queda mucho por estudiar.'
    } else if (porcentaxeAcertos >= 20 && porcentaxeAcertos < 50) {
        parabens = ' No está mal. Sigue trabajando.'
    } else if (porcentaxeAcertos >= 50 && porcentaxeAcertos < 75) {
        parabens = ' ¡Muy bien! Sigue así.'
    } else if (porcentaxeAcertos >= 75 && porcentaxeAcertos < 95) {
        parabens = ' ¡Espectacular!'
    } else if (porcentaxeAcertos >= 95) {
        parabens = ' Crack 🤙.'
    }
    let textoResumo = `<p>Has respondido correctamente <span class="resaltar">${acertos}</span> preguntas de <span class="resaltar">${total}</span>, el <span class="resaltar">${porcentaxeAcertos}%</span>.${parabens}</p>`
    if (acertos === 1) {
        textoResumo = `<p>Has respondido correctamente <span class="resaltar">1</span> pregunta de <span class="resaltar">${total}</span>.</p>`
    } else if (acertos === 0) {
        textoResumo = `<p>No has respondido correctamente ninguna pregunta 😥.</p><p></p>Es mejor que estudies un poco antes de volver a intenarlo.</p>`
    }

    document.querySelector('#nPregunta').style.display = 'none'
    document.querySelector('#respostas').style.display = 'none'
    document.querySelector('#resultado').style.display = 'block'
    document.querySelector('#resultado').innerHTML = textoResumo
}

export function preChecks() {
    document.querySelector('#numero-puntos').checked = true
    document.querySelectorAll('input[name=titulos]').forEach((input) => {
        input.checked = true
    })
    document.querySelector('#num-preguntas').value = 100
}

export function misturarArray(array) {
    let tamanho = array.length
    array = array.sort(() => Math.random() - `0.${tamanho}`)
    array = array.sort(() => Math.random() - `0.${tamanho}`)
    array = array.sort(() => Math.random() - `0.${tamanho}`)
    array = array.sort(() => Math.random() - `0.${tamanho}`)
    return array
}

export function cortarArray(array, limite) {
    return array.slice(0, limite)
}

export function chequearDuplicadosArray(array, idSolucion) {
    const set = new Set()
    let uniqueArray = [...array]
    let tituloArray = idSolucion.split('.')
    let titulo = parseInt(tituloArray[0])

    while (
        uniqueArray.some((item, index) => uniqueArray.indexOf(item) !== index)
    ) {
        uniqueArray = uniqueArray.map((item, index) => {
            if (set.has(item)) {
                let novoValor
                let novoArtigo
                do {
                    novoValor = xerarNumeroCercano(titulo, 2)
                    if (novoValor === 0) {
                        novoValor = novoValor + 1
                    }
                    if (novoValor < 0) {
                        novoValor = novoValor * -1
                    }
                    let punto = Math.floor(Math.random() * 6)
                    novoArtigo = `${novoValor}.${punto}`
                } while (uniqueArray.includes(novoArtigo))
                set.add(novoArtigo)
                return novoArtigo
            } else {
                set.add(item)
                return item
            }
        })
        set.clear()
    }

    return uniqueArray
}

export function removeSeExiste(selector) {
    if (document.querySelector(selector)) {
        document.querySelector(selector).remove()
    }
}

export function displaySeExiste(selector, opcionDisplay) {
    if (document.querySelector(selector)) {
        document.querySelector(selector).style.display = opcionDisplay
    }
}

export function xerarNumeroCercano(numeroDado, desviacion) {
    // Función para generar un número aleatorio con distribución normal (Box-Muller)
    function xerarNormalAleatorio() {
        let u = 0,
            v = 0
        while (u === 0) u = Math.random() // Convertir [0,1) a (0,1)
        while (v === 0) v = Math.random()
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    }

    // Generar número cercano usando distribución normal
    let numeroAleatorio = xerarNormalAleatorio()
    let resultado = Math.round(numeroDado + numeroAleatorio * desviacion)
    return resultado
}
