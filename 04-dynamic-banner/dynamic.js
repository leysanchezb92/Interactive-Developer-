// Simulación de un endpoint con 25 registros generados con IA
const endpointData = [
  { id: 1, text: "Descubre la nueva colección de zapatillas urbanas." },
  { id: 2, text: "Innovación y estilo en cada paso." },
  { id: 3, text: "Tu look merece un upgrade." },
  { id: 4, text: "Diseños creados con inteligencia artificial." },
  { id: 5, text: "Explora moda que piensa en ti." },
  { id: 6, text: "Tecnología y tendencia en un solo producto." },
  { id: 7, text: "El futuro de la moda está aquí." },
  { id: 8, text: "Cada prenda cuenta una historia única." },
  { id: 9, text: "Estilo que se adapta a tu país y cultura." },
  { id: 10, text: "Personaliza tu outfit con IA." },
  { id: 11, text: "Moda sostenible con visión tecnológica." },
  { id: 12, text: "Diseños exclusivos generados por algoritmos." },
  { id: 13, text: "Tu marca favorita reinventada con IA." },
  { id: 14, text: "Explora tendencias globales al instante." },
  { id: 15, text: "Creatividad ilimitada en cada producto." },
  { id: 16, text: "La moda que evoluciona contigo." },
  { id: 17, text: "Estilo premium con inteligencia artificial." },
  { id: 18, text: "Diseños que rompen fronteras." },
  { id: 19, text: "Tu outfit, tu identidad, tu IA." },
  { id: 20, text: "Explora lo inesperado en cada colección." },
  { id: 21, text: "Moda que entiende tus preferencias." },
  { id: 22, text: "Diseños creados para tu país y cultura." },
  { id: 23, text: "Cada producto es único gracias a IA." },
  { id: 24, text: "Tu estilo, potenciado por algoritmos." },
  { id: 25, text: "La moda del mañana, hoy." }
];

// Función para obtener contenido aleatorio
function getRandomContent() {
  const randomIndex = Math.floor(Math.random() * endpointData.length);
  return endpointData[randomIndex].text;
}

// Insertar contenido en los banners
document.getElementById("banner-text-250").innerText = getRandomContent();
document.getElementById("banner-text-600").innerText = getRandomContent();

// CTA con acción simulada
document.getElementById("cta-250").addEventListener("click", () => {
  alert("Redirigiendo a la tienda...");
});

document.getElementById("cta-600").addEventListener("click", () => {
  alert("Explora más productos...");
});
