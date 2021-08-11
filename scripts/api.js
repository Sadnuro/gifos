// // GIFOS storage
let gifosList = [];             // Stores all gifos findeds
let gifosTrends = [];           // Stores all gifos in trends carrusel
let myGifos = [];               // Stores all creates gifos 
let gifosFavorites = [];        // Stores gifos added to favorites
let gifosResults = [];          // Stores current results of search of gifos


const API_URL = "https://api.giphy.com/v1";
const API_KEY = "oAF6BugvxZqmpPf30UwCOVes8vOpwQEe";
let REQ_TYPE ="gifs";                // gifs | stickers
let REQUEST = "trending";            // trending | search
let Q ="";                           // Búsqueda usuario
let LIMIT = 12;                      // Cant gifos to get
let OFFSET = 0;
let URL = "";

// URL = "https://api.giphy.com/v1/gifs/trending?api_key=oAF6BugvxZqmpPf30UwCOVes8vOpwQEe&limit=10";
// URL = `${API_URL}/${REQ_TYPE}/${REQUEST}?api_key=${API_KEY}&q=${Q}&offset=${OFFSET}&limit=${LIMIT}`


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
function insertGifos (gifos, gifosContainer, defaultInsert='', viewMoreBtn=default_btn) {
    /**
     * [gifos]: array de gifos a insertar en [containerGifosElement]
     * [gifosContainer]: Elemento HTML que recibirá los gifos
     * [defaultInsert]: template a insertar en [containerGifosElement] si [notFound]===true
     * [viewMoreBtn]: botón ver-más que debe ser ocultado o mostrado si hay o no gifos
     */

    if (gifos.length>0){
        console.log("start forech gifos insert!")
        gifos.forEach(gifo => {
            gifosTemplate = `
                <g>
                    <figure class="figure-gifo" onmouseover="focusedElement(this)" statusMobile="false" statusDktp="false">
                        <div class="modal-container">
                            <img id="${gifo.id}" class="GIF img-gif" src="${gifo.medias.gif}" alt="${gifo.title}" >
                        </div>
                        <div class="capa">
                            <div class="buttons">
                                <div class="btn-fav hover-btns" id="btn-fav" fav="false"></div>
                                <div class="btn-download hover-btns" id="btn-download"></div>
                                <div class="btn-max hover-btns" id="btn-max"></div>
                            </div>
                            <p id="author">${gifo.author}</p>
                            <h3 id="title">${gifo.title}</h3>
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

async function search (URL, ){
    const response = await fetch(URL);
    if(!response.ok) {
        throw new Error("WARN", response.status);
    }
    const gifos = (await response.json()).data;

    let result = [];
    gifos.forEach(gifo => {
        const gifoData  = {
            // Validar contenido en title and id. replace with unknown if require
            id: gifo.id, title:  gifo.title, author:  gifo.username,
            medias : {
                gif :  gifo.images.original.url,
                mp4: gifo.images.original.mp4,
                webp: gifo.images.original.webp,
                giphy: gifo.url
            }
        }
        result.push(gifoData);
    });
    return result;
}

async function onloadExe (){
    /**
     * Carga las tendencias en el carrusel
     */
    REQ_TYPE ="gifs";                // gifs | stickers
    REQUEST = "trending";            // trending | search
    LIMIT = 12;                      // Cant gifos to get
    OFFSET = 0;
    URL = `${API_URL}/${REQ_TYPE}/${REQUEST}?api_key=${API_KEY}&offset=${OFFSET}&limit=${LIMIT}`
    // Load trends in carrusel
    gifosTrends = await search(URL);
    //insert gifos function
    insertGifos (gifosTrends, carrusel)
} 

window.onload =  onloadExe();

// GENERAR BUSQUEDA DE GIFO ================================================================================
// Incluye: Busqueda y tendencias ==========================================================================

// Generar busqueda de GIf al presionar [Enter]
const search_bar = document.querySelector("input#search-bar")
const search_btn_img = document.querySelector("#search-btn-img")
const close_btn_img = document.querySelector("#close-btn-img")

async function toSearch(event){   // event keyboard data
    // event = metas of key of keyboard
    // element = input that contained of text to search
    const text = search_bar.value.trim()
    console.log("Running search!!!")
    if (text){
        // Cambiar lupa a X
        if (!search_btn_img.classList.contains("display-none")){
            search_btn_img.classList.toggle("display-none")
        }
        
        if (close_btn_img.classList.contains("display-none")){
            close_btn_img.classList.toggle("display-none")
        } 
    }
    else {
        // Cambiar X a lupa!
        
        if (search_btn_img.classList.contains("display-none")){
            search_btn_img.classList.toggle("display-none")
        }
        
        if (!close_btn_img.classList.contains("display-none")){
            close_btn_img.classList.toggle("display-none")
        }
    }

    // Realizar busqueda | Evento al presionar [Enter]
    if (event.code == "Enter" && text){
        search_bar.blur();
        REQ_TYPE ="gifs";                // gifs | stickers
        REQUEST = "search";              // trending | search
        Q =`${text}`;                    // Búsqueda usuario
        LIMIT = 12;                      // Cant gifos to get
        OFFSET = 0;
        gifosList = [];
        URL = `${API_URL}/${REQ_TYPE}/${REQUEST}?api_key=${API_KEY}&q=${Q}&offset=${OFFSET}&limit=${LIMIT}`
        gifosResults = await search(URL);
        console.log("gifosList before: ", gifosList)
        gifosList = [gifosResults];
        results_container.innerHTML = '';
        insertGifos (gifosResults, results_container, notFoundResultsSearchTemplate, viewMore_btn_results)
        console.log("gifosResults[] :: ", gifosResults);
        console.log("gifosList[] after :: ", gifosList);
        subsection_results_title.textContent = Q;
        subsection_results.classList.remove("display-none");
    }
}

 
search_bar.addEventListener("click", (event)=>{
    // Evento al entrar a la barra de busqueda
    search_bar.addEventListener("keyup", toSearch)
})
// Borrar contenido de barra de busqueda
close_btn_img.addEventListener("click", (event)=>{
    search_bar.value = ""
    close_btn_img.classList.add("display-none");
    search_btn_img.classList.remove("display-none");
})


// view_more_results_section_btn.addEventListener("click", (event)=>{
//     console.log('hola!')
// })


// FUNCIONALIDAD Botón VER-MÁS==============================================================
// const search_btn = document.getElementById("search_btn")
// matriz | array
function findFavs(array, id, matriz=false){
    var result = {};
    if (id===undefined) return {msg: "id param not contain valid value"}
    if (matriz===true){
        for (i=0; i<array.length; i++){
            result = array[i].find(e => e.id === `${id}`)
            if(result){
                break
            }
        }
    } else {
        result = array.find(e => e.id === `${id}`)
    }
    return result
}

viewMore_btn_results.addEventListener("click", async (event)=>{
    console.log("ViewMore event")
    OFFSET += 12;
    URL = `${API_URL}/${REQ_TYPE}/${REQUEST}?api_key=${API_KEY}&q=${Q}&offset=${OFFSET}&limit=${LIMIT}`;
    console.log(URL)
    gifosResults = await search(URL);
    console.log("gifosList before viewmore: ", gifosList)
    gifosList.push(gifosResults);
    insertGifos(gifosList[gifosList.length-1], results_container, notFoundResultsSearchTemplate, viewMore_btn_results);
    console.log("gifosList afte viewMore: ", gifosList)

})

// const gifFav = findFavs(gifosList, "wzJ67MJMk6UMM", true)
// console.log("Gifo added to fav array: ", gifFav)

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



// function search (URL, gifosContainer, defaultInsert='', listToStorage=[], listResults=[], viewMoreBtn=default_btn){
//     console.log("MOTA: Fetch starting...")
//     fetch(URL)
//     .then(apiResponse => apiResponse.json())
//     .then(apiResponseJSON => {
//         const data = apiResponseJSON.data;
//         var statusFound = data.length>0;
//         // Storage gifos code or function 
//         data.forEach(gifo => {
//             const gifoData  = {
//                 // Validar contenido en title and id. replace with unknown if require
//                 id: gifo.id,
//                 title:  gifo.title,
//                 author:  gifo.username,     //username
//                 medias : {
//                     gif :  gifo.images.original.url,
//                     mp4: gifo.images.original.mp4,
//                     webp: gifo.images.original.webp,
//                     giphy: gifo.url
//                 }
//             }
//             listResults.push(gifoData);
//             listToStorage.push(gifoData);
//         });
//         console.log("Lista[]: ", listToStorage, typeof listToStorage, listToStorage.length)
//         console.log("listResults[]: ", listResults, typeof listResults, listResults.length)
//         // Insert gifos in page code or function
//         // insertGifos(listResults, gifosContainer, statusFound, defaultInsert,  viewMoreBtn);
//         console.log("NOTA: Fetch finished succesfully!")
//         return data;
//     })
//     .catch(error => console.error(error))
// }

// window.onload = onloadExe = async () =>{
//     console.log("onload excecute")
//     REQ_TYPE ="gifs";                // gifs | stickers
//     REQUEST = "trending";            // trending | search
//     LIMIT = 12;                      // Cant gifos to get
//     OFFSET = 0;
//     URL = `${API_URL}/${REQ_TYPE}/${REQUEST}?api_key=${API_KEY}&offset=${OFFSET}&limit=${LIMIT}`
//     // Load trends in carrusel
//     var listReturned = [];
//     listReturned.push(await search(URL,carrusel, '', gifosTrends, myGifos));   
// } 