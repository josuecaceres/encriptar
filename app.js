//Al cargar la pagina------------------------------------------------------------------------------
window.addEventListener('load', function() {
    fetch("php/obtener_tipo.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if(res.ok){
        res.json().then(data => {
          document.getElementById('inputTipo').innerHTML = ''
          for (const valor of data) {
            document.getElementById('inputTipo').innerHTML += `
              <option value="${valor.id}">${valor.tipo}</option>
            `
          }
        })
      }else{
        alert('Algo salio mal')
      }
    })
  
    getUsers()
  })
  
  var formRegistro = document.getElementById('formRegistro')
  var usuarios
  var indiceTemporal
  
  //Guardado de la info-------------------------------------------------------------------------------
  formRegistro.addEventListener('submit', Event => {
    Event.preventDefault()
    var user = new FormData(formRegistro)
    user.append('metodo','agregar')
    
    fetch("php/usuarios.php", {
      method: 'POST',
      body: user
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        getUsers()
      })
  })
  
  //obtener usuarios para rellenar la tabla
  function getUsers(){
    var data = new FormData()
    data.append('metodo','leer')
  
    fetch("php/usuarios.php", {
      method: "POST",
      body: data,
    }).then(res => {
      if(res.ok){
        res.json().then(data => {
          usuarios = data
          if(usuarios){
            document.getElementById('body').innerHTML = ''
            usuarios.forEach((element, index) => {
              document.getElementById('body').innerHTML += `
                <tr>
                  <td scope="row">${element.id}</td>
                  <td>${element.nombre}</td>
                  <td>${element.correo}</td>
                  <td>${element.tipo}</td>
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
          }else{
            document.getElementById('body').innerHTML = 'No hay nada'
          }
        })
      }else{
        alert('Algo salio mal')
      }
    })
  }
  
  //editar
  function edit(index){
    console.log(usuarios[index])
    document.getElementById('inputNombre').value = usuarios[index].nombre
    document.getElementById('inputCorreo').value = usuarios[index].correo
    document.getElementById('inputContraseña').value = usuarios[index].contraseña
    document.getElementById('inputTipo').value = usuarios[index].tipo
  
    indiceTemporal = index
    document.getElementById('btnRegistrar').style.display = 'none'
    document.getElementById('btnActualizar').style.display = 'inline'
  }
  
  document.getElementById('btnActualizar').addEventListener('click', ()=>{
    var data = new FormData(formRegistro)
    data.append('metodo','editar')
    data.append('id', usuarios[indiceTemporal].id)
  
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
  function del(id){
    console.log(id)
    var data = new FormData()
    data.append('metodo','borrar')
    data.append('id',id)
  
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
  document.getElementById('btnReset').addEventListener('click', ()=>{
    formRegistro.reset()
    document.getElementById('btnRegistrar').style.display = 'inline'
    document.getElementById('btnActualizar').style.display = 'none'
  })