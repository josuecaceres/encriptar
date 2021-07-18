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
    $cargo = $_POST['cargo'];
  
    $model=new CRUD;
    $model->tablaN = "`usuarios`";
    $model->Columns = "`nombre`, `correo`, `password`, `cargo`";
    $model->Values = "'".sha1($nombre)."','".sha1($correo)."','".sha1($contraseña)."','".sha1($cargo)."'";
    $model->Crear();
    $mensaje=$model->mensaje;
  
    echo json_encode($mensaje);
  }

  function leerUser(){
    $model=new CRUD;
    $model->Columns = '*';
    $model->tablaN = "`usuarios`";
    $model->condition= "";
    $model->Leer();
    $filas=$model->rows;
    
    echo json_encode($filas);
  }

  function editUser(){
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];
    $cargo = $_POST['cargo'];

    $id = $_POST['id'];

    $model=new CRUD;
    $model->update =  "`usuarios`";
    $model->set= "`nombre`='".$nombre."', `correo`='".$correo."', `password`='".$contraseña."', `cargo`='".$cargo."'";
    $model->condicion = "`id`="."'".$id."'";
    $model->Actualizar();
    $mensaje=$model->mensaje;

    echo json_encode($mensaje);
  }

  function borrarUser(){
    $id = $_POST['id'];

    $model=new CRUD;
    $model->deleteFrom = "`usuarios`";
    $model->condicion = "`id`="."'".$id."'";
    $model->Borrar();
    $mensaje=$model->mensaje;
  
    echo json_encode($mensaje);
  }
?>