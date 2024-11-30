// Función para guardar los datos del formulario en localStorage
function guardarDatos(event) {
  event.preventDefault();
  // Obtener los valores de los campos del formulario

  let id = document.getElementById("id").value;
  let nombre = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let tipoID = document.getElementById("tipoDocumento").value;

  // Obtener el valor del campo textarea
  let messageElement = document.getElementById("message");
  let observacion = messageElement ? messageElement.value : null;

  if (!observacion) {
    console.error("Elemento con id 'message' no encontrado.");
    return;
  }

  console.log("Element message:", messageElement);
  console.log("Value:", observacion);

  // Crear un objeto con los datos del formulario
  let datosFormulario = {
    tipoID: tipoID,
    id: id,
    nombre: nombre,
    email: email,
    observacion: observacion,
  };

  // Almacenar los datos en localStorage como un string JSON
  localStorage.setItem("datosUsuario", JSON.stringify(datosFormulario));
  mostrarMensage();
  // Mostrar los datos almacenados
  mostrarDatosCliente();
}

function mostrarMensage() {
  if (localStorage.getItem("datosUsuario")) {
    let mesagge = JSON.parse(localStorage.getItem("datosUsuario"));
    let mensajeHTML = `<p>Observacion</p>,
    <p>${mesagge.observacion}</p>`;

    document.getElementById("mensajeObservacion").innerHTML = mensajeHTML;

    console.log("Mensaje mostrado:", mensajeHTML);
  }
}

function mostrarDatosCliente() {
  if (localStorage.getItem("datosUsuario")) {
    let datos = JSON.parse(localStorage.getItem("datosUsuario"));
    let divDatos = document.getElementById("datosCliente");
    console.log(datos);
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

    celdaEncabezado1.textContent = "Tipo de Documento";
    celdaEncabezado2.textContent = "DNI";
    celdaEncabezado3.textContent = "Nombre";
    celdaEncabezado4.textContent = "Email";

    //insertamos las celdas donde va la informacion
    let nuevaFila = tbody.insertRow();
    let celdaTipoID = nuevaFila.insertCell(0);
    let celdaID = nuevaFila.insertCell(1);
    let celdaNombre = nuevaFila.insertCell(2);
    let celdaEmail = nuevaFila.insertCell(3);

    celdaTipoID.textContent = datos.tipoID;
    celdaID.textContent = datos.id;
    celdaNombre.textContent = datos.nombre;
    celdaEmail.textContent = datos.email;

    // Agregar la tabla al div
    divDatos.innerHTML = "";

    // Limpiar el contenido previo
    divDatos.appendChild(tabla);

    console.log(divDatos);
  }
}

// Función para validar que solo se ingresen números en los campos de número
function validarNumero(elemento) {
  // Si el valor del elemento no es un número válido, elimina los caracteres no numéricos
  if (!/^\d*$/.test(elemento.value)) {
    elemento.value = elemento.value.replace(/\D/g, "");
  }
}

// Función para actualizar el valor del producto basado en la cantidad y el valor unitario
function actualizarValorProducto(elemento) {
  // Obtiene la fila correspondiente al elemento actualizado
  const fila = elemento.parentElement.parentElement;
  // Obtiene los valores de cantidad y valor unitario
  const cantidad =
    parseFloat(fila.querySelector('[name="cantidad"]').value) || 0;
  const valorUnitario =
    parseFloat(fila.querySelector('[name="valorUnitario"]').value) || 0;
  // Calcula el valor del producto
  const valorProducto = cantidad * valorUnitario;
  // Asigna el valor calculado al campo de valor producto
  fila.querySelector('[name="valorProducto"]').value = valorProducto;
  // Actualiza el total del valor de los productos
  calcularTotal();
}

// Función para agregar una nueva fila a la tabla
function agregarFila() {
  const tabla = document
    .getElementById("miTabla")
    .getElementsByTagName("tbody")[0];
  const nuevaFila = tabla.insertRow();
  // Añade celdas con campos de entrada para producto, cantidad y valor unitario
  nuevaFila.innerHTML = `
        <td><input type="text" name="producto"></td>
        <td><input type="number" name="cantidad" oninput="validarNumero(this); actualizarValorProducto(this)"></td>
        <td><input type="number" name="valorUnitario" oninput="validarNumero(this); actualizarValorProducto(this)"></td>
        <td><input type="number" name="valorProducto" readonly></td>
    `;
}

// Función para calcular el total del valor de los productos
function calcularTotal() {
  const productos = document.querySelectorAll(
    '#miTabla [name="valorProducto"]'
  );
  let total = 0;
  // Suma los valores de todos los productos
  productos.forEach((producto) => {
    total += parseFloat(producto.value) || 0;
  });
  // Asigna el total calculado al campo correspondiente
  document.getElementById("totalValorProducto").value = total;
}

// Función para guardar los datos en el Local Storage
function guardarDatos() {
  const filas = document.querySelectorAll("#miTabla tbody tr");
  let datos = [];
  // Recorre las filas y recoge los datos en un array
  filas.forEach((fila) => {
    let producto = fila.querySelector('[name="producto"]').value;
    let cantidad =
      parseFloat(fila.querySelector('[name="cantidad"]').value) || 0;
    let valorUnitario =
      parseFloat(fila.querySelector('[name="valorUnitario"]').value) || 0;
    let valorProducto =
      parseFloat(fila.querySelector('[name="valorProducto"]').value) || 0;
    datos.push({ producto, cantidad, valorUnitario, valorProducto });
  });
  // Guarda el array de datos en el Local Storage
  localStorage.setItem("datosTabla", JSON.stringify(datos));
  // Muestra los datos guardados en la tabla correspondiente
  mostrarDatosGuardados();
}

// Función para mostrar los datos guardados en una nueva tabla
function mostrarDatosGuardados() {
  const datos = JSON.parse(localStorage.getItem("datosTabla")) || [];
  const divTablaGuardada = document.getElementById("tablaPedido");
  console.log(divTablaGuardada);
  if (datos.length > 0) {
    const tablaGuardada = document.createElement("table");
    tablaGuardada.innerHTML = `
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Valor Unitario</th>
                    <th>Valor Producto</th>
                </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Total Valor Producto:</td>
                    <td><input type="number" id="totalGuardado" readonly></td>
                </tr>
            </tfoot>
        `;
    let total = 0;
    // Recorre los datos y crea filas en la nueva tabla
    datos.forEach((dato) => {
      let nuevaFila = tablaGuardada.querySelector("tbody").insertRow();
      nuevaFila.innerHTML = `
                <td>${dato.producto}</td>
                <td>${dato.cantidad}</td>
                <td>${dato.valorUnitario}</td>
                <td>${dato.valorProducto}</td>
            `;
      total += dato.valorProducto;
    });
    // Asigna el total calculado al campo correspondiente
    tablaGuardada.querySelector("#totalGuardado").value = total;
    divTablaGuardada.innerHTML = "";
    divTablaGuardada.appendChild(tablaGuardada);
  } else {
    divTablaGuardada.innerHTML = "<p>No hay datos guardados.</p>";
  }
}

// Evento que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  // Muestra los datos guardados al cargar la página
  mostrarDatosCliente();
  mostrarDatosGuardados();
  mostrarMensage();
  //limpia el formulario
  document.getElementById("formulario").reset();
});
