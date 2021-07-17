<?php
  require "conexion.php";
  require "CRUD.php";

  $method = $_POST['metodo']; //define el método a usar
  switch ($method){
    case 'agregar':
      crearUser();
      break;
    case 'leer':
      leerUser();
      break;
    case 'editar':
      editUser();
      break;
    case 'borrar':
      borrarUser();
      break;
  }
  

  function crearUser(){
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];
    $tipo = $_POST['tipo'];
  
    $model=new CRUD;
    $model->tablaN = "`users`";
    $model->Columns = "`nombre`, `correo`, `contraseña`, `tipo`";
    $model->Values = "'".$nombre."','".$correo."','".$contraseña."','".$tipo."'";
    $model->Crear();
    $mensaje=$model->mensaje;
  
    echo json_encode($mensaje);
  }

  function leerUser(){
    $model=new CRUD;
    $model->Columns = '*';
    $model->tablaN = "`users`";
    $model->condition= "";
    $model->Leer();
    $filas=$model->rows;
    
    echo json_encode($filas);
  }

  function editUser(){
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];
    $tipo = $_POST['tipo'];

    $id = $_POST['id'];

    $model=new CRUD;
    $model->update =  "`users`";
    $model->set= "`nombre`='".$nombre."', `correo`='".$correo."', `contraseña`='".$contraseña."', `tipo`='".$tipo."'";
    $model->condicion = "`id`="."'".$id."'";
    $model->Actualizar();
    $mensaje=$model->mensaje;

    echo json_encode($mensaje);
  }

  function borrarUser(){
    $id = $_POST['id'];

    $model=new CRUD;
    $model->deleteFrom = "`users`";
    $model->condicion = "`id`="."'".$id."'";
    $model->Borrar();
    $mensaje=$model->mensaje;
  
    echo json_encode($mensaje);
  }
?>