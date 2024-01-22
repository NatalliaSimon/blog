/***********************************************************/
// barre de recherche topic
/***********************************************************/

const searchForm = document.getElementById("search");

if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const recap = document.getElementById("noms").value;
    const nomTopic = {
      nom: recap,
    };

    console.log(recap, "coucou");
    fetch("/forum1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nomTopic),
    })
      .then((response) => response.json())
      .then((data) => {
        const resultList = document.getElementById("search-result");
        resultList.innerHTML = "";

        if (data.recherche.length > 0) {
          data.recherche.forEach((topic) => {
            const listItem = document.createElement("ul");
            listItem.innerHTML = `                     
                    <li class="ulPlanning"><a href="/message/${topic.id}" class="planning">${topic.nom} </a></li>
                `;
            resultList.appendChild(listItem);
          });
        } else {
          resultList.innerHTML = "Aucun Nom trouvé pour cette recherche.";
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche :", error);
      });
  });
}

/***********************************************************/
// barre de recherche article
/***********************************************************/

const search = document.getElementById("searchAll");

if (search) {
  search.addEventListener("submit", function (e) {
    e.preventDefault();
    const titre = document.getElementById("nom").value;
    const nomTitre = {
      nom: titre,
    };

    fetch(`/homesearch/?nom=${nomTitre.nom}`)
      .then((response) => response.json())
      .then((data) => {
        const resultList = document.getElementById("resultat");
        resultList.innerHTML = "";

        if (data.recherche.length > 0) {
          data.recherche.forEach((publication) => {
            const listItem = document.createElement("div");
            listItem.innerHTML = `                     
                    <a href="/article/${publication.titre}">${publication.titre} </a>
                `;

            resultList.appendChild(listItem);
            console.log(resultList);
          });
        } else {
          resultList.innerHTML = "Aucun Nom trouvé pour cette recherche.";
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche :", error);
      });
  });
}
