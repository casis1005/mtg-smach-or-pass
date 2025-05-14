const foto = document.getElementById("foto");
let likes = parseInt(localStorage.getItem('likes')) || 0;
let dislikes = parseInt(localStorage.getItem('dislikes')) || 0;

function updateCounters() {
    document.getElementById("like-counter").innerText = `Je hebt ${likes} likes gegeven`;
    document.getElementById("dislike-counter").innerText = `Je hebt ${dislikes} dislikes gegeven`;
}

async function getRandomCard() {
    const filter = ["art%3Afemale+art%3Aanime&unique"]
    const url = `https://api.scryfall.com/cards/random?q=${filter[0]}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.image_uris && data.image_uris.normal) {
        return data;
    } else {
        return await getRandomCard();
    }
}

async function showcard() {
    const card = await getRandomCard();
    foto.innerHTML = `<img src="${card.image_uris.normal}" alt="${card.name}" class="max-w-xs rounded shadow-lg"/>`;
}

function likeCard() {
    likes++;
    localStorage.setItem('likes', likes);
    updateCounters();
    showcard();
}

function dislikeCard() {
    dislikes++;
    localStorage.setItem('dislikes', dislikes);
    updateCounters();
    showcard();
}

updateCounters();
showcard();