// Buscar todos os pokémons do tipo GRASS
fetch("https://pokeapi.co/api/v2/type/ice")
  .then(res => res.json())
  .then(async (data) => {

    console.log("Pokémons tipo Grama:", data);

    const container = document.getElementById("pokemons");
    container.innerHTML = ""; // limpa antes de inserir

    // Lista básica com nome e url de cada pokémon
    const listaPokemons = data.pokemon.slice(0, 12); // limite de 10 para exemplo

    for (const item of listaPokemons) {

      // Buscar dados completos de cada pokémon
      const res = await fetch(item.pokemon.url);
      const pokeData = await res.json();

      // Criando o card
      const card = document.createElement("div");
      card.classList.add("card");

      // Tipos
      const tipos = pokeData.types
        .map(t => `<span class="tag ${t.type.name}">${t.type.name.toUpperCase()}</span>`)
        .join("");

      // Habilidades
      const habilidades = pokeData.abilities
        .map(a => a.ability.name)
        .join(", ");

      // IMAGEM (SVG oficial)
      const imagem = pokeData.sprites.other["official-artwork"].front_default;

      // Stats principais (atk, def)
      const ataque = pokeData.stats.find(s => s.stat.name === "attack").base_stat;
      const defesa = pokeData.stats.find(s => s.stat.name === "defense").base_stat;

      // Card final
      card.innerHTML = `
        <img src="${imagem}" alt="${pokeData.name}" class="poster">
        <h2>${pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</h2>
        <div class="tipos">${tipos}</div>
        <p><strong>Altura:</strong> ${pokeData.height / 10}m
           <strong>ATK:</strong> ${ataque}</p>
        <p><strong>Peso:</strong> ${pokeData.weight / 10} Kg
           <strong>DEF:</strong> ${defesa}</p>
        <p class="habilities"><strong>Habilidades:</strong> ${habilidades}</p>
      `;
      container.appendChild(card);
    }
  })

  .catch(err => console.error("Erro ao carregar Pokémons:", err));
