AOS.init();

new Typed("#typed-text", {
    strings: [
        "Search Vermeer paintings...",
        "Search ancient sculptures...",
        "Search medieval artifacts...",
        "Search Renaissance art..."
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
});

const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {

    const query = document.getElementById("search-input").value;

        const response = await fetch(
            `http://localhost:3000/api/search?q=${query}`
        );

        const data = await response.json();

        await fetch('/search-history', {

            method: 'POST',
        
            headers: {
                'Content-Type': 'application/json'
            },
        
            body: JSON.stringify({
                search_term: query
            })
        
        });

        displayResults(data.items);


});

function displayResults(items) {

    const container = document.getElementById("results-container");

    container.innerHTML = "";

    items.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("result-card");

        card.setAttribute("data-aos", "fade-up");

        card.innerHTML = `
            <img src="${item.edmPreview?.[0] || ''}" />

            <h3>${item.title?.[0] || "No Title"}</h3>

            <p>
                ${item.dcCreator?.[0] || "Unknown Creator"}
            </p>
        `;

        container.appendChild(card);

    });

    AOS.refresh();

}

