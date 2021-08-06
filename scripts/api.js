const API_URL = "https://api.giphy.com/v1";
const API_KEY = "oAF6BugvxZqmpPf30UwCOVes8vOpwQEe";
let REQ_TYPE ="gifs";                // gifs | stickers
let REQUEST = "trending";            // trending | search
let Q ="";                           // Búsqueda usuario
let LIMIT = 12;                      // Cant gifos to get
let OFFSET = 0;
let URL = "";

// // GIFOS storage
// let gifosSearchedList = [];
// let gifosinTrendList = [];

// URL = "https://api.giphy.com/v1/gifs/trending?api_key=oAF6BugvxZqmpPf30UwCOVes8vOpwQEe&limit=10";
// URL = `${API_URL}/${REQ_TYPE}/${REQUEST}?api_key=${API_KEY}&q=${Q}&offset=${OFFSET}&limit=${LIMIT}`

var gifosList = [];
var gifosTrends = [];
var gifosFavorites = [];
var myGifos = [];

var gifosResults = [];
console.log("myGifos info: ", myGifos, typeof myGifos, myGifos.length)

const carrusel = document.querySelector(".carrusel");
const favorites = document.querySelector(".container-favs-gifs");
const subsection_results = document.getElementById("subsection-results-div");
const container_results_section = document.querySelector(".container-results-section");
const results_container = document.querySelector(".container-results-section .results-container");
const subsection_results_title = container_results_section.firstElementChild;

const viewMore_btn_results = document.querySelector("#view-more-btn-results");
const viewMore_btn_favs = document.querySelector("#view-more-btn-favs");
const viewMore_btn_misGifos = document.querySelector("#view-more-btn-mis-gifos");
const default_btn = document.querySelector("#default-btn")

var gifosTemplate = "";
var notFoundResultsSearchTemplate = `
    <div class="not-found">
        <div class="img"></div>
        <p>Intenta con otra búsqueda</p>
    </div>
`
function insertGifos (gifos, gifosContainer, found=false, defaultInsert='', viewMoreBtn=default_btn, ) {
    // [gifos]: array de gifos a insertar en [containerGifosElement]
    // [defaultContent]: template a insertar en [containerGifosElement] si [notFound]===true
    // [containerGifosElement]: Elemento HTML que recibirá los gifos
    // [viewMoreBtn]: botón ver-más que debe ser ocultado o mostrado si hay o no gifos
    // [found]: Bandera para indicar el array [gifos] está vacío o no
    if (gifos.length>0 && found){
        gifosContainer.innerHTML = '';
        gifos.forEach(gifo => {
            gifosTemplate = `
                <g>
                    <figure class="figure-gifo" onmouseover="focusedElement(this)" statusMobile="false" statusDktp="false">
                        <div class="modal-container">
                            <img id="${gifo.id}" class="GIF img-gif" src="${gifo.medias.gif}" alt="${gifo.title}" >
                        </div>
                        <div class="capa">
                            <div class="buttons">
                                <div class="btn-fav hover-btns" id="btn-a"></div>
                                <div class="btn-download hover-btns" id="btn-b"></div>
                                <div class="btn-max hover-btns" id="btn-c"></div>
                            </div>
                            <p>${gifo.author}</p>
                            <h3>${gifo.title}</h3>
                        </div>
                    </figure>
                </g>
            `
            gifosContainer.innerHTML += gifosTemplate;
            // show [view-more] button
        })
        viewMoreBtn.classList.remove("display-none")
    } else {
        gifosContainer.innerHTML = defaultInsert;
        // hide [view-more] button
        if (viewMoreBtn.classList.contains("display-none")!=true){
            viewMoreBtn.classList.add("display-none")
        }
    }
}

function search (URL, gifosContainer, defaultInsert='', listToStorage=[], listResults=[], viewMoreBtn=default_btn){
    console.log("MOTA: Fetch starting...")
    fetch(URL)
    .then(apiResponse => apiResponse.json())
    .then(apiResponseJSON => {
        const data = apiResponseJSON.data;
        var statusFound = data.length>0;
        // Storage gifos code or function 
        data.forEach(gifo => {
            const gifoData  = {
                // Validar contenido en title and id. replace with unknown if require
                id: gifo.id,
                title:  gifo.title,
                author:  gifo.username,     //username
                medias : {
                    gif :  gifo.images.original.url,
                    mp4: gifo.images.original.mp4,
                    webp: gifo.images.original.webp,
                    giphy: gifo.url
                }
            }
            listResults.push(gifoData);
            listToStorage.push(gifoData);
        });
        console.log("Lista[]: ", listToStorage, typeof listToStorage, listToStorage.length)
        console.log("listResults[]: ", listResults, typeof listResults, listResults.length)
        
        // Insert gifos in page code or function
        insertGifos(listResults, gifosContainer, statusFound, defaultInsert,  viewMoreBtn);
        console.log("NOTA: Fetch finished succesfully!")
        return listResults;
    })
    .catch(error => console.error(error))
}

window.onload = onloadExe = async () =>{
    console.log("onload excecute")
    REQ_TYPE ="gifs";                // gifs | stickers
    REQUEST = "trending";            // trending | search
    LIMIT = 12;                      // Cant gifos to get
    OFFSET = 0;
    URL = `${API_URL}/${REQ_TYPE}/${REQUEST}?api_key=${API_KEY}&offset=${OFFSET}&limit=${LIMIT}`
    // Load trends in carrusel
    var listReturned = [];
    listReturned.push(await search(URL,carrusel, '', gifosTrends, myGifos));   
    console.log("ListReturned[]: ", gifosTrends);
    console.log("gifosTrend[]: ", myGifos);
    // console.log(myGifos[0].medias.gif)
} 


// GENERAR BUSQUEDA DE GIFO ================================================================================
// Incluye: Busqueda y tendencias ==========================================================================

// Generar busqueda de GIf al presionar [Enter]
const search_bar = document.querySelector("input#search-bar")
const search_btn_img = document.querySelector("#search-btn-img")
const close_btn_img = document.querySelector("#close-btn-img")

function toSearch(event){   // event keyboard data
    // event = metas of key of keyboard
    // element = input that contained of text to search
    text = search_bar.value.trim()
    console.log("Running search!!!")
    if (text){
        // Cambiar lupa a X
        if (!validateClassList("display-none", search_btn_img.classList)){
            search_btn_img.classList.toggle("display-none")
        }
        if (validateClassList("display-none", close_btn_img.classList)){
            close_btn_img.classList.toggle("display-none")
        } 
    }
    else {
        // Cambiar X a lupa
        if (validateClassList("display-none", search_btn_img.classList)){
            search_btn_img.classList.toggle("display-none")
        }
        if (!validateClassList("display-none", close_btn_img.classList)){
            close_btn_img.classList.toggle("display-none")
        }
    }

    // Realizar busqueda | Evento al presionar [Enter]
    if (event.code == "Enter" && text){
        // console.log("Lista with barSearch: ", lista, typeof lista, lista.length)
        search_bar.blur();
        REQ_TYPE ="gifs";                // gifs | stickers
        REQUEST = "search";              // trending | search
        Q =`${text}`;                    // Búsqueda usuario
        LIMIT = 12;                      // Cant gifos to get
        OFFSET = 0;

        URL = `${API_URL}/${REQ_TYPE}/${REQUEST}?api_key=${API_KEY}&q=${Q}&offset=${OFFSET}&limit=${LIMIT}`
        gifosList = [];
        gifosResults = [];
        search(URL, results_container,notFoundResultsSearchTemplate, gifosList, gifosResults, viewMore_btn_results )
        subsection_results_title.textContent = Q;
        subsection_results.classList.remove("display-none")
    }
}
search_bar.addEventListener("click", (event)=>{
    // Evento al entrar a la barra de busqueda
    search_bar.addEventListener("keyup", toSearch)
})
// Borrar contenido de barra de busqueda
close_btn_img.addEventListener("click", (event)=>{
    search_bar.value = ""
})


// view_more_results_section_btn.addEventListener("click", (event)=>{
//     console.log('hola!')
// })


// FUNCIONALIDAD Botón VER-MÁS==============================================================
// const search_btn = document.getElementById("search_btn")

const view_more_results = "";


// const view_more_btns = document.querySelectorAll(".view-more-btn") 

// const viewMoreFunction = (event, currentSection) => {
//     const element = event.target;
//     console.log("Event viewMore btn: ", event)
//     console.log(element)
//     // CurrentSection = inicio | favorites | mis-gifos

//     if (currentSection === "inicio"){
//         console.log("Show more gifos: seccion inicio")
//     } else if (currentSection === "favorites") {
//         console.log("Show more gifos: seccion favoritos")
//     } else if (currentSection === "mis-gifos") {
//         console.log("Show more gifos: seccion mis-gifos")
//     }
//     console.log(element.id)
// }
// for (var i=0; i<view_more_btns.length; i++) {
//     // console.log(view_more_btns[i])
//     view_more_btns[i].addEventListener("click", (event)=>{
//         viewMoreFunction(event, activeSection);
//     })
// }









// Generar busqueda a partir de palabras tendencias
var trends_words = document.querySelectorAll(".trend-word");
const tw_1 = document.querySelector(".tw-1")

for (var i=0; i<trends_words.length; i++){
    trends_words[i].addEventListener("click", (event)=>{
        searchTopicGifos(event.target.textContent);
    });
}
