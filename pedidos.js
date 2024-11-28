// Función para guardar los datos del formulario en localStorage
function guardarDatos(event) {
    event.preventDefault();  // Evitar que el formulario se envíe y recargue la página

    // Obtener los valores de los campos del formulario
    let id = document.getElementById('id').value;
    let nombre = document.getElementById('name').value;

    document.getElementById('tipoDocumento').addEventListener('change',
        function () {
            var tipoSeleccionado = this.value;
            console.log('Tipo de documento seleccionado:', tipoSeleccionado);
        });

    // Crear un objeto con los datos del formulario
    let datosFormulario = {
        id: id,
        nombre: nombre
        
    };

    // Almacenar los datos en localStorage como un string JSON
    localStorage.setItem('datosUsuario', JSON.stringify(datosFormulario));

    // Mostrar los datos almacenados
    mostrarDatos();
}

// Función para mostrar los datos almacenados
function mostrarDatos() {
    // Verificar si hay datos almacenados en localStorage
    if (localStorage.getItem('datosUsuario')) {
        let datos = JSON.parse(localStorage.getItem('datosUsuario'));
        let datosHTML = `<p>Dni: ${datos.id}</p>
                         <p>Nombre: ${datos.nombre}</p>`;
        document.getElementById('datosAlmacenados').innerHTML = datosHTML;
    }
}

function agregarFila() { 
    var tabla = document.getElementById('miTabla').getElementsByTagName('tbody')[0];
    var nuevaFila = tabla.insertRow(); 
    for (var i = 0; i < 3; i++)
         { var nuevaCelda = nuevaFila.insertCell(i);
             nuevaCelda.contentEditable = "true"; }
             }
// Mostrar los datos almacenados al cargar la página
window.onload = mostrarDatos;