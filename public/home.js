const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {

    const query = document.getElementById("search-input").value;

    if (!query) return;

    try {

        const response = await fetch(
            `http://localhost:3000/api/search?q=${query}`
        );

        const data = await response.json();

        await fetch('http://localhost:3000/search-history', {

            method: 'POST',
        
            headers: {
                'Content-Type': 'application/json'
            },
        
            body: JSON.stringify({
                search_term: query
            })
        
        });

        displayResults(data.items);

    } catch (error) {

        console.error("Error fetching data:", error);

    }

});

function displayResults(items) {

    const container = document.getElementById("results-container");

    container.innerHTML = "";

    items.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("result-card");

        card.innerHTML = `
            <img src="${item.edmPreview?.[0] || ''}" />

            <h3>${item.title?.[0] || "No Title"}</h3>

            <p>
                ${item.dcCreator?.[0] || "Unknown Creator"}
            </p>
        `;

        container.appendChild(card);

    });

}