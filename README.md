# 💬 LanChat - Sistema de Mensajería en Tiempo Real (LAN)

<div align="center">

![Estado](https://img.shields.io/badge/Estado-Terminado-success?style=for-the-badge)

**Un sistema de chat ligero, portable y diseñado para operar en redes locales sin dependencia de internet.**

</div>

---

## 📖 Descripción del Proyecto

**LanChat** es una aplicación Full Stack diseñada para facilitar la comunicación instantánea en entornos donde la conectividad a internet es limitada o inexistente. Utiliza protocolos **WebSocket** para garantizar una latencia mínima y una arquitectura orientada a eventos.

A diferencia de los chats convencionales, este sistema implementa un motor de persistencia ligero basado en **JSON Storage**, eliminando la necesidad de instalar motores de bases de datos complejos (como SQL o Mongo) para su despliegue rápido en cualquier red local.

### 🚀 Características Principales

* **Comunicación en Tiempo Real:** Implementación de `Socket.io` para mensajería bidireccional instantánea.
* **Despliegue en Red Local (LAN):** Configurado para aceptar conexiones externas (`0.0.0.0`), permitiendo que múltiples dispositivos en la misma red WiFi interactúen.
* **Persistencia Portable:** Sistema de almacenamiento de datos basado en el sistema de archivos (File System), ideal para ejecuciones portables.
* **Arquitectura MVC:** Backend estructurado en Modelos, Controladores y Rutas para escalabilidad y mantenimiento.

---

## 🛠️ Tecnologías Utilizadas

### Backend
* ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) **Node.js**: Entorno de ejecución.
* ![Express](https://img.shields.io/badge/Express.js-404D59?style=flat-square) **Express**: Framework web.
* ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white) **Socket.io**: Motor de WebSockets.
* **File System (fs)**: Manejo nativo de archivos para la base de datos JSON.

### Frontend
* ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) **React.js**: Biblioteca de interfaces.
* ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) **Vite**: Empaquetador y entorno de desarrollo.
* ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) **TailwindCSS**: Estilizado moderno.

---

## 📂 Arquitectura del Backend

El proyecto sigue una estructura limpia para separar la lógica de negocio de la gestión de conexiones:

```text
backend/
├── src/
│   ├── config/          # Configuración de rutas de datos (JSON)
│   ├── controllers/     # Lógica de los eventos del Socket y API
│   ├── models/          # Operaciones CRUD sobre los archivos JSON
│   ├── routes/          # Rutas HTTP (Autenticación)
│   ├── libs/            # Utilidades (Configuración de Sockets)
│   └── index.js         # Punto de entrada del servidor
└── data/                # Almacenamiento persistente (mensajes.json)
