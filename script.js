// Configuración de GitHub
const GITHUB_USER = "tu_usuario"; // Cambia por tu usuario de GitHub
const GITHUB_REPO = "tu_repositorio"; // Cambia por tu repositorio
const GITHUB_TOKEN = "tu_token_personal"; // Coloca tu token aquí

// Manejador para cargar shapefiles
document.getElementById("uploadButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Por favor selecciona un archivo .zip");
    return;
  }

  // Leer el archivo como base64
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64Content = btoa(e.target.result);

    // Subir a GitHub
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${file.name}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Subiendo shapefile ${file.name}`,
        content: base64Content,
      }),
    });

    if (response.ok) {
      document.getElementById("status").textContent = "Archivo subido correctamente a GitHub.";
    } else {
      document.getElementById("status").textContent = "Error al subir el archivo.";
    }
  };

  reader.readAsBinaryString(file);
});

// Mapa interactivo con Leaflet
const map = L.map("map").setView([13.7, -89.2], 7); // Coordenadas de ejemplo para El Salvador
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Visualización de shapefiles aún no implementada
