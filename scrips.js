// VARIABLER
let artister;
const url = "https://movienight-aa6f.restdb.io/rest/film";
const myHeaders = {
    headers: {
        "x-apikey": "631b9759fdc15b0265f1728c",
    },
};
const dest = document.querySelector("#gallery");
const theTemplatePointer = document.querySelector("template");
const billedUrl = "images/resized_images/";
let filterArtist = "alle";


// FETCHER JSON DATAEN NÅR DOM CONTENT ER LOADED IND
document.addEventListener("DOMContentLoaded", getJson);

async function getJson() {
    let jsonData = await fetch(url, myHeaders);
    artister = await jsonData.json();
    console.log("Artister", artister);

    visArtister();
    addEventListenersToButtons();
}

// VISER JSON DATAEN I GALLERIET OG INDSÆTTER DYNAMISK CONTENT
function visArtister() {
    dest.innerHTML = "";
    artister.forEach((artist) => {
        if (filterArtist == "alle" || filterArtist == artist.genre) {
            const theClone = theTemplatePointer.cloneNode(true).content;
            theClone.querySelector("h1").textContent = artist.titel;
            theClone.querySelector("img").src = billedUrl + artist.coverbillede + ".jpeg";
            theClone.querySelector("img").alt = artist.titel;
            theClone.querySelector("p.genre").textContent = artist.genre;

            dest.appendChild(theClone);

            dest.lastElementChild.addEventListener("click", () => {
                visSingle(artist);
            });
        }
    });
}

// DIRIGERER TIL SINGLE ARTIST MED KORREKT ID
function visSingle(artist) {
    location.href = `/kea/tema7/t7-gruppeprojekt/SIDEHER.html?id=${artist._id}`;
}


// KIGGER EFTER HVILKET ELEMENT BLEV KLIKKET PÅ I FILTRERINGSMENU OG KØRER FUNKTIONEN FILTRERING
function addEventListenersToButtons() {
    document.querySelectorAll("#second_nav ul li").forEach((elm) => {
        elm.addEventListener("click", filtrering);
    });
}

// FILTRERER BASERET PÅ filterArtist I VisArtister funktionen
function filtrering() {
    filterArtist = this.dataset.artist;
    visArtister();
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