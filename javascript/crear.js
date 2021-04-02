let id = 0;

function crear(ID) {
    document.getElementById("save").innerHTML = "<button type='submit' id='guardarNuevo' class='btn loginbtn' data-bs-dismiss='modal'> Guardar </button>";
    document.getElementById("modalFormTitulo").innerHTML = "Añadir nuevo";
    let objetoCrear;
    formulario.innerHTML = "";

    if (ID == "btnProducto") {
        objetoCrear = new Producto(id, "", "", "", "", "", [], []);
        id++;
    } else if (ID == "btnEntidad") {
        objetoCrear = new Entidad(id, "", "", "", "", "", []);
        id++;
    } else if (ID == "btnPersona") {
        objetoCrear = new Persona(id, "", "", "", "", "");
        id++;
    }
    console.log("creando");
    cargarFormulario(objetoCrear);

    document.getElementById("guardarNuevo").addEventListener("click", function () {
        guardar(objetoCrear, false);
        console.log("Creado");
    });
}