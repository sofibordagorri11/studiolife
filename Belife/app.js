function mostrarPrecio(servicio, precio) {
  document.getElementById("resultado").innerHTML = `
    <h4>Servicio: ${servicio}</h4>
    <p>Precio estimado: $${precio}</p>
  `;
}