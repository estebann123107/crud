# 🚀 Sistema de Gestión CRUD

Una aplicación web interactiva diseñada para realizar operaciones **CRUD** (*Create, Read, Update, Delete*) de manera eficiente, sencilla e intuitiva. Este proyecto implementa una interfaz moderna y adaptativa (responsive) para gestionar registros en tiempo real.

---

## Integrantes del proyecto
Esteban Meléndez
Santiago Torregroza
Sebastian Torregroza
Gisell Falcon

---

## 📌 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Funcionalidades de la Aplicación](#-funcionalidades-de-la-aplicación)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso y Despliegue](#-uso-y-despliegue)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## IConfiguración
Instalar dependencias: npm install
Iniciar proyecto: npm start
# o si usas Vite:
npm run juju
Despliegue: npm run build

---
## ✨ Características Principales

- 📱 **Diseño Responsive:** Compatible con dispositivos móviles, tablets y ordenadores.
- ⚡ **Interfaz Reactiva:** Actualización inmediata de la interfaz tras cualquier modificación o registro.
- 🔍 **Búsqueda y Filtrado:** Localización rápida de elementos dentro de la lista de registros.
- 🎨 **Experiencia de Usuario (UX/UI) Limpia:** Estilos modernos e intuitivos con retroalimentación visual al usuario (modales de confirmación, validaciones de formularios).
- 💾 **Persistencia de Datos:** Integración con almacenamiento local (LocalStorage) o API Backend para mantener los datos guardados.

---

## 🛠️ Funcionalidades de la Aplicación

### 1. ➕ Crear Registros (Create)
- Formulario con validaciones en tiempo real para evitar campos vacíos o formatos incorrectos.
- Botón de guardado con alertas de éxito al añadir un nuevo elemento.

### 2. 👁️ Consultar y Listar Registros (Read)
- Vista general organizada en formato de tabla o tarjetas explicativas.
- Paginación o desplazamiento fluido si la lista de elementos es muy extensa.
- Vista detallada individual para examinar la información completa de cada registro.

### 3. ✏️ Actualizar / Editar Registros (Update)
- Modal o vista de edición precargada con la información actual del elemento seleccionado.
- Opción para guardar cambios o cancelar la modificación sin alterar los datos originales.

### 4. 🗑️ Eliminar Registros (Delete)
- Eliminación individual de registros mediante un botón de acción rápida.
- Diálogo de confirmación previo a la eliminación para evitar pérdidas accidentales de datos.

---

## 💻 Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+) / React / Vue *(Ajustar según la tecnología exacta usada)*
- **Estilos:** Tailwind CSS / Bootstrap / CSS Modules *(Ajustar según corresponda)*
- **Control de Versiones:** Git & GitHub

---

## 📂 Estructura del Proyecto

```text
crud/
├── src/
│   ├── components/     # Componentes reutilizables (Formulario, Tabla, Modales)
│   ├── styles/         # Archivos CSS / SASS
│   ├── utils/          # Funciones auxiliares y manejo de estado local
│   └── App.js          # Componente principal
├── public/             # Archivos estáticos e index.html
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Dependencias y scripts del proyecto
└── README.md           # Documentación del proyecto