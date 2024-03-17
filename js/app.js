const llaveDeEncriptacion = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
};
const llaveDeDesencriptacion = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u"
};
var validarTextoExpReg = /^[a-z\s]+$/;
var input = document.querySelector("[name='dataParaEncriptar']");
var elementoResult = document.querySelector("#content-result");
var mensajeDeValidacion = document.querySelector("#mensajeDeValidacion");

function encriptarTexto() {
    mensajeDeValidacion.classList.remove("alert-validacion");
    if (validarTextoExpReg.test(input.value) === true) {
        //? Cifrado de texto
        let resultEcriptacion = input.value.replace(/[aeiou]/g, vocal => llaveDeEncriptacion[vocal]);
        elementoResult.innerHTML = `
        <div class='contenedor-texto-cifrado' id='texto-cifrado'>${resultEcriptacion}</div>
        <div class='contenedor-boton-copiar'>
            <button class='btn btn-white' onclick='copiarEncriptacion()'>Copiar</button>
        </div>`;
    } else {
        //? Mostrar mensaje de validacion
        mensajeDeValidacion.classList.add("alert-validacion");
    }
}

function descrifrarTexto() {
    let descencriptadorExpReg = new RegExp(Object.keys(llaveDeDesencriptacion).join("|"), "g");
    let textoDescencriptado = input.value.replace(descencriptadorExpReg, vocal => llaveDeDesencriptacion[vocal]);
    elementoResult.innerHTML = `
    <div class='contenedor-texto-cifrado' id='texto-cifrado'>${textoDescencriptado}</div>
    <div class='contenedor-boton-copiar'>
        <button class='btn btn-white' onclick='copiarEncriptacion()'>Copiar</button>
    </div>`;
}

async function copiarEncriptacion() {
    let texto = document.getElementById("texto-cifrado").innerText;
    try {
        //? Utiliza la API de Clipboard para copiar el texto al portapapeles
        //? Usamos await para esperar que se resuelva la promesa
        console.log("Copiando texto en el portapapeles")
        await navigator.clipboard.writeText(texto);
        console.log("Texto copiado en el portapales")
    } catch (err) {
        //? Manejar posibles errores (por ejemplo, permiso denegado)
        console.error("Error al copiar texto: ", err);
    }
}