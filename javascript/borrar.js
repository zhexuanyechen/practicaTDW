function borrar(elem) {
    let elemId = elem.parentNode.parentNode.id;
    let borrarElem = localArray.map(function (item) {
        return item.id; //crea un nuevo array con ids
    }).indexOf(elemId); //busca el objeto con ese id y devuelve el indice

    document.getElementById(elemId).style.display = "none";
    localArray.splice(borrarElem, 1); //borra el elemento
    console.log(localArray);
    localStorage.setItem("cargaArray", JSON.stringify(localArray));
}