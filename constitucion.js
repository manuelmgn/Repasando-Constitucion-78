const titulos = [
    {
        numero: null,
        id: "-1",
        texto: "Preámbulo"
    },
    {
        numero: null,
        id: "0",
        texto: "Título Preliminar"
    },
    {
        numero: 1,
        id: "1",
        texto: "Título I. De los derechos y deberes fundamentales"
    },
    {
        numero: 2,
        id: "2",
        texto: "Título II. De la Corona"
    },
    {
        numero: 3,
        id: "3",
        texto: "Título III. De las Cortes Generales."
    },
    {
        numero: 4,
        id: "4",
        texto: "Título IV. Del Gobierno y de la Administración"
    },
    {
        numero: 5,
        id: "5",
        texto: "Título V. De las relaciones entre el Gobierno y las Cortes Generales"
    },
    {
        numero: 6,
        id: "6",
        texto: "Título VI. Del Poder Judicial"
    },
    {
        numero: 7,
        id: "7",
        texto: "Título VII. Economía y Hacienda"
    },
    {
        numero: 8,
        id: "8",
        texto: "Título VIII. De la Organización Territorial del Estado"
    },
    {
        numero: 9,
        id: "9",
        texto: "Título IX. Del Tribunal Constitucional."
    },
    {
        numero: 10,
        id: "10",
        texto: "Título X. De la reforma constitucional"
    },
    {
        numero: null,
        id: "11",
        texto: "Disposiciones adicionales"
    },
    {
        numero: null,
        id: "12",
        texto: "Disposiciones transitorias"
    },
    {
        numero: null,
        id: "13",
        texto: "Disposición derogatoria."
    },
    {
        numero: null,
        id: "14",
        texto: "Disposición final"
    },
];

const capitulos = [
    {
        numero: 1,
        id: "1.1",
        texto: "Capítulo I. De los españoles y los extranjeros"
    },
    {
        numero: 2,
        id: "1.2",
        texto: "Capítulo II. Derechos y libertades"
    },
    {
        numero: 3,
        id: "1.3",
        texto: "Capítulo III: De los principios rectores de la política social y económica"
    },
    {
        numero: 4,
        id: "1.4",
        texto: "Capítulo IV: De las garantías de las libertades y derechos fundamentales"
    },
    {
        numero: 5,
        id: "1.5",
        texto: "Capítulo V: De la suspensión de los derechos y libertades"
    },
    {
        numero: 1,
        id: "3.1",
        texto: "Capítulo I. De las Cámaras"
    },
    {
        numero: 2,
        id: "3.2",
        texto: "Capítulo II. De la elaboración de las leyes"
    },
    {
        numero: 3,
        id: "3.3",
        texto: "Capítulo III. De los Tratados Internacionales"
    },
    {
        numero: 1,
        id: "8.1",
        texto: "Capítulo I. Principios generales"
    },
    {
        numero: 2,
        id: "8.2",
        texto: "Capítulo II. De la Administración Local"
    },
    {
        numero: 3,
        id: "8.3",
        texto: "Capítulo III. De las Comunidades Autónomas"
    },
]

let artigos = [];


class Artigo {
    constructor(numeracionCompleta, texto) {
        //numeracionCompleta: titulo.capitulo.seccion.articulo.punto
        this.numeracionCompleta = numeracionCompleta.split('.').map(Number);
        this.tituloNumero = this.numeracionCompleta[0];
        this.tituloString = this.tituloString(this.tituloNumero);
        this.capituloNumero = this.numeracionCompleta[1];
        this.capituloString = this.capituloString(this.numeracionCompleta);
        this.seccionNumero = this.numeracionCompleta[2];
        this.seccionString = this.seccionString(this.numeracionCompleta);
        this.artigoNumero = this.numeracionCompleta[3];
        this.puntoNumero = this.numeracionCompleta[4];
        this.texto = texto;

    }
    tituloString(tituloNumero) {
        if (tituloNumero) {
            const tituloEncontrado = titulos.find( tit => tit.id === tituloNumero.toString())
            return tituloEncontrado.texto
        } else {
            return "Erro"
        }
    }
    capituloString(numeracionCompleta) {
        if (numeracionCompleta[1] === 0) {
            return ""
        } else {
            let capituloNumero = numeracionCompleta[0].toString().concat(".", numeracionCompleta[1].toString());
            if (capituloNumero) {
                const capituloEncontrado = capitulos.find( cap => cap.id === capituloNumero)
                return capituloEncontrado.texto
            } else {
                return "Erro"
            }
        }
    }
    seccionString(numeracionCompleta) {
        if (numeracionCompleta[2] === 0) {
            return ""
        } else {
            let seccionNumero = numeracionCompleta[0].concat(".", numeracionCompleta[1], ".", numeracionCompleta[2]);
            switch (seccionNumero) {
                case "1.2.1": return "Sección I. De los derechos fundamentales y de las libertades públicas"; break;
                case "1.2.2": return "Sección II. De los derechos y deberes de los ciudadanos"; break;
                default: return "Erro"; break;
            }
        }
    }
    mostrarCapitulo() {
        console.log(`Pertence ao ${capituloString}`);
    }
}

const artigo11 = new Artigo("1.1.0.11.1", "La nacionalidad española se adquiere, se conserva y se pierde de acuerdo con lo establecido por la ley");

console.log(artigo11)