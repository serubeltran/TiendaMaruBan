// Se usaba en la versión original. Ya no se usa.
// Ahora ProductsContext carga los productos directamente - fetch().


// Carga los productos desde la API y los guarda en el array `productos`

const productos = [];

(async () => {
  try {
    const res = await fetch("https://68f28b54b36f9750deecfadc.mockapi.io/api/maru/artesanias");
    const data = await res.json();

    data.forEach((item) => {
      productos.push({
        id: item.id,
        titulo: item.producto,
        precio: item.precio,
        imagen: item.imagen,
        descripcion: item.descripcion,
      });
    });

    window.dispatchEvent(new Event("productosCargados"));
  } catch (error) {
    console.error("Error al obtener productos desde la API:", error);
  }
})();

export default productos;
