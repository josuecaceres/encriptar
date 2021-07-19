//Al cargar la pagina------------------------------------------------------------------------------
window.addEventListener('load', function () {
  getUsers()
})

var formRegistro = document.getElementById('formRegistro')
var usuarios
var indiceTemporal

//Guardado de la info-------------------------------------------------------------------------------
formRegistro.addEventListener('submit', Event => {
  Event.preventDefault()
  var user = new FormData()
  user.append('metodo', 'agregar')
  user.append('nombre', encriptar(document.getElementById('inputNombre').value))
  user.append('correo', encriptar(document.getElementById('inputCorreo').value))
  user.append('contraseña', encriptar(document.getElementById('inputContraseña').value))
  user.append('cargo', encriptar(document.getElementById('inputCargo').value))

  fetch("php/usuarios.php", {
      method: 'POST',
      body: user
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      formRegistro.reset()
      getUsers()
    })
})

//obtener usuarios para rellenar la tabla
function getUsers() {
  var data = new FormData()
  data.append('metodo', 'leer')

  fetch("php/usuarios.php", {
    method: "POST",
    body: data,
  }).then(res => {
    if (res.ok) {
      res.json().then(data => {
        usuarios = data
        if (usuarios) {
          document.getElementById('body').innerHTML = ''
          usuarios.forEach((element, index) => {
            document.getElementById('body').innerHTML += `
                <tr>
                  <td scope="row">${element.id}</td>
                  <td>${element.nombre}</td>
                  <td>${element.password}</td>
                  <td>${element.correo}</td>
                  <td>${element.cargo}</td>
                  <td>
                    <button type="button" class="btn btn-sm bg-success" onclick="edit(${index})">
                      <span class="material-icons">
                        edit
                      </span>
                    </button>
                    <button type="button" class="btn btn-sm bg-danger" onclick="del(${element.id})">
                      <span class="material-icons">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              `
          })
        } else {
          document.getElementById('body').innerHTML = 'No hay nada'
        }
      })
    } else {
      alert('Algo salio mal')
    }
  })
}

//editar
function edit(index) {
  console.log(usuarios[index])
  document.getElementById('inputNombre').value = desEncriptar(usuarios[index].nombre)
  document.getElementById('inputCorreo').value = desEncriptar(usuarios[index].correo)
  document.getElementById('inputContraseña').value = desEncriptar(usuarios[index].password)
  document.getElementById('inputCargo').value = desEncriptar(usuarios[index].cargo)

  indiceTemporal = index
  document.getElementById('btnRegistrar').style.display = 'none'
  document.getElementById('btnActualizar').style.display = 'inline'
}

document.getElementById('btnActualizar').addEventListener('click', () => {
  var data = new FormData()
  data.append('metodo', 'editar')
  data.append('id', usuarios[indiceTemporal].id)
  
  data.append('nombre', encriptar(document.getElementById('inputNombre').value))
  data.append('correo', encriptar(document.getElementById('inputCorreo').value))
  data.append('contraseña', encriptar(document.getElementById('inputContraseña').value))
  data.append('cargo', encriptar(document.getElementById('inputCargo').value))

  fetch("php/usuarios.php", {
      method: "POST",
      body: data,
    }).then(res => res.json())
    .then(data => {
      formRegistro.reset()
      console.log(data)
      document.getElementById('btnRegistrar').style.display = 'inline'
      document.getElementById('btnActualizar').style.display = 'none'
      getUsers()
    })
})

//eliminar
function del(id) {
  console.log(id)
  var data = new FormData()
  data.append('metodo', 'borrar')
  data.append('id', id)

  fetch("php/usuarios.php", {
      method: "POST",
      body: data,
    }).then(res => res.json())
    .then(data => {
      formRegistro.reset()
      console.log(data)
      getUsers()
    })
}

//Reset de formulario y cancelacion de editar
document.getElementById('btnReset').addEventListener('click', () => {
  formRegistro.reset()
  document.getElementById('btnRegistrar').style.display = 'inline'
  document.getElementById('btnActualizar').style.display = 'none'
})

//Funciones para encriptar y desencriptar
function encriptar(cadena){
  let cadenaDividida = cadena.split("")
  let cadenaEncriptada = ''
  cadenaDividida.forEach(letra => {
    switch(letra.toLowerCase()){
      case "m": letra = "0"; break;
      case "u": letra = "1"; break;
      case "r": letra = "2"; break;
      case "c": letra = "3"; break;
      case "i": letra = "4"; break;
      case "e": letra = "5"; break;
      case "l": letra = "6"; break;
      case "a": letra = "7"; break;
      case "g": letra = "8"; break;
      case "o": letra = "9"; break;

      case "0": letra = "m"; break;
      case "1": letra = "u"; break;
      case "2": letra = "r"; break;
      case "3": letra = "c"; break;
      case "4": letra = "i"; break;
      case "5": letra = "e"; break;
      case "6": letra = "l"; break;
      case "7": letra = "a"; break;
      case "8": letra = "g"; break;
      case "9": letra = "o"; break;

      case " ": letra = "*"; break;
    }
    cadenaEncriptada += letra
  })
  
  return cadenaEncriptada
}

function desEncriptar(cadena){
  let cadenaDividida = cadena.split("")
  let cadenaDesEncriptada = ''
  cadenaDividida.forEach(letra => {
    switch(letra.toLowerCase()){
      case "m": letra = "0"; break;
      case "u": letra = "1"; break;
      case "r": letra = "2"; break;
      case "c": letra = "3"; break;
      case "i": letra = "4"; break;
      case "e": letra = "5"; break;
      case "l": letra = "6"; break;
      case "a": letra = "7"; break;
      case "g": letra = "8"; break;
      case "o": letra = "9"; break;

      case "0": letra = "m"; break;
      case "1": letra = "u"; break;
      case "2": letra = "r"; break;
      case "3": letra = "c"; break;
      case "4": letra = "i"; break;
      case "5": letra = "e"; break;
      case "6": letra = "l"; break;
      case "7": letra = "a"; break;
      case "8": letra = "g"; break;
      case "9": letra = "o"; break;

      case " ": letra = "*"; break;
    }
    cadenaDesEncriptada += letra
  })
  
  return cadenaDesEncriptada
}
