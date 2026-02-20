const colombiaCities = [
    { name: "Bogotá", lat: 4.6097, lon: -74.0817 },
    { name: "Medellín", lat: 6.2442, lon: -75.5812 },
    { name: "Cali", lat: 3.4372, lon: -76.5225 },
    { name: "Barranquilla", lat: 10.9639, lon: -74.7964 },
    { name: "Cartagena", lat: 10.3997, lon: -75.5144 },
    { name: "Bucaramanga", lat: 7.1254, lon: -73.1198 },
    { name: "Pereira", lat: 4.8133, lon: -75.6961 },
    { name: "Santa Marta", lat: 11.2408, lon: -74.1990 },
    { name: "Cúcuta", lat: 7.8939, lon: -72.5078 },
    { name: "Manizales", lat: 5.0689, lon: -75.5174 }
];

let cityIndex = 0;

async function updateAllBanners() {
    const city = colombiaCities[cityIndex];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);

        document.querySelectorAll('.city-name').forEach(el => el.innerText = city.name);
        document.querySelectorAll('.temp-val span').forEach(el => el.innerText = temp);
        document.querySelectorAll('.desc').forEach(el => el.innerText = "CLIMA ACTUAL");

        const color = temp > 26 ? '#ff8c00' : '#00d4ff';
        document.querySelectorAll('.banner-container').forEach(el => el.style.borderColor = color);

        cityIndex = (cityIndex + 1) % colombiaCities.length;
    } catch (e) {
        console.error("Error cargando clima", e);
    }
}

setInterval(updateAllBanners, 4000);
updateAllBanners();