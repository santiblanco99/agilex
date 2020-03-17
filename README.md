**Agilex - Propuesta de implementación**

La propuesta de implementación redactada se basa en el siguiente stack tecnológico:

* [Firepad.io](https://firepad.io/docs/): API que proporciona el editor de texto colaborativo. En el link se encuentra la documentación básica
* [Node.js](https://nodejs.org/en/about/) Servidor back-end de la app. Para los que no saben, Node.js en términos simples es javascript para back-end. Es bastante intuitivo

* [Express](https://expressjs.com/) Librería de Node.js que permite desplegar un servidor REST con bastante facilidad. En otras palabras, Express será la estructura para el servidor

Aún no se qué tecnología utilizaremos para desplegar el servidor, pero con el tiempo miraremos :)

**Ejemplo de la aplicación**
En los commits iniciales realicé un ejemplo de firepad con la documentación de la página. Si quieres ver cómo funciona, simplemente ve al directorio de la aplicación y ejecuta el comando **node app.js** en el terminal. Después abre varias pestañas en un navegador con la url *http://localhost:3000*

Para poder empezar con el desarrollo es importante que lean la documentación de los tres componentes tecnológicos, los cuales se encuentran en los links de arriba. Firepad se me hace una buena opción porque por detrás se conecta a Firebase (base de datos de Google) y escribe el historial de cambios automáticamente. El reto de aqui en adelante es aprender a usar los métodos y funciones para que la app cumpla con los objetivos de nuestra propuesta y podamos configurarla a nuestra necesidad.

