// Función para guardar los datos del formulario en localStorage
function guardarDatos(event) {
  event.preventDefault(); // Evitar que el formulario se envíe y recargue la página

  // Obtener los valores de los campos del formulario

  let id = document.getElementById("id").value;
  let nombre = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let tipoID = document.getElementById("tipoDocumento").value;

  //muestra el valor del select

  document.getElementById("datosAlmacenados").innerText = tipoID;

  //limpia el formulario
  document.getElementById("formulario").reset();

  // Crear un objeto con los datos del formulario
  let datosFormulario = {
    tipoID: tipoID,
    id: id,
    nombre: nombre,
    email: email,
  };

  // Almacenar los datos en localStorage como un string JSON
  localStorage.setItem("datosUsuario", JSON.stringify(datosFormulario));

  // Mostrar los datos almacenados
  mostrarDatos();
}

// Función para mostrar los datos almacenados
// function mostrarDatos() {
//   // Verificar si hay datos almacenados en localStorage
//   if (localStorage.getItem("datosUsuario")) {
//     let datos = JSON.parse(localStorage.getItem("datosUsuario"));
//     // let datosHTML = `<p>Tipo Documento: ${datos.tipoID}</p>
//     //                      <p>Dni: ${datos.id}</p>
//     //                      <p>Nombre: ${datos.nombre}</p>
//     //                      <p>Email: ${datos.email}</p>`;
//     // document.getElementById("datosAlmacenados").innerHTML = datosHTML;
//   }
// }

function agregarFila() {
  var tabla = document
    .getElementById("miTabla")
    .getElementsByTagName("tbody")[0];
  var nuevaFila = tabla.insertRow();
  for (var i = 0; i < 3; i++) {
    var nuevaCelda = nuevaFila.insertCell(i);
    nuevaCelda.contentEditable = "true";
  }
}

function mostrarDatos() {
  if (localStorage.getItem("datosUsuario")) {
    let datos = JSON.parse(localStorage.getItem("datosUsuario"));
    let divDatos = document.getElementById("datosAlmacenados");
    // Crear tabla
    let tabla = document.createElement("table");
    let thead = tabla.createTHead();
    let tbody = tabla.createTBody();
    //insertamos las celdas de los encabezados
    let encabezado = thead.insertRow();
    let celdaEncabezado1 = encabezado.insertCell(0);
    let celdaEncabezado2 = encabezado.insertCell(1);
    let celdaEncabezado3 = encabezado.insertCell(2);
    let celdaEncabezado4 = encabezado.insertCell(3);
    let celdaEncabezado5 = encabezado.insertCell(4);
    let celdaEncabezado6 = encabezado.insertCell(5);
    let celdaEncabezado7 = encabezado.insertCell(6);
    celdaEncabezado1.textContent = "Tipo de Documento";
    celdaEncabezado2.textContent = "DNI";
    celdaEncabezado3.textContent = "Nombre";
    celdaEncabezado4.textContent = "Email";
    celdaEncabezado5.textContent = "Producto";
    celdaEncabezado6.textContent = "Cantidad";
    celdaEncabezado7.textContent = "Valor";

    //insertamos las celdas donde va la informacion
    let nuevaFila = tbody.insertRow();
    let celdaTipoID = nuevaFila.insertCell(0);
    let celdaID = nuevaFila.insertCell(1);
    let celdaNombre = nuevaFila.insertCell(2);
    let celdaEmail = nuevaFila.insertCell(3);
    let celdaProducto = nuevaFila.insertCell(3);
    let celdaCantidad = nuevaFila.insertCell(3);
    let celdaValor = nuevaFila.insertCell(3);
    celdaTipoID.textContent = datos.tipoID;
    celdaID.textContent = datos.id;
    celdaNombre.textContent = datos.nombre;
    celdaEmail.textContent = datos.email;
    celdaProducto.textContent = datos.producto;
    celdaCantidad.textContent = datos.cantidad;
    celdaValor.textContent = datos.valor;
    // Agregar la tabla al div
    datos.datos.divDatos.innerHTML = "";
    // Limpiar el contenido previo
    divDatos.appendChild(tabla);
  }
}

// Mostrar los datos almacenados al cargar la página
window.onload = mostrarDatos;
