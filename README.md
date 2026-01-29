# Informe de la Aplicación de Gestión de Proyectos

## 1. Introducción

La presente aplicación corresponde a un sistema web de **gestión de proyectos**, desarrollado con el objetivo de facilitar la creación, edición, visualización y administración de proyectos dentro de un entorno autenticado. La aplicación permite manejar información clave como nombre del proyecto, descripción, fecha límite, estado e imagen asociada, integrando tecnologías modernas de backend y frontend bajo una arquitectura MVC y SPA.

El sistema ha sido implementado utilizando **Laravel** como framework backend y **React con Inertia.js** para el frontend, garantizando una experiencia de usuario fluida sin recargas completas de página.

---

## 2. Objetivos

### 2.1. Objetivo general

Desarrollar una aplicación web funcional para la gestión de proyectos, que permita a los usuarios autenticados administrar información de proyectos de forma eficiente, segura y estructurada.

### 2.2. Objetivos específicos

* Implementar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para proyectos.
* Diseñar una arquitectura clara basada en el patrón MVC.
* Integrar un frontend reactivo utilizando React e Inertia.js.
* Gestionar el almacenamiento de imágenes asociadas a los proyectos.
* Garantizar la integridad y normalización de la base de datos.

---

## 3. Desarrollo del Proyecto

### 3.1. Herramientas utilizadas

* **Laravel**: Framework backend en PHP.
* **React**: Biblioteca JavaScript para la interfaz de usuario.
* **Inertia.js**: Conector entre Laravel y React.
* **MySQL**: Sistema gestor de base de datos.
* **Vite**: Herramienta de compilación y desarrollo frontend.
* **Tailwind CSS**: Framework de estilos.
* **Git y GitHub**: Control de versiones.

#### 3.1.1. Interacción entre las Herramientas

Laravel se encarga de la lógica de negocio, manejo de rutas, controladores y acceso a datos. Inertia.js permite que Laravel entregue datos directamente a componentes React, eliminando la necesidad de una API REST tradicional. React gestiona la vista, mientras que MySQL almacena la información persistente.

---

### 3.2. Estructura del proyecto

#### 3.2.1. app/Models

Contiene los modelos Eloquent, como `Project` y `User`, que representan las tablas de la base de datos y definen las relaciones entre ellas.

#### 3.2.2. app/Http/Controllers

Incluye controladores como `ProjectController`, responsables de manejar las peticiones HTTP, validaciones y comunicación entre modelos y vistas.

#### 3.2.3. app/Http/Middleware

Gestiona la autenticación y protección de rutas, asegurando que solo usuarios autorizados accedan a determinadas funcionalidades.

#### 3.2.4. resources/views

En este proyecto se utiliza principalmente para la vista base de Inertia. La mayor parte de la interfaz se encuentra en `resources/js`.

#### 3.2.5. routes/web.php

Define las rutas web del sistema, incluyendo rutas protegidas para la gestión de proyectos.

#### 3.2.6. database/migrations

Contiene las migraciones que definen la estructura de la base de datos, como la tabla `projects`.

#### 3.2.7. database/seeders

Permite poblar la base de datos con datos de prueba para usuarios y proyectos.

#### 3.2.8. Otros

* `resources/js/Pages/Projects`: Componentes React para listar, crear y editar proyectos.
* `resources/js/Layouts`: Layouts reutilizables como `AuthenticatedLayout`.

---

### 3.3. Base de datos del sistema

#### 3.3.1. Sistema Gestor de Base de Datos

Se utiliza **MySQL** como SGBD, por su estabilidad y compatibilidad con Laravel.

#### 3.3.2. Estructura General

La base de datos cuenta con tablas principales como `users` y `projects`.

#### 3.3.3. Descripción de las Tablas

* **users**: Almacena la información de los usuarios del sistema.
* **projects**: Almacena los datos de los proyectos, incluyendo referencias al usuario creador y actualizador.

#### 3.3.4. Relaciones entre las Tablas

* Un usuario puede crear muchos proyectos.
* Cada proyecto pertenece a un usuario creador y a un usuario actualizador.

#### 3.3.5. Normalización de la Base de Datos

La base de datos se encuentra normalizada hasta la **Tercera Forma Normal (3FN)**, evitando redundancia de datos y asegurando integridad referencial.

#### 3.3.6. Diagrama entidad - relación

El diagrama ER muestra la relación uno a muchos entre `users` y `projects`, utilizando claves foráneas.

---

### 3.4. Figma

El diseño de la aplicación fue previamente modelado en Figma para definir la experiencia de usuario.

#### 3.4.1. Vista catálogo

Muestra la lista de proyectos registrados.

#### 3.4.2. Vista Log in

Permite a los usuarios autenticarse en el sistema.

#### 3.4.3. Vista Sign in

Interfaz para el registro de nuevos usuarios.

#### 3.4.4. Vista Gestión de Proyectos (Administrador)

Permite crear, editar y eliminar proyectos.

#### 3.4.5. Vista de registrar nuevo proyecto

Formulario para el registro de nuevos proyectos.

#### 3.4.6. Vista de editar proyecto

Formulario para la actualización de la información del proyecto.

---

### 3.5. Resultados de la App

La aplicación permite gestionar proyectos de manera eficiente, con una interfaz intuitiva, validaciones adecuadas y persistencia segura de datos. Se logró una correcta integración entre backend y frontend.

---

### 3.6. Codificación de la App

El código sigue buenas prácticas de desarrollo, separación de responsabilidades y uso de componentes reutilizables tanto en Laravel como en React.

---

## 4. Conclusiones

La aplicación desarrollada cumple con los objetivos planteados, proporcionando una solución robusta para la gestión de proyectos. El uso de Laravel junto con React e Inertia.js permitió construir una aplicación moderna, escalable y fácil de mantener.
