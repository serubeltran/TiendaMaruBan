// Función para formatear precios al formato monetario argentino
export function formatPrecioAR(valor) {
  return '$' + Number(valor).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
