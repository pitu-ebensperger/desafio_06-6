# Apoyo desafio Soft Jobs

# Desafío 6 - Soft Jobs
Curso Backend con Node y Express (G90) - 6 Autenticación y Autorización de usuarios con JWT



* Servidor debe permitir registro de nuevos usuario a traves de ruta POST/usuarios
* Ofrecer ruta POST/login que reciba credenciales de un usuario y devuelva un token generado con JWT. Se debe incluir el payload del token el email del usuario registrado.
* Disponibilizar ruta GET/usuarios para devolver lo datos de un usuario en caso de que este autenticado, para esto: (i) Extraiga un token disponible en la propiedad Authotization de las cabeceras. (ii) Veriqfique la validez del token usando la misma llave secreta usada en su firma. (iii) Decodifique el token para obtener el email del usuario a buscar en su payload. (uv) Obtenga y devuelva el registro del usuario.

### Requisitos

1. Registrar y obtener usuarios de la base de datos

2. Usar middlewares para:
    a. Verificar la existencia de credenciales en la ruta que corresponda
    b. Validar el token recibido en las cabeceras en la ruta que corresponda
    c. Reportar por la terminal las consultas recibidas en el servidor

3. Firmar, verificar y decodificar tokens JWT.

4. Capturar y devolver los posibles errores que ocurran en el servidor.

5. Encriptar las contraseñas al momento de registrar nuevos usuarios.


*(!) Crear .env desde .env.example para testear proyecto.*