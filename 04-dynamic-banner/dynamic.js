/**
 * Fetches ad content from the AI backend.
 *
 * @param {Object} params - Query parameters (e.g., { brand, country, product }).
 * @returns {Promise<Object>} - Object with fields expected by the UI:
 *                              { text: string, cta?: string, color?: string }
 */
async function fetchAdContent(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `http://localhost:3000/api/content?${queryString}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AI content:", error);
    // Default fallback content to keep the banner usable offline / on error
    return {
      text: "Calidad y estilo en cada paso.",
      cta: "Ver más",
      color: "#222222"
    };
  }
}

/**
 * Populates a banner of a given size with fetched content.
 *
 * @param {string|number} size - The banner size identifier used in element IDs/classes (e.g., "250", "600").
 * @param {Object} params - Parameters forwarded to the AI endpoint (brand, country, product, etc).
 */
async function setupBanner(size, params) {
  const data = await fetchAdContent(params);

  const textElem = document.getElementById(`banner-text-${size}`);
  const ctaElem = document.getElementById(`cta-${size}`);
  const bannerContainer = document.getElementsByClassName(`banner-${size}`)[0];

  if (!bannerContainer) {
    console.warn(`Banner container not found for size: ${size}`);
    return;
  }

  if (data) {
    if (textElem) textElem.innerText = data.text;
    if (ctaElem) ctaElem.innerText = data.cta || "Ver más";

    if (data.color) bannerContainer.style.backgroundColor = data.color;
    bannerContainer.classList.add('banner-visible');
  }
}

/**
 * Immediately initialize the banners you want on page load.
 * Adjust sizes and params as needed.
 */
(async () => {
  setupBanner("250", { brand: "Nike", country: "Colombia", product: "zapatillas" });
  setupBanner("600", { brand: "Adidas", country: "España", product: "camisetas" });
})();

/**
 * CTA click handlers.
 * These assume the CTA elements exist; if not, the code will throw.
 * Wraps `window.open` to open the target branding site in a new tab.
 */
document.getElementById("cta-250").addEventListener("click", () => {
  window.open("https://www.nike.com/co/", "_blank");
});

document.getElementById("cta-600").addEventListener("click", () => {
  window.open("https://www.adidas.es/", "_blank");
});