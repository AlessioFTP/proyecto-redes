import servidorHTTP from "./servidor.js"; 

const PORT = 3000;

servidorHTTP.listen(PORT, "0.0.0.0" ,() => {
  console.log("Servidor corriendo en el puerto:", PORT);
});