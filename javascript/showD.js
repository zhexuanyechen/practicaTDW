function showD(elem) {
    elemId = elem.parentNode.id;
    let objetoShow = localizarElem(elemId);
    formulario.innerHTML = "";

    for (let atributo in objetoShow) {
        if (atributo == "persona" || atributo == "entidad") {
            let id = "lista" + atributo;
            formulario.innerHTML += "<div class='mb-2'><h4>" + atributo + "</h4><ul class='datos' id='" + id + "'></ul></div>";
            for (let i = 0; i < objetoShow[atributo].length; i++) {
                let elemAux = localArray.find(objeto => objeto.id == objetoShow[atributo][i]);
                let texto = elemAux.nombre;
                document.getElementById(id).innerHTML += "<li>" + texto + "</li>";
            }
        } else if (atributo != "id" && atributo != "tipo") {
            formulario.innerHTML += "<div class='mb-2'><h4>" + atributo + "</h4><p class='datos'>" + objetoShow[atributo] + "</p></div>";
        }
    }
}

document.querySelectorAll(".imagen").forEach(item => {
    item.addEventListener("click", function () {
        showD(this);
    })
})