let elemId, indiceElem, objetoEditar;
let formulario = document.getElementById("mBodyFormulario");
let localArray = JSON.parse(localStorage.getItem("cargaArray"));

function localizarElem(elemId) {
    indiceElem = localArray.map(function (item) {
        return item.id;
    }).indexOf(elemId);
    let objetoLocalizado = localArray[indiceElem];
    return objetoLocalizado;
}

function imprimirCheckbox(arrayAux, localArray, atributo) {
    for (let i = 0; i < localArray.length; i++) {
        let idAux = localArray[i].id;
        if (localArray[i].tipo == atributo) {
            let checked = "";
            for (let i = 0; i < arrayAux.length; i++) {
                if (arrayAux[i] == idAux) {
                    checked = "checked";
                } //Checkea los que ya tiene
            }
            document.getElementById(atributo).innerHTML +=
                "<div class='form-check'><input type='checkbox' class='form-check-input' name='" + atributo + "' value='" + idAux + "' id='" + idAux + "'" + checked + ">" +
                "<label class='form-check-label' for='" + idAux + "'>" + idAux + "</label></div>";
            checked = "";
        } //Imprime todas las opciones de personas o entidades 
    }
    console.log("Div");
}

function editar(elem) {
    elemId = elem.parentNode.parentNode.id;
    objetoEditar = localizarElem(elemId);
    cargarFormulario(objetoEditar);
}

function cargarFormulario(objetoF) {
    formulario.innerHTML = "";
    for (let atributo in objetoF) {
        if (atributo == "nombre") {
            formulario.innerHTML += "<div class='mb-2'><label for='nombre' class='form-label'>Nombre</label>" +
                "<input type='text' class='form-control' value='" + objetoF[atributo] + "' id='nombre'></div>";
        } else if (atributo == "fecha_nac" || atributo == "fecha_def") {
            formulario.innerHTML += "<div class='mb-2'><label for='" + atributo + "' class='form-label'>" + atributo + "</label>" +
                "<input type='date' class='form-control' value='" + objetoF[atributo] + "' id='" + atributo + "'></div>";
        } else if (atributo == "wiki" || atributo == "img") {
            formulario.innerHTML += "<div class='mb-2'><label for='" + atributo + "' class='form-label'>" + atributo + "</label>" +
                "<input type='url' class='form-control' value='" + objetoF[atributo] + "' id='" + atributo + "'></div>";
        } else if (atributo == "persona" || atributo == "entidad") {
            formulario.innerHTML += "<div class='mb-2' id='" + atributo + "'><h4>" + atributo + "</h4>";
            imprimirCheckbox(objetoF[atributo], localArray, atributo);
            formulario.innerHTML += "</div>";
        }
    }
}

document.getElementById("guardarCambios").addEventListener("click", function () {
    guardar(objetoEditar, true);
});