function borrar(elem) {
    let elemId = elem.parentNode.parentNode.id;
    let borrarElem = localArray.map(function (item) {
        return item.id;
    }).indexOf(elemId);

    document.getElementById(elemId).style.display = "none";
    localArray.splice(borrarElem, 1);
    console.log(localArray);
    localStorage.setItem("cargaArray", JSON.stringify(localArray));
}