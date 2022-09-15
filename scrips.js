// VARIABLER
let film;
const url = "https://movienight-aa6f.restdb.io/rest/film";
const myHeaders = {
  headers: {
    "x-apikey": "631b9759fdc15b0265f1728c",
  },
};
const dest = document.querySelector("#gallery");
const theTemplatePointer = document.querySelector("template");
const billedUrl = "images/resized_images/";
let filterFilm = "alle";

// FETCHER JSON DATAEN NÅR DOM CONTENT ER LOADED IND
document.addEventListener("DOMContentLoaded", getJson);

async function getJson() {
  let jsonData = await fetch(url, myHeaders);
  film = await jsonData.json();
  console.log("Film", film);

  visFilm();
  addEventListenersToButtons();
}

// VISER JSON DATAEN I GALLERIET OG INDSÆTTER DYNAMISK CONTENT
function visFilm() {
  dest.innerHTML = "";
  film.forEach((film) => {
    if (filterFilm == "alle" || filterFilm == film.status) {
      const theClone = theTemplatePointer.cloneNode(true).content;
      theClone.querySelector("h1").textContent = film.titel;
      theClone.querySelector("img").src = billedUrl + film.coverbillede + ".jpeg";
      theClone.querySelector("img").alt = film.titel;
      theClone.querySelector("img").addEventListener("click", () => {
        visSingle(film);
      });
      dest.appendChild(theClone);
    }
  });
}

// DIRIGERER TIL SINGLE ARTIST MED KORREKT ID
function visSingle(film) {
  location.href = `/kea/tema7/t7-gruppeprojekt/single.html?id=${film._id}`;
  location.href = `./single.html?id=${film._id}`; // slet evt. når live
}

// KIGGER EFTER HVILKET ELEMENT BLEV KLIKKET PÅ I FILTRERINGSMENU OG KØRER FUNKTIONEN FILTRERING
function addEventListenersToButtons() {
  document.querySelectorAll("#second_nav ul li").forEach((elm) => {
    elm.addEventListener("click", filtrering);
  });
}

// FILTRERER BASERET PÅ filterArtist I VisArtister funktionen
function filtrering() {
  filterFilm = this.dataset.film;
  visFilm();
}

/*
// BURGERMENU
window.addEventListener("load", sidenVises);

// Når siden vises, lyttes der efter klik på burgerBtn
function sidenVises() {
    const burgerBtn = document.querySelector("#burger_btn");
    burgerBtn.addEventListener("click", openMenu);
}


// Ved klik på burgerBtn, starter funktion openMenu, som åbner menuen, og der lyttes igen efter klik på burgerBtn
function openMenu() {
    const burgerBtn = this;
    const menu = document.querySelector("#menu");

    this.removeEventListener("click", openMenu);
    this.classList.add("open");
    menu.classList.add("open");
    this.addEventListener("click", closeMenu);
}
// Ved klik på burgerBtn, starter funktion closeMenu, som lukker menuen og der lyttes igen efter klik på burgerBtn
function closeMenu() {
    const burgerBtn = this;
    const menu = document.querySelector("#menu");

    this.removeEventListener("click", closeMenu);
    menu.classList.remove("open");
    this.addEventListener("click", openMenu);
}
*/
