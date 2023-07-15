const express = require("express");
const { connectToDB, disconnectFromMongoDB } = require("./src/mongodb");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware para establecer el encabezado Content-Type en las respuestas
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

// Ruta de inicio
app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API de Computación");
});

// Ruta para obtener todos los productos
app.get("/computacion", async (req, res) => {
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de computacion y convertir los documentos a un array
    const db = client.db("Computacion");
    const productos = await db.collection("Computacion").find().toArray();
    res.json(productos);
  } catch (error) {
    // Manejo de errores al obtener los productos
    res.status(500).send("Error al obtener los productos de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Ruta para obtener un producto por su ID
app.get("/computacion/:id", async (req, res) => {
  const productoId = parseInt(req.params.id);
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de computacion y buscar el producto por su ID
    const db = client.db("computacion");
    const producto = await db.collection("computacion").findOne({ id: productoId });
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).send("producto no encontrado");
    }
  } catch (error) {
    // Manejo de errores al obtener el producto
    res.status(500).send("Error al obtener el producto de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Ruta para obtener producto por su nombre
app.get("/computacion/nombre/:nombre", async (req, res) => {
  const productoQuery = req.params.nombre;
  let productoNombre = RegExp(productoQuery, "i");
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de computacion y buscar el prodcuto por su Nombre
    const db = client.db("computacion");
    const producto = await db
      .collection("computacion")
      .find({ nombre: productoNombre })
      .toArray();
   
     
    if (nombre.length > 0) {
      res.json(nombre);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    // Manejo de errores al obtener el producto
    res.status(500).send("Error al obtener el producto de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Ruta para obtener un producto por su importe
app.get("/computacion/precio/:precio", async (req, res) => {
  const productoPrecio = parseInt(req.params.precio);
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de computacion y buscar el producto por su precio
    const db = client.db("computacion");
    const producto = await db
      .collection("computacion")
      .find({ importe: { $gte: productoPrecio } })
      .toArray();

    if (producto.length > 0) {
      res.json(producto);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    // Manejo de errores al obtener el producto
    res.status(500).send("Error al obtener el producto de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Ruta para agregar un nuevo producto
app.post("/computacion", async (req, res) => {
  const nuevoProducto = req.body;
  try {
    if (nuevoProducto === undefined) {
      res.status(400).send("Error en el formato de datos a crear.");
    }

    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
    }

    const db = client.db("computacion");
    const collection = db.collection("computacion");
    await collection.insertOne(nuevoProducto);
    console.log("Nuevo Producto creado");
    res.status(201).send(nuevoProducto);
  } catch (error) {
    // Manejo de errores al agregar el producto
    res.status(500).send("Error al intentar agregar un nuevo producto");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

//Ruta para modificar un producto
app.put("/computacion/:id", async (req, res) => {
  const idProducto = parseInt(req.params.id);
  const nuevosDatos = req.body;
  try {
    if (!nuevosDatos) {
      res.status(400).send("Error en el formato de datos a crear.");
    }

    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
    }

    const db = client.db("computacion");
    const collection = db.collection("computacion");

    await collection.updateOne({ id: idProducto }, { $set: nuevosDatos });

    console.log("Producto Modificado");

    res.status(200).send(nuevosDatos);
  } catch (error) {
    // Manejo de errores al modificar el producto
    res.status(500).send("Error al modificar el producto");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

//Ruta para modificar un campo en un producto
app.patch("/computacion/:id", async (req, res) => {
  const idProducto = parseInt(req.params.id);
  const nuevosDatos = req.body;
  try {
    if (!nuevosDatos) {
      res.status(400).send("Error en el formato de datos a crear.");
    }

    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
    }

    const db = client.db("computacion");
    const collection = db.collection("computacion");

    await collection.updateOne({ id: idProductos }, { $set: nuevosDatos });

    console.log("Producto Modificado");

    res.status(200).send(nuevosDatos);
  } catch (error) {
    // Manejo de errores al modificar la fruta
    res.status(500).send("Error al modificar el producto");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});


// Ruta para eliminar un producto
app.delete("/computacion/:id", async (req, res) => {
  const idProducto = parseInt(req.params.id);
  try {
    if (!idProducto) {
      res.status(400).send("Error en el formato de datos a crear.");
      return;
    }

    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de computacion, buscar el producto por su ID y eliminarlo
    const db = client.db("computacion");
    const collection = db.collection("computacion");
    const resultado = await collection.deleteOne({ id: idComputacion });
    if (resultado.deletedCount === 0) {
      res
        .status(404)
        .send("No se encontró ningun Producto con el id seleccionado.");
    } else {
      console.log("Producto Eliminado");
      res.status(204).send();
    }
  } catch (error) {
    // Manejo de errores al obtener los productos
    res.status(500).send("Error al eliminar el producto");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Ruta para manejar las solicitudes a rutas no existentes
app.get("*", (req, res) => {
    res.status(404).send("Lo sentimos, la página que buscas no existe.");
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
