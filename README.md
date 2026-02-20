# 🚀 Ad-Tech Excellence: Interactive & Dynamic Banner Suite

Este repositorio contiene una serie de desarrollos de publicidad digital interactiva diseñados para cumplir con altos estándares de rendimiento, medición de datos y personalización dinámica. El proyecto demuestra la capacidad de transformar formatos de redes sociales (Facebook/Instagram) en unidades publicitarias HTML5 independientes y altamente funcionales.

---

## 🛠 Tecnologías Utilizadas

* **HTML5 / CSS3** (BEM Methodology)
* **JavaScript** (Vanilla & ES6+)
* **APIs Externas:** Integración en tiempo real con **OpenWeatherMap** para contenido contextual.
* **Dynamic Content:** Consumo de endpoints dinámicos para personalización vía IA.

---

## 📁 Proyectos Incluidos

### 1. Facebook & Instagram Transcreation
* **Facebook Video Post:** Adaptación de video interactivo con capa de controles personalizada. Implementación de **Event Tracking** para medir *play, pause y mute* sin interferir con el click-through del banner.
* **Instagram Carousel:** Galería multi-producto donde cada slide cuenta con una URL de salida independiente y tracking de navegación (flechas y clics por imagen).

### 2. Contextual Weather Banner (Colombia)
Banners dinámicos que cambian su diseño, mensaje y oferta de producto según el clima en tiempo real de ciudades colombianas (Bogotá, Medellín, Cali, etc.).

### 3. AI-Powered Dynamic Banner
Banner conectado a un endpoint con más de 20 registros de contenido generado por IA.
* **Funcionalidad:** Cada impresión (*refresh*) consume un registro diferente, permitiendo una rotación infinita de mensajes y CTAs optimizados.

---

## Estructura del proyecto:

```
INTERACTIVE-DEVELOPER/
│
├── 01-facebook-video/
│   ├── index.html
│   ├── style.css
│   └── main.js
│
├── 02-instagram-carousel/
│   ├── index.html
│   ├── style.css
│   └── carousel.js
│
├── 03-weather-banner/
│   ├── index.html
│   ├── weather.css
│   └── weather.js
│
├── 04-dynamic-banner/
│   └──  index.html
│   └── dynamic.css
│   └── dynamic-engine.js
│   └── server.js
│
├── README.md
├── .env
├── index.html
├── style.css
├── package.json
├── .nvmrc
└── .gitignore
```

## 📊 Medición y Eventos

Se implementó una capa de lógica para capturar interacciones de usuario de manera granular:

* `video_interaction_total`: Contador visible de interacciones con el reproductor.
* `carousel_slide_index`: Seguimiento de la navegación del usuario por el carrusel.
* `weather_api_call`: Registro de la condición climática capturada para auditoría de pauta.

---

## 🚀 Cómo visualizar localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/leysanchezb92/Interactive-Developer-.git
   ```

2. Abre los `index.html` de cada carpeta en tu navegador o sirve la carpeta con un servidor estático:
   ```bash
   cd /ruta/al/proyecto/Interactive-Developer-
   python3 -m http.server 8000
   # luego abre http://localhost:8000/01-facebook-video/index.html (ejemplo)
   ```

3. Requisitos:
   - Conexión a internet para llamadas a APIs externas.
   - Para el banner dinámico, arranca el servidor API local (ver sección siguiente).

---

## 🖥 Ejecutar el servidor API para el Dynamic Banner (local)

Los banners dinámicos en `04-dynamic-banner` consumen `/api/content`. Inicia el servidor antes de abrir los banners.

1. Requisitos
   - Node.js v24 instalado.
   - El archivo `server.js` se encuentra en la raíz del proyecto (junto a este README).

2. Crear `.env` en la raíz con la clave y puerto:
   ```env
   GEMINI_API_KEY=AIzaSyDQIY7VJR6-uBELQP-7Jyfw9FUedrgqHFs
   PORT=3000
   ```

3. Instalar dependencias (una sola vez):
   ```bash
   npm init -y
   npm install express cors dotenv @google/generative-ai
   # opcional: npm install -D nodemon
   ```

4. Iniciar el servidor:
   ```bash
   node server.js
   # o con nodemon:
   npx nodemon server.js
   ```

5. Probar el endpoint:
   ```bash
   curl "http://localhost:3000/api/content?brand=Nike&country=Colombia&product=zapatillas"
   ```

6. Con el servidor corriendo, abre `04-dynamic-banner/index.html` (o sirve la carpeta con python http.server).

Notas:
- Si `server.js` está en `04-dynamic-banner/`, ejecuta los comandos desde esa carpeta y coloca `.env` ahí.
- El servidor habilita CORS para permitir fetch desde páginas locales.
- Asegúrate de no subir `.env` al repositorio (.gitignore debe incluirlo).

---

> [!NOTE]
> Este proyecto fue desarrollado como parte de un desafío técnico de ingeniería para publicidad digital.