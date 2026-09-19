# CRUD - Gestor de tareas

Aplicación web para organizar actividades diarias con una interfaz moderna, ligera y funcional. Este proyecto permite crear tareas, editarlas, marcarlas como completadas, eliminarlas y recuperarlas desde una papelera antes de eliminarlas definitivamente.

## Descripción del proyecto

La aplicación funciona como un gestor de tareas personal, pensado para mantener el control de pendientes en un solo lugar. Su flujo principal se basa en un modelo CRUD, donde el usuario puede:

- Crear nuevas tareas.
- Editar el nombre de cada tarea en línea.
- Marcar tareas como completadas o pendientes.
- Eliminar tareas y enviarlas a la papelera.
- Restaurar elementos eliminados.
- Vaciar la papelera de forma permanente.
- Guardar la información localmente en el navegador.
- Cambiar entre modo claro y modo oscuro.

## Características principales

- Arquitectura con Next.js y React.
- Interfaz de usuario enfocada en productividad y claridad visual.
- Barras laterales para navegar entre tareas y papelera.
- Conteo dinámico de tareas activas.
- Estado vacío con mensaje amigable cuando no hay pendientes.
- Persistencia de datos usando localStorage.
- Tema oscuro/claro con preferencia guardada por el usuario.
- Diseño responsive para distintos tamaños de pantalla.
- Animación suave en la eliminación de tareas.

## Tecnologías utilizadas

- Next.js 16
- React 19
- TypeScript
- CSS Modules y CSS global
- localStorage para almacenamiento local

## Requisitos para su funcionamiento

Antes de iniciar el proyecto, asegúrate de tener instalado:

- Node.js 20 o superior
- npm o Bun

## Instalación

1. Clona el repositorio.
2. Entra a la carpeta del proyecto.
3. Instala las dependencias:

   npm install

   o si prefieres Bun:

   bun install

## Ejecución

### Modo desarrollo

npm run juju

o con Bun:

bun run juju

Luego abre tu navegador en:

http://localhost:3000

### Compilar para producción

npm run build

### Ejecutar la versión compilada

npm run start

## Configuración relevante del proyecto

El proyecto no requiere un archivo .env para funcionar en su estado actual. La configuración principal se encuentra en estos archivos:

- package.json: scripts y dependencias del proyecto.
- next.config.ts: configuración general de Next.js.
- tsconfig.json: configuración de TypeScript y alias de rutas.
- src/app/globals.css: estilos visuales del sistema y tema oscuro/claro.

La aplicación usa almacenamiento local del navegador para conservar tareas y papelera sin necesidad de backend.

## Estructura general del proyecto

- src/app/components: componentes de interfaz.
- src/app/hooks: lógica reutilizable como tareas, almacenamiento y papelera.
- src/app/types: definiciones de tipos TypeScript.
- src/app/icons: iconos reutilizables.

## Integrantes del proyecto

- Esteban Meléndez
- Santiago Torregroza
- Sebastián Torregroza
- Gisell Falcón

## Nota

Este proyecto está pensado como un gestor personal de tareas con una experiencia simple, visualmente limpia y funcional en el navegador.
