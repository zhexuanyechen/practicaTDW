let elemId, indiceElem, objetoEditar;
let formulario = document.getElementById("mBodyFormulario");
let localArray = JSON.parse(localStorage.getItem("cargaArray"));

function crear(ID) {
    document.getElementById("save").innerHTML = "<button type='submit' id='guardarNuevo' class='btn loginbtn' data-bs-dismiss='modal'> Guardar </button>";
    document.getElementById("modalFormTitulo").innerHTML = "Añadir nuevo";
    let objetoCrear;
    formulario.innerHTML = "";

    if (ID == "btnProducto") {
        objetoCrear = new Producto(Math.random().toString(), "", "", "", "", "", [], []);
    } else if (ID == "btnEntidad") {
        objetoCrear = new Entidad(Math.random().toString(), "", "", "", "", "", []);
    } else if (ID == "btnPersona") {
        objetoCrear = new Persona(Math.random().toString(), "", "", "", "", "");
    }
    cargarFormulario(objetoCrear);

    document.getElementById("guardarNuevo").addEventListener("click", function () {
        guardar(objetoCrear, false);
    });
} //Crea un nuevo objeto

function guardar(elemGuardar, editando) {
    let objetoGuardar = elemGuardar;
    let inputs = formulario.querySelectorAll('input[type=text], input[type=date], input[type = url]');

    for (let i = 0; i < inputs.length; i++)
        objetoGuardar[inputs[i].id] = inputs[i].value;

    if (objetoGuardar["persona"] != null)
        objetoGuardar["persona"] = guardarCheckbox("persona");

    if (objetoGuardar["entidad"] != null)
        objetoGuardar["entidad"] = guardarCheckbox("entidad");

    if (editando === true) {
        localArray[indiceElem] = objetoGuardar;
    } else if (editando === false) {
        objetoGuardar["id"] = elemGuardar["id"];
        localArray.push(objetoGuardar);
    }
    console.log(JSON.stringify(objetoGuardar));
    localStorage.setItem("cargaArray", JSON.stringify(localArray));
    cargarIndex();
    location.reload();
} //Guarda un nuevo objeto o los cambios realizados

function guardarCheckbox(atributo) {
    let array = document.getElementsByName(atributo);
    let arrayAux = [];
    array.forEach(function (item) {
        if (item.checked) {
            arrayAux.push(item.value);
        }
    });
    return arrayAux;
} //Recorre los valores del Checkbox y los guarda en un array

function localizarElem(elemId) {
    indiceElem = localArray.map(function (item) {
        return item.id;
    }).indexOf(elemId); // encuentra el indice del elemento pasado
    let objetoLocalizado = localArray[indiceElem];
    console.log(objetoLocalizado);
    return objetoLocalizado;
} //Devuelve el objeto dado un indice

function imprimirCheckbox(arrayAux, localArray, atributo) {
    for (let i = 0; i < localArray.length; i++) {
        let idAux = localArray[i].id;
        if (localArray[i].tipo == atributo) {
            let checked = "";
            for (let j = 0; j < arrayAux.length; j++) {
                if (arrayAux[j] == idAux) {
                    checked = "checked";
                } //Checkea los que ya tiene
            }
            document.getElementById(atributo).innerHTML +=
                "<div class='form-check'><input type='checkbox' class='form-check-input' name='" + atributo + "' value='" + idAux + "' id='" + idAux + "'" + checked + ">" +
                "<label class='form-check-label' for='" + idAux + "'>" + localArray[i].nombre + "</label></div>";
            checked = "";
        }
    }
} //Imprime todas las opciones de personas o entidades

function editar(elem) {
    elemId = elem.parentNode.parentNode.id;
    objetoEditar = localizarElem(elemId);
    console.log("editando objeto con id:" + objetoEditar["id"]);
    cargarFormulario(objetoEditar);
} //Permite editar un objeto

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
} //Carga el formulario para editar o crear

document.getElementById("guardarCambios").addEventListener("click", function () {
    guardar(objetoEditar, true);
});