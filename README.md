# Informe de la Aplicación de Gestión de Proyectos

## 1. Introducción

La presente aplicación corresponde a un sistema web de **gestión de proyectos**, desarrollado con el objetivo de facilitar la creación, edición, visualización y administración de proyectos dentro de un entorno autenticado. La aplicación permite manejar información clave como nombre del proyecto, descripción, fecha límite, estado, prioridad e imagen asociada, integrando tecnologías modernas de backend y frontend bajo una arquitectura MVC y SPA.

El sistema ha sido implementado utilizando **Laravel** como framework backend y **React con Inertia.js** para el frontend, ofreciendo una experiencia de usuario fluida sin recargas completas de página. Para el almacenamiento de datos se utiliza **MongoDB**, una base de datos NoSQL orientada a documentos.

---

## 2. Objetivos

### 2.1. Objetivo general

Desarrollar una aplicación web funcional para la gestión de proyectos y tareas, que permita a los usuarios autenticados administrar información de forma eficiente, segura y estructurada.

### 2.2. Objetivos específicos

- Implementar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para proyectos y tareas.
- Diseñar una arquitectura clara basada en el patrón MVC.
- Integrar un frontend reactivo utilizando React e Inertia.js.
- Gestionar la asignación de tareas a usuarios.
- Manejar el almacenamiento de imágenes asociadas a tareas o proyectos.
- Utilizar una base de datos NoSQL para una gestión flexible de la información.

---

## 3. Desarrollo del Proyecto

### 3.1. Herramientas utilizadas

- **Laravel**: Framework backend en PHP.
- **React**: Biblioteca JavaScript para la interfaz de usuario.
- **Inertia.js**: Conector entre Laravel y React.
- **MongoDB**: Sistema gestor de base de datos NoSQL orientado a documentos.
- **Vite**: Herramienta de compilación y desarrollo frontend.
- **Tailwind CSS**: Framework de estilos.
- **Git y GitHub**: Control de versiones.

#### 3.1.1. Interacción entre las Herramientas

Laravel se encarga de la lógica de negocio, manejo de rutas, controladores y validaciones. Inertia.js permite que Laravel envíe datos directamente a componentes React sin necesidad de una API REST tradicional. React gestiona la interfaz de usuario, mientras que MongoDB almacena la información en documentos JSON flexibles, lo que facilita la evolución del modelo de datos.

---

### 3.2. Estructura del Proyecto

#### 3.2.1. app/Models

Contiene los modelos del sistema como `User`, `Project` y `Task`, adaptados para trabajar con MongoDB mediante un driver compatible con Laravel. Estos modelos representan colecciones en la base de datos.

#### 3.2.2. app/Http/Controllers

Incluye controladores como `ProjectController`, `TaskController` y `UserController`, responsables de manejar las peticiones HTTP, validaciones y comunicación entre modelos y vistas.

#### 3.2.3. app/Http/Middleware

Gestiona la autenticación y protección de rutas, asegurando que solo usuarios autenticados y verificados accedan a determinadas funcionalidades.

#### 3.2.4. resources/views

Se utiliza principalmente para la vista base de Inertia. La mayor parte de la interfaz se desarrolla en React dentro del directorio `resources/js`.

#### 3.2.5. resources/js

- `Pages/Projects`: Componentes React para listar, crear y editar proyectos.
- `Pages/Tasks`: Componentes React para la gestión de tareas.
- `Layouts`: Layouts reutilizables como `AuthenticatedLayout`.

#### 3.2.6. routes/web.php

Define las rutas web del sistema, incluyendo rutas protegidas para la gestión de proyectos, tareas y usuarios.

---

### 3.3. Base de Datos del Sistema

#### 3.3.1. Sistema Gestor de Base de Datos

La aplicación utiliza **MongoDB** como sistema gestor de base de datos, aprovechando su modelo NoSQL orientado a documentos para una mayor flexibilidad y escalabilidad.

#### 3.3.2. Estructura General

La base de datos se organiza en **colecciones**, entre las cuales destacan:

- `users`
- `projects`
- `tasks`

Cada documento se almacena en formato BSON (similar a JSON).

#### 3.3.3. Descripción de las Colecciones

- **users**: Almacena la información de los usuarios del sistema (nombre, email, credenciales, etc.).
- **projects**: Contiene los datos de los proyectos, como nombre, descripción, estado y fechas.
- **tasks**: Almacena las tareas asociadas a los proyectos, incluyendo prioridad, estado, fecha límite y usuario asignado.

#### 3.3.4. Relaciones entre Colecciones

MongoDB no utiliza claves foráneas tradicionales. Las relaciones se manejan mediante **referencias por ID**, por ejemplo:

- Un proyecto puede tener múltiples tareas asociadas.
- Cada tarea referencia un proyecto y un usuario asignado mediante su identificador.
- Un usuario puede tener múltiples tareas asignadas.

#### 3.3.5. Modelo de Datos

El uso de MongoDB permite un modelo de datos flexible, evitando esquemas rígidos y facilitando futuras extensiones del sistema sin afectar datos existentes.

---

### 3.4. Diseño (Figma)

El diseño de la aplicación fue previamente modelado en Figma para definir la experiencia de usuario.

#### 3.4.1. Vista Catálogo

Muestra la lista de proyectos registrados.

#### 3.4.2. Vista Log in

Permite a los usuarios autenticarse en el sistema.

#### 3.4.3. Vista Sign up

Interfaz para el registro de nuevos usuarios.

#### 3.4.4. Vista Gestión de Proyectos

Permite crear, editar y eliminar proyectos.

#### 3.4.5. Vista Gestión de Tareas

Formulario para registrar, editar y asignar tareas a usuarios dentro de un proyecto.

---

### 3.5. Resultados de la Aplicación

La aplicación permite gestionar proyectos y tareas de manera eficiente, con una interfaz intuitiva, validaciones adecuadas y persistencia segura de datos en MongoDB. Se logró una integración correcta entre backend y frontend.

---

### 3.6. Codificación de la Aplicación

El código sigue buenas prácticas de desarrollo, separación de responsabilidades y uso de componentes reutilizables tanto en Laravel como en React, manteniendo una arquitectura clara y escalable.

---

## 4. Conclusiones

La aplicación desarrollada cumple con los objetivos planteados, proporcionando una solución moderna y flexible para la gestión de proyectos. El uso de **MongoDB** junto con **Laravel**, **React** e **Inertia.js** permitió construir una aplicación escalable, adaptable a cambios futuros y fácil de mantener.

