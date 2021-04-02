function guardar(objetoEditado, editando) {
    console.log("guardo");
    let objetoGuardar = objetoEditado;
    let inputs = formulario.querySelectorAll('input[type=text], input[type=date], input[type = url]');

    for (let i = 0; i < inputs.length; i++) {
        console.log(inputs[i].id);
        objetoGuardar[inputs[i].id] = inputs[i].value;
    }
    if (objetoGuardar["persona"] != null)
        objetoGuardar["persona"] = guardarCheckbox("persona");

    if (objetoGuardar["entidad"] != null)
        objetoGuardar["entidad"] = guardarCheckbox("entidad");

    if (editando === true) {
        localArray[indiceElem] = objetoGuardar;
    } else if (editando === false) {
        console.log(objetoGuardar);
        localArray.push(objetoGuardar);
    }

    console.log(objetoGuardar);
    localStorage.setItem("cargaArray", JSON.stringify(localArray));
    cargarIndex();
    location.reload();
}

function guardarCheckbox(atributo) {
    let array = document.getElementsByName(atributo);
    let arrayAux = [];
    array.forEach(function (item) {
        if (item.checked) {
            arrayAux.push(item.value);
        }
    });
    return arrayAux;
}