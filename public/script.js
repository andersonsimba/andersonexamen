const grid = document.querySelector('#grid-videojuegos');
const spinner = document.querySelector('#spinner');
const estadoError = document.querySelector('#estado-error');

// Render de tarjetas
function renderVideojuegos(lista) {
  grid.innerHTML = "";

  lista.forEach(juego => {
    const card = document.createElement("article");
    const titulo = juego.title || juego.external || "Juego";
    const imagen = juego.thumb || juego.thumbnail || "";

    card.className = "bg-white shadow rounded-lg overflow-hidden";

    card.innerHTML = `
      <img src="${imagen}" class="h-40 w-full object-cover" />
      <div class="p-4">
        <h3 class="font-semibold">${titulo}</h3>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Carga inicial
async function cargarVideojuegosInicial() {
  spinner.classList.remove("hidden");
  estadoError.classList.add("hidden");

  try {
    const resp = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=12");
    if (!resp.ok) throw new Error("Error API");

    const data = await resp.json();
    renderVideojuegos(data);

  } catch {
    estadoError.classList.remove("hidden");
  } finally {
    spinner.classList.add("hidden");
  }
}

cargarVideojuegosInicial();
