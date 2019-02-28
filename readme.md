# QVEY TECHNICAL TEST | TIME TRAKING 

The idea is to develop an API that allows to time tracking (similar to Toggl.com). Assuming you are building the backend for a time tracking application, Design and build an API that can serve all use-cases mentioned below. You don’t need to build the UI for this application, just build the backend APIs for all the functionality UI would need. If there is some functionality that would be better implemented on UI side, add a note in your response why it should be part of UI and not backend.

## Introducción

- Las siguientes instrucciones le permitirán obtener una copia del proyecto en funcionamiento en su máquina local para fines de prueba. 
- La api tambien esta implementada en heroku. Siguiendo la documentación, encuentrará la url de la aplicación con su flujo de trabajo para la prueba.

### Prerequisitos

- Tener previamente instalado [nodejs](https://nodejs.org/es/) con npm.

### Instalación

Siga el siguiente paso a paso para la instalación de la aplicación:

1. Clonar el repositorio en su directorio de preferencia.
2. Ir a la raíz del directorio de la aplicación y ejecutar `npm install` para descargar todas las dependencias.
3. Ejecutar `npm start` para ejecutar la aplicación.
4. :shipit:

## Documentación de la API

En la siguiente url econtrará toda la documentación de la API:

- https://documenter.getpostman.com/view/1636651/S11GTLqn.

## Correr los test

Siga el siguiente paso a paso para correr los test:

1. Instalar globalemnte [mocha](https://www.npmjs.com/package/mocha) con el siguinte comando `npm i mocha -g`.
2. Configurar los archivos que estan en el directorio `/test` para luego hacer los respectivos tests. (**Ojo con los Id's** :feelsgood:). 
3. Despues de haber configurado los archivos, ir al directorio `/test` desde la terminal y ejecutar `mocha {archivo con el cual va a realizar el test}`. 
4. :+1:

## Heroku

El la siguiente url se encuentra delsplegada la aplicación en heroku:

- https://time-traking.herokuapp.com/.

## Flujo de trabajo y condiciones

Para probar la API recomiendo el siguiente flujo de trabajo, bajo las siguientes condiciones:

1. Solo el 'ADMIN_ROLE' puede:
    - Usuarios => get, create, update, delete.
    - Proyectos => get, create, update, delete.
    - Task => get, create, update, delete.

2. Solo el 'USER_ROLE' puede: 
 - Usuarios =>  get.
 - Proyectos => get.
 - Task => get, create, update, delete.

### Recomendaciones

Para un buen flujo de trabajo recomiendo:

- Crear usuario => Login => Crear proyecto => Crear tarea => Iniciar tarea => Pausar Tarea...

# Autor

- Nestor Estrada 

# Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo LICENSE.md para más detalles :trollface:.




