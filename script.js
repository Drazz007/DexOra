function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function searchfun() {

  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("plt");
  tr = table.getElementsByTagName("tr");

  
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// ==========================================
// HOME PAGE POKEMON SEARCH
// ==========================================



// ==========================================
// START SEARCH
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("pokemon-search");
    const dropdown = document.getElementById("pokemon-dropdown");

    if (!searchInput || !dropdown) {
        return;
    }

// ======================================
// LOAD PAGE'S JSON DATABASE
// ======================================

const dex = document.body.dataset.dex;

let pokemonList = [];

fetch(`../data/${dex}.json`)
    .then(response => {

        if (!response.ok) {
            throw new Error("Couldn't load " + dex + ".json");
        }

        return response.json();

    })

    .then(data => {

        pokemonList = data;

    })

    .catch(error => {

        console.error(error);

        dropdown.innerHTML = `
            <div class="no-results">
                Failed to load Pokémon database.
            </div>
        `;

    });
    // ======================================
    // SEARCH WHILE TYPING
    // ======================================

    searchInput.addEventListener("input", function () {

        const search = searchInput.value.trim().toLowerCase();

        dropdown.innerHTML = "";


        // Don't show anything when empty
        if (search === "") {

            dropdown.classList.remove("show");

            return;
        }


        // Find matching Pokémon
        const results = pokemonList
            .filter(function (pokemon) {

                return pokemon.name
                    .toLowerCase()
                    .includes(search);

            })
            .slice(0, 10);


        // ==================================
        // NO RESULTS
        // ==================================

        if (results.length === 0) {

            dropdown.innerHTML = `
                <div class="no-results">
                    No Pokémon found
                </div>
            `;

            dropdown.classList.add("show");

            return;
        }


        // ==================================
        // CREATE RESULTS
        // ==================================

        results.forEach(function (pokemon) {

            const result = document.createElement("div");

            result.classList.add("pokemon-result");


            result.innerHTML = `
                <span class="pokemon-number">
                    #${String(pokemon.number).padStart(3, "0")}
                </span>

                <span class="pokemon-name">
                    ${pokemon.name}
                </span>
            `;


            // Click result
            result.addEventListener("click", function () {

                window.location.href = pokemon.page;

            });


            dropdown.appendChild(result);

        });


        dropdown.classList.add("show");

    });


    // ======================================
    // CLOSE WHEN CLICKING OUTSIDE
    // ======================================

    document.addEventListener("click", function (event) {

        if (!event.target.closest(".home-search")) {

            dropdown.classList.remove("show");

        }

    });

});