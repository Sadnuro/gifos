// // https://api.giphy.com/v1/gifs/trending?api_key=oAF6BugvxZqmpPf30UwCOVes8vOpwQEe
// const API_URL = "https://api.giphy.com/v1"
// const API_KEY = "oAF6BugvxZqmpPf30UwCOVes8vOpwQEe"
// let TYPE  = "gifs"                // gifs | stickers
// let REQUEST    = "trending"       // trending | search
// let Q = ""
// let LIMIT = 4
// let OFFSET = 0

// const REQUEST_PROBE = `${API_URL}/${TYPE}/${REQUEST}?api_key=${API_KEY}&limit=${LIMIT}`
// let templateTrending = ""
// let templateSearch = ""

// Theme = "Light" // "Dark"
// localStorage.setItem("Theme", Theme)
// console.log("Hello")



// INICIO | CAMBIO ENTRE SECCIONES DESDE MENÚ ---------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const mode_btn = document.getElementById("mode-btn")
const inicio_btn = document.getElementById("inicio-btn")
const favorites_btn = document.getElementById("favorites-btn")
const mis_gifos_btn = document.getElementById("gifos-btn")

const home_section_id = document.querySelector("#home-section")
const search_section_id = document.querySelector("#search-section")
const container_section_favs_id = document.querySelector("#container-section-favs")
const container_section_mis_gifos_id = document.querySelector("#container-section-mis-gifos")

const addIframe = () => {
    templateFavorites = `
        <iframe id="iframe-fav-sect" src="./favorites.html" frameborder="0"></iframe>
    `
    document.querySelector("#container-section-favs").innerHTML =   templateFavorites
}

function validateClassList (validate, classList) {
/* input:
        validate: name class to search in class list from element
        classList: class list of element to check if have the class
    Output: 
        true or false: element have or not have the class
*/
    classListCleaned = []
    for (const i of classList) {    // guarda clases y omite metadatos
        classListCleaned.push(i)
    }
    for (const key in classListCleaned) { // Se recorren las clases, ya no hay metadatos
        //console.log(classListCleaned)
        //console.log(key)
        if (Object.hasOwnProperty.call(classListCleaned, key)) {
            const element = classListCleaned[key];
            if (element === validate){
                return true
            }
        }
    }
    return false
}

var activeSection = "inicio"
const toggleSections = (event)=>{
    console.log(event.target)

    const id = event.target.id

    if (id === "inicio-btn" && activeSection!=="inicio") {
        console.log(id)
        sectionToHidden1 = "container_section_favs"
        // ocultar: favoritos, mis gifos
        if  (validateClassList("display-none", container_section_favs_id.classList)!=true) {
            container_section_favs_id.classList.toggle("display-none")
        }
        if  (validateClassList("display-none", container_section_mis_gifos_id.classList)!=true) {
            container_section_mis_gifos_id.classList.toggle("display-none")
        }
        // mostrar secciones de inicio
        home_section_id.classList.toggle("display-none") //home-section
        search_section_id.classList.toggle("display-none") // search-section
        activeSection = "inicio"

    } else if (id === "favorites-btn" && activeSection!=="favorites") {
        console.log(id)
        // ocultar home, trends, mis-gifos
        if  (validateClassList("display-none", home_section_id.classList)!=true) {
            home_section_id.classList.toggle("display-none")
        }
        if  (validateClassList("display-none", search_section_id.classList)!=true) {
            search_section_id.classList.toggle("display-none")
        }
        if  (validateClassList("display-none", container_section_mis_gifos_id.classList)!=true) {
            container_section_mis_gifos_id.classList.toggle("display-none")
        }
        //mostrar favorites sections
        container_section_favs_id.classList.toggle("display-none")

        activeSection = "favorites"
    }
    else if (id === "gifos-btn") {
        // ocultar home, trends and favorites
        if  (validateClassList("display-none", home_section_id.classList)!=true) {
            home_section_id.classList.toggle("display-none")
        }
        if  (validateClassList("display-none", search_section_id.classList)!=true) {
            search_section_id.classList.toggle("display-none")
        }
        if  (validateClassList("display-none", container_section_favs_id.classList)!=true) {
            container_section_favs_id.classList.toggle("display-none")
        }
        // Mostrar mis-gifos section
        container_section_mis_gifos_id.classList.toggle("display-none")
        activeSection = "mis-gifos"
    }
}


/*  Modificar estado de desplegable details
    Se agrega un atributo al elemento details cuyo nombre será 'open' o 'close'
    y determinarán el estado del mismo, el contenido del atributo no es relevante
    
    details.setAttribute("open", "") | details.setAttribute("close", "")

    Al estar desplegado <details> se le agrega el atributo open
    para cerrar el details removeremos el atributo cuando ocurra algun evento:
    details.removeAttribute("open")
*/
const details = document.getElementById("detailsMenu")
mode_btn.addEventListener ("click", (event)=>{
    details.removeAttribute("open")         // Cierra el menú
})
inicio_btn.addEventListener("click", (event)=>{
    toggleSections(event)
    details.removeAttribute("open")         // Cierra el menú
    console.log(activeSection) // inicio
})
favorites_btn.addEventListener("click", (event)=>{
    toggleSections(event)
    details.removeAttribute("open")         // Cierra el menú
    // addIframe()                          // Recopilar gifos de LocalStorage
    console.log(activeSection) // favorites
})
mis_gifos_btn.addEventListener("click", (event)=>{
    toggleSections(event)
    details.removeAttribute("open")         // Cierra el menú
    console.log(activeSection)              // Recopilar gifos de LocalStorage
})
console.log(activeSection)

// FIN | CAMBIO ENTRE SECCIONES DESDE MENÚ ---------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


// Generar busqueda de GIf al presionar [Enter]
const search_bar = document.querySelector("input#search-bar")
const search_btn_img = document.querySelector("#search-btn-img")
const close_btn_img = document.querySelector("#close-btn-img")
function toSearch(event){
    // event = metas of key of keyboard
    // element = input that contained of tex to search
    text = search_bar.value.trim()
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

    // Realizar busqueda
    if (event.code == "Enter" && text){
        // Evento al presionar [Enter]
        console.log(text)
        searchTopicGifos(text)
    }
}
search_bar.addEventListener("click", (event)=>{
    // Evento al entrar a la barr
    search_bar.addEventListener("keyup", toSearch)

})

// topicToSearch
const searchTopicGifos = (topicToSearch)=>{
    console.log(`Search ${topicToSearch}`)
    // Fecth
    // Include results in page
}

// Generar busqueda a partir de palabras tendencias
var trends_words = document.querySelectorAll(".trend-word");
const tw_1 = document.querySelector(".tw-1")

for (var i=0; i<trends_words.length; i++){
    trends_words[i].addEventListener("click", (event)=>{
        searchTopicGifos(event.target.textContent);
    });
}


// Botón VER-MÁS ----------------------------------------
// const search_btn = document.getElementById("search_btn")
const view_more_btns = document.querySelectorAll(".view-more-btn") 

const viewMoreFunction = (event, currentSection) => {
    const element = event.target;
    // CurrentSection = inicio | favorites | mis-gifos

    if (currentSection === "inicio"){
        console.log("Show more gifos: seccion inicio")
    } else if (currentSection === "favorites") {
        console.log("Show more gifos: seccion favoritos")
    } else if (currentSection === "mis-gifos") {
        console.log("Show more gifos: seccion mis-gifos")
    }
    console.log(element.id)
}
for (var i=0; i<view_more_btns.length; i++) {
    // console.log(view_more_btns[i])
    view_more_btns[i].addEventListener("click", (event)=>{
        viewMoreFunction(event, activeSection);
    })
}








/*
    * Desarrollar aplicacion de modo dark and light
    * Incorporar boton [ver-más] a cada sección
    * Traer tendencia de palabras y ocultar seccion que muestra sus busquedas
    * Desarrollar aplicativo de crear y subir gifo
    * Incorporar comunicacion con API a cada section
*/