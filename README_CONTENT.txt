🛍️ TiendaMaruBan - E-commerce

Una tienda en línea moderna y completamente responsive construida con React, Vite y Bootstrap. Sistema de gestión de productos con carrito de compras, autenticación de usuarios y panel administrativo.

📋 Características Principales

🛒 Para Clientes
- Visualización de productos: Galería responsiva de productos con imágenes de alta calidad
- Carrito de compras: Agregar, eliminar y modificar cantidades de productos
- Checkout: Proceso de compra simplificado
- Autenticación: Sistema de login para acceder a funcionalidades protegidas
- Detalles del producto: Página completa con información detallada de cada artículo
- Búsqueda y filtrado: Encuentra productos fácilmente

👨‍💼 Para Administradores
- Panel de Stock: Gestión completa de productos (Create, Read, Update, Delete)
- Validación en tiempo real: Formularios con validación al abandonar cada campo
- Búsqueda y paginación: Herramientas para navegar la base de datos de productos
- Gestión de precios: Control sobre precios y disponibilidad

🎨 Experiencia de Usuario
- Interfaz responsiva: Optimizada para dispositivos móviles, tablets y computadoras de escritorio
- Notificaciones toast: Mensajes informativos de las acciones realizadas
- Modal de confirmación: Para acciones destructivas como vaciar carrito o eliminar productos
- Animaciones suaves: Transiciones y efectos visuales agradables
- Diseño moderno: Interfaz limpia y profesional con Bootstrap 5

🚀 Instalación

Requisitos previos
- Node.js v16 o superior
- npm o yarn

Pasos de instalación

1. Clonar el repositorio
git clone https://github.com/serubeltran/TiendaMaruBan.git
cd trabajoparcial

2. Instalar dependencias
npm install

3. Iniciar el servidor de desarrollo
npm run dev

El proyecto se abrirá en http://localhost:5173

🏗️ Estructura del Proyecto

src/
├── api/                 # Llamadas a APIs
│   ├── productos.js     # API de productos
│   └── usuarios.js      # API de usuarios
├── components/          # Componentes reutilizables
│   ├── ProductCard.jsx          # Tarjeta de producto
│   ├── Header.jsx               # Encabezado con navegación
│   ├── Footer.jsx               # Pie de página
│   ├── CartOffcanvas.jsx        # Panel lateral del carrito
│   ├── LoginOffcanvas.jsx       # Panel de login
│   ├── ProtectedRoute.jsx       # Rutas protegidas por autenticación
│   ├── AdminRoute.jsx           # Rutas restringidas a administradores
│   ├── ErrorBoundary.jsx        # Manejo de errores
│   └── ToastPlacement.jsx       # Sistema de notificaciones
├── context/             # Contextos de React
│   ├── AuthContext.jsx          # Autenticación
│   ├── CartContext.jsx          # Carrito de compras
│   ├── ProductsContext.jsx      # Gestión de productos
│   └── ToastContext.jsx         # Sistema de toasts
├── pages/               # Páginas principales
│   ├── Home.jsx         # Página principal con galería de productos
│   ├── ProductDetail.jsx # Detalle de un producto
│   ├── Stock.jsx        # Panel de administración de productos
│   ├── Cart.jsx         # Página del carrito
│   ├── Login.jsx        # Página de login
│   └── Nosotros.jsx     # Página sobre nosotros
├── App.jsx              # Componente principal
├── main.jsx             # Punto de entrada
└── index.css            # Estilos globales

🔧 Tecnologías Utilizadas

Tecnología | Versión | Descripción
-----------|---------|-------------
React | 18.2.0 | Librería para construcción de interfaces
Vite | 5.0.0 | Herramienta de build rápida
Bootstrap | 5.3.8 | Framework de CSS para diseño responsivo
React Router | 6.14.1 | Enrutamiento de la aplicación
React Icons | 5.5.0 | Iconos de alta calidad
React Bootstrap | 2.10.10 | Componentes Bootstrap en React

📱 Responsividad

El proyecto está completamente optimizado para diferentes tamaños de pantalla:

- Pantallas muy pequeñas (< 576px): 2 columnas de productos
- Pantallas pequeñas (576px - 768px): 2 columnas de productos
- Pantallas medianas (768px - 992px): 3 columnas de productos
- Pantallas grandes (> 992px): 4 columnas de productos

Todos los componentes se adaptan automáticamente con tamaños de fuente escalables y espaciados flexibles.

🔐 Autenticación

El sistema utiliza sessionStorage para persistencia de sesión:

- Las credenciales se validan contra una lista de usuarios predefinidos
- La sesión persiste durante la sesión del navegador
- Al cerrar la sesión, el carrito se vacía automáticamente
- Rutas protegidas requieren autenticación

🗄️ API de Productos

La aplicación utiliza MockAPI para la gestión de datos:

- Endpoint: https://68f28b54b36f9750deecfadc.mockapi.io/api/maru/artesanias
- Métodos: GET (listar), POST (crear), PUT (actualizar), DELETE (eliminar)
- Integración completa con CRUD en el panel de Stock

🎯 Funcionalidades Detalladas

Página de Inicio
- Galería de productos responsiva
- Botón "Agregar" con animación de confirmación
- Clic en imagen para ver detalles del producto
- Validación de precios con 2 decimales

Carrito de Compras
- Agregar y eliminar productos
- Modificar cantidades
- Cálculo automático del total
- Modal de confirmación para vaciar carrito
- Notificaciones de acciones

Panel de Stock (Administrador)
- Crear nuevos productos
- Editar productos existentes
- Eliminar productos con confirmación
- Búsqueda y paginación de productos
- Validación en tiempo real de campos
- Precios con campo numérico y símbolo $

Sistema de Notificaciones
- Toasts centrados en la pantalla
- Colores diferentes según el tipo (éxito, error, información)
- Texto blanco para mejor legibilidad
- Auto-cierre después de 2 segundos

📦 Build y Deployment

Construir para producción
npm run build

Esto genera una carpeta dist/ optimizada para producción.

Preview de producción
npm run preview

🐛 Manejo de Errores

- ErrorBoundary: Captura errores de componentes React
- Validación de formularios: Previene datos inválidos
- Manejo de API: Gestión de errores de conexión
- Mensajes de usuario: Notificaciones claras de problemas

♻️ Gestión de Estado

- React Context API para estado global
- SessionStorage para persistencia de datos
- Hooks para lógica de componentes
- useCallback para optimización de rendimiento

📊 Características de Carrito

- Persistencia en localStorage y sessionStorage
- Límite de cantidad flexible
- Cálculo automático de subtotales y total
- Vaciado automático al cerrar sesión
- Sincronización en tiempo real

🎨 Personalización

Colores y Variables CSS
Edita /src/index.css para personalizar:
- Colores de tema
- Tamaños de fuentes
- Espaciados
- Alturas de imágenes

:root{
  --bg:#f7f7f8;
  --card:#ffffff;
  --accent:#2563eb;
  --muted:#6b7280;
  --thumb-h: 200px;
}

🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (git checkout -b feature/AmazingFeature)
3. Commit tus cambios (git commit -m 'Add some AmazingFeature')
4. Push a la rama (git push origin feature/AmazingFeature)
5. Abre un Pull Request

📝 Licencia

Este proyecto está bajo licencia MIT.

👤 Autor

Sergio Beltrán
- GitHub: https://github.com/serubeltran
- Repository: https://github.com/serubeltran/TiendaMaruBan

📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

🙏 Agradecimientos

- Bootstrap por los componentes y utilidades CSS
- React por la librería de interfaz
- MockAPI por el servicio de backend simulado
- La comunidad de React por las herramientas y mejores prácticas

---

Última actualización: 1 de Diciembre de 2025
Versión: 1.0.0