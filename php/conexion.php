<?php
	class conexion{
		public function conectar(){
			$usuario='root';
			$password='';
			$host='localhost';
			$db='ejemplo';

			return $conexion = new PDO("mysql:host=$host;dbname=$db",$usuario, $password);
		}
		
	}
?>