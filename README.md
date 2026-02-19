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
* **Lógica de Negocio:** * Si **$Temp > 24°C$** → Creatividad de refresco/frío.
    * Si **$Temp < 18°C$** → Creatividad de confort/caliente.

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
│   ├── css/
│   │   └── style.css
│   ├── js/
│       └── main.js
│
├── 02-instagram-carousel/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│       └── carousel.js
│
├── 03-weather-banner/
│   ├── 300x250.html
│   ├── 300x600.html
│   ├── css/
│   │   └── weather.css
│   └── js/
│       └── weather-api.js
│
├── 04-dynamic-banner/
│   ├── index.html
│   ├── css/
│   │   └── dynamic.css
│   ├── js/
│   │   └── dynamic-engine.js
│   └── data/
│       └── content.json      <-- Aquí irían tus 20-30 registros de IA
│
├── README.md                 <-- El texto que preparamos antes
└── .gitignore                <-- Para excluir archivos innecesarios
```

## 📊 Medición y Eventos

Se implementó una capa de lógica para capturar interacciones de usuario de manera granular:

* `video_interaction_total`: Contador visible de interacciones con el reproductor.
* `carousel_slide_index`: Seguimiento de la navegación del usuario por el carrusel.
* `weather_api_call`: Registro de la condición climática capturada para auditoría de pauta.

---

## 🚀 Cómo visualizarlo

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/nombre-del-repo.git](https://github.com/tu-usuario/nombre-del-repo.git)
    ```
2.  **Ejecución:** Abre los archivos `index.html` de cada carpeta en tu navegador preferido.
3.  **Requisito:** Para los banners con API, asegúrate de tener una conexión a internet activa para el fetch de datos.

> [!NOTE]
> Este proyecto fue desarrollado como parte de un desafío técnico de ingeniería para publicidad digital.