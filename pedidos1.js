// Función para guardar los datos del formulario en localStorage
function guardarDatos(event) {
  event.preventDefault(); // Evitar que el formulario se envíe y recargue la página

  // Obtener los valores de los campos del formulario
  let tipoID = document.getElementById("tipoDocumento").value;
  let id = document.getElementById("id").value;
  let nombre = document.getElementById("name").value;
  let email = document.getElementById("email").value;

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


var filaId = 1; // Contador para las filas

function agregarFila() {
  var tabla = document.getElementById('miTabla').getElementsByTagName('tbody')[0];
  var nuevaFila = tabla.insertRow();
  var celdaProducto = nuevaFila.insertCell(0);
  var celdaCantidad = nuevaFila.insertCell(1);
  var celdaValorUnitario = nuevaFila.insertCell(2);
  var celdaPrecio = nuevaFila.insertCell(3);
  celdaProducto.contentEditable = "true";
  celdaCantidad.contentEditable = "true";
  celdaValorUnitario.contentEditable = "true";
  celdaCantidad.id = 'cantidad-' + filaId;
  celdaValorUnitario.id = 'valorUnitario-' + filaId;
  celdaPrecio.id = 'precio-' + filaId;
  //validando celdas
  celdaProducto.setAttribute('oninput', 'validarTexto(this)');
  celdaCantidad.setAttribute('oninput', 'validarNumero(this); calcularPrecio(' + filaId + ')');
  celdaValorUnitario.setAttribute('oninput', 'validarNumero(this); calcularPrecio(' + filaId + ')');
  filaId++; // Incrementar el contador de filas
}
function validarNumero(celda) {
  var valor = celda.textContent;
  if (/[^0-9.]/.test(valor)) {
    celda.textContent = valor.replace(/[^0-9.]/g, '');

  }
} function validarTexto(celda) {
  var valor = celda.textContent; if (/[^a-zA-Z\s]/.test(valor)) {
    celda.textContent = valor.replace(/[^a-zA-Z\s]/g, '');

  }
}

// calcular el el precio multiplicando la cantidad con el valor unitario
function calcularPrecio(id) {
  var cantidad = parseFloat(document.getElementById('cantidad-' + id).textContent) || 0;
  var valorUnitario = parseFloat(document.getElementById('valorUnitario-' + id).textContent) || 0;
  var precio = cantidad * valorUnitario;
  document.getElementById('precio-' + id).textContent = precio.toFixed(2);
  calcularTotal();
}


function calcularTotal() {
  var total = 0;
  for (var i = 0; i < filaId; i++) {
    var precioCelda = document.getElementById('precio-' + i);
    if (precioCelda && !isNaN(precioCelda.textContent)) {
      total += parseFloat(precioCelda.textContent) || 0;
    }
  }
  document.getElementById('valorTotal').textContent = total.toFixed(2);
}


// Función para mostrar los datos almacenados
function mostrarDatosCliente() {
  //Verificar si hay datos almacenados en localStorage
  if (localStorage.getItem("datosUsuario")) {
    let datos = JSON.parse(localStorage.getItem("datosUsuario"));
    let datosHTML = `<p>Tipo Documento: ${datos.tipoID}</p>
                      <p>Dni: ${datos.id}</p>
                      <p>Nombre: ${datos.nombre}</p>
                     <p>Email: ${datos.email}</p>`;
    document.getElementById("datosUsuario").innerHTML = datosHTML;
  }
}





function mostrarDatosPedido() {
  if (localStorage.getItem("datosUsuario")) {
   
    let tabla1 = document.getElementById('miTabla').getElementsByTagName('tbody')[0];
    let filas = tabla1.getElementsByTagName('tr');
    let divDatos = document.getElementById("datosCompra");
    divDatos.innerHTML = "";
    // Crear tabla
    let tabla = document.createElement("table");
    let nuevaTabla = tabla.createTHead();


    //insertamos las celdas de los encabezados
    let encabezado = nuevaTabla.insertRow(0);
    let celdaEncabezado1 = encabezado.insertCell(0);
    let celdaEncabezado2 = encabezado.insertCell(1);
    let celdaEncabezado3 = encabezado.insertCell(2);
    
    celdaEncabezado5.innerHTML = "Producto";
    celdaEncabezado6.innerHTML = "Cantidad";
    celdaEncabezado7.innerHTML = "Valor";

    var cuerpoTabla = tabla.createTBody();

    // Iterar sobre cada fila y celda para obtener los datos de la tabla editable usando los id
    for (var i = 0; i < filas.length; i++) {
      var celdas = filas[i].getElementsByTagName('td');
      var nuevaFila = cuerpoTabla.insertRow();
      
      for (var j = 0; j < celdas.length; j++) {
        var celda = document.getElementById('celda-' + i + '-' + j);
        nuevaFila.insertCell(4 + j).textContent = celda ? celda.textContent : "";
      }
    }

    console.log(nuevaFila)


    // Limpiar el contenido previo
    divDatos.appendChild(tabla);
  }
}

function limpiarTabla() {
  var tabla = document.getElementById('miTabla').getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';
  filaId = 1; // Reiniciar el contador de filas 
  agregarFila();
  // Agregar una fila inicial vacía 
  document.getElementById('valorTotal').textContent = '0';
}

// Mostrar los datos almacenados al cargar la página
window.onload = mostrarDatosCliente;
window.onload = mostrarDatosPedido;