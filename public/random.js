const container = document.getElementById("artifact-container");
const button = document.getElementById("random-btn");

document.addEventListener("DOMContentLoaded", loadRandomArtifact);
button.addEventListener("click", loadRandomArtifact);

async function loadRandomArtifact() {

    container.innerHTML = "<p>Loading artifact...</p>";

        const response = await fetch(
            `http://localhost:3000/api/search?q=art`
        );

        const data = await response.json();

        const items = data.items;

        const randomItem = items[Math.floor(Math.random() * items.length)];

        displayArtifact(randomItem);

}

function displayArtifact(item) {

    const image =
        item.edmPreview?.[0] ||
        "https://via.placeholder.com/400";

    const title =
        item.title?.[0] ||
        "Untitled Artifact";

    const creator =
        item.dcCreator?.[0] ||
        "Unknown Creator";

    const year =
        item.year?.[0] ||
        "Unknown Year";

    container.innerHTML = `
        <div class="result-card">

            <img src="${image}" />

            <div class="result-card-content">

                <h2>${title}</h2>

                <p><strong>Creator:</strong> ${creator}</p>

                <p><strong>Year:</strong> ${year}</p>

            </div>

        </div>
    `;
}

window.onload = function() {
    loadRandomArtifact();
    displayArtifact();
};