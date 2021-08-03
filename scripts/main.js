
const gifosForTest = [
    {
        "id": "mf8UbIDew7e8g",
        "title": "Climate Change Earth GIF",
        "author": "uknown",
        "url": "https://media.giphy.com/media/mf8UbIDew7e8g/giphy.gif"
    },
    {
        "id": "3o7WIB00yXujVt4WEo",
        "title": "Earth GIF by MOODMAN",
        "author": "uknown",
        "url": "https://media.giphy.com/media/3o7WIB00yXujVt4WEo/giphy.gif"
    },
    {
        "id": "l1KVcrdl7rJpFnY2s",
        "title": "Mother Earth World GIF by eyedesyn",
        "author": "eyedesyn",
        "url": "https://media.giphy.com/media/l1KVcrdl7rJpFnY2s/giphy.gif"
    },
    {
        "id": "26tP7vexsaMrS4UpO",
        "title": "David Attenborough Wow GIF by BBC Earth",
        "author": "bbcearth",
        "url": "https://media.giphy.com/media/26tP7vexsaMrS4UpO/giphy.gif"
      },
    {
        "id": "3o6YgoY0GU0Yah2ujK",
        "title": "Pizza Time Rex GIF by GIPHY Studios Originals",
        "author": "studiosoriginals",
        "url": "https://media.giphy.com/media/3o6YgoY0GU0Yah2ujK/giphy.gif"
    }
]



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

var CARRUSEL_GIFOS = []
var SEARCHES_GIFOS = []
var FAVORITES_GIFOS = []
var MY_GIFOS = []

// template = ` // DEPRECATED TEMPLATE FOR GIFO
// <figure class="figure-gifo" onmouseover="focusedElement(this)" status="false">
//     <img id="0001-gifo" class="GIF img-gif" src="https://media2.giphy.com/media/R97jJCEGEmh0I/giphy.gif?cid=9039c678ca0c65q1ul8l281nf22l760bm4e99k6mebm3x4jp&rid=giphy.gif&ct=g" alt="" >
//     <div class="capa">
//         <div class="buttons">
//             <div class="btn" id="btn-a">A</div>
//             <div class="btn" id="btn-b">B</div>
//             <div class="btn" id="btn-c">C</div>
//         </div>
//         <h3>Master Chief</h3>
//         <p>Lorem ipsum dolor sit, adipisicing elit.</p>
//     </div>
// </figure>
// `






// INICIO | CAMBIO ENTRE SECCIONES DESDE MENÚ ======================================================
// =================================================================================================
const body = document.querySelector("body");
const mode_btn = document.getElementById("mode-btn");
const mode_btn_dkt = document.getElementById("mode-btn-dkt");
const inicio_btn = document.getElementById("inicio-btn");
const inicio_btn_dkt = document.getElementById("inicio-btn-dkt");
const favorites_btn = document.getElementById("favorites-btn");
const favorites_btn_dkt = document.getElementById("favorites-btn-dkt");
const mis_gifos_btn = document.getElementById("gifos-btn");
const mis_gifos_btn_dkt = document.getElementById("gifos-btn-dkt");
const create_gifos_btn = document.getElementById("create-gifos-btn");

const home_section_id = document.querySelector("#home-section");
const search_section_id = document.querySelector("#search-section");
const subsection_results_id = document.querySelector("subsection-results-div");
const container_section_favs_id = document.querySelector("#container-section-favs");
const container_section_mis_gifos_id = document.querySelector("#container-section-mis-gifos");
const create_gifos_section_id = document.querySelector("#create-gifos-section");
const carrusel_section_id = document.querySelector("#carrusel-section");

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

// DARK AND LIGHT MODE =====================================================================================
// =========================================================================================================


console.log(mode_btn, mode_btn_dkt)
// var THEME = ""
if (localStorage.getItem("THEME")===null) {
    // THEME = "LIGHT" // DARK | LIGHT
    localStorage.setItem("THEME", "LIGHT")
    mode_btn.textContent = "Modo nocturno";
    mode_btn_dkt.textContent = "MODO NOCTURNO";
    body.classList.remove("dark-mode");
} else if (localStorage.getItem("THEME")==="DARK") {
    mode_btn.textContent = "Modo diurno";
    mode_btn_dkt.textContent = "MODO DIURNO";
} else if (localStorage.getItem("THEME")==="LIGHT"){
    mode_btn.textContent = "Modo nocturno";
    mode_btn_dkt.textContent = "MODO NOCTURNO";
}

console.log(localStorage.getItem("THEME"))

const details = document.getElementById("detailsMenu")
mode_btn.addEventListener ("click", (event)=>{
    console.log("CLICK MODE_BTN")
    details.removeAttribute("open")         // Cierra el menú
    body.classList.toggle("dark-mode")
    localStorage.getItem("THEME")==="LIGHT" ? localStorage.setItem("THEME", "DARK") : localStorage.setItem("THEME", "LIGHT");
    mode_btn.textContent == "Modo nocturno" ? mode_btn.textContent ="Modo diurno" : mode_btn.textContent ="Modo nocturno";
    mode_btn_dkt.textContent == "MODO NOCTURNO" ? mode_btn_dkt.textContent ="MODO DIURNO" : mode_btn_dkt.textContent ="MODO NOCTURNO";
})

mode_btn_dkt.addEventListener ("click", (event)=>{
    console.log("CLICK MODE_BTN_DKT")
    details.removeAttribute("open")         // Cierra el menú
    body.classList.toggle("dark-mode")
    localStorage.getItem("THEME")==="LIGHT" ? localStorage.setItem("THEME", "DARK") : localStorage.setItem("THEME", "LIGHT");
    mode_btn.textContent == "Modo nocturno" ? mode_btn.textContent ="Modo diurno" : mode_btn.textContent ="Modo nocturno";
    mode_btn_dkt.textContent == "MODO NOCTURNO" ? mode_btn_dkt.textContent ="MODO DIURNO" : mode_btn_dkt.textContent ="MODO NOCTURNO";
})

// const addIframe = () => {
//     templateFavorites = `
//         <iframe id="iframe-fav-sect" src="./favorites.html" frameborder="0"></iframe>
//     `
//     document.querySelector("#container-section-favs").innerHTML =   templateFavorites
// }



var activeSection = "inicio"
const toggleSections = (event)=>{
    console.log(event.target)

    const clase = event.target.classList[0];

    if (clase === "inicio-btn" && activeSection!=="inicio") {
        console.log(clase)
        sectionToHidden1 = "container_section_favs"
        // ocultar: favoritos, mis gifos
        if  (validateClassList("display-none", container_section_favs_id.classList)!=true) {
            container_section_favs_id.classList.toggle("display-none")
        }
        if  (validateClassList("display-none", container_section_mis_gifos_id.classList)!=true) {
            container_section_mis_gifos_id.classList.toggle("display-none")
        }
        if(validateClassList("display-none", create_gifos_section_id.classList)!=true){
            create_gifos_section_id.classList.toggle("display-none");
        }
        if (validateClassList("display-none", carrusel_section_id.classList)==true){
            carrusel_section_id.classList.toggle("display-none");
        }
        // mostrar secciones de inicio
        home_section_id.classList.toggle("display-none") //home-section
        // search_section_id.classList.toggle("display-none") // search-section
        activeSection = "inicio"

    } else if (clase === "favorites-btn" && activeSection!=="favorites") {
        console.log(clase)
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
        if(validateClassList("display-none", create_gifos_section_id.classList)!=true){
            create_gifos_section_id.classList.toggle("display-none");
        }
        if (validateClassList("display-none", carrusel_section_id.classList)==true){
            carrusel_section_id.classList.toggle("display-none");
        }
        //mostrar favorites sections
        container_section_favs_id.classList.toggle("display-none")

        activeSection = "favorites"
    }
    else if (clase === "gifos-btn" && activeSection!=="mis-gifos" ) {
        console.log(clase)
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
        if(validateClassList("display-none", create_gifos_section_id.classList)!=true){
            create_gifos_section_id.classList.toggle("display-none");
        }
        if (validateClassList("display-none", carrusel_section_id.classList)==true){
            carrusel_section_id.classList.toggle("display-none");
        }
        // Mostrar mis-gifos section
        container_section_mis_gifos_id.classList.toggle("display-none")
        activeSection = "mis-gifos"
    } else if (clase==="create-gifos-btn" && activeSection!="create-gifos") {
        console.log(clase);
        if  (validateClassList("display-none", home_section_id.classList)!=true) {
            home_section_id.classList.toggle("display-none")
        }
        if  (validateClassList("display-none", search_section_id.classList)!=true) {
            search_section_id.classList.toggle("display-none")
        }
        if  (validateClassList("display-none", container_section_favs_id.classList)!=true) {
            container_section_favs_id.classList.toggle("display-none")
        }
        if  (validateClassList("display-none", container_section_mis_gifos_id.classList)!=true) {
            container_section_mis_gifos_id.classList.toggle("display-none")
        }
        if (validateClassList("display-none", carrusel_section_id.classList)!=true){
            carrusel_section_id.classList.toggle("display-none");
            console.log(carrusel_section_id.classList);
        }

        create_gifos_section_id.classList.toggle("display-none");
        activeSection = "create-gifos"
    }
}
// console.log(carrusel_section);

/*  Modificar estado de desplegable details
    Se agrega un atributo al elemento details cuyo nombre será 'open' o 'close'
    y determinarán el estado del mismo, el contenido del atributo no es relevante
    
    details.setAttribute("open", "") | details.setAttribute("close", "")

    Al estar desplegado <details> se le agrega el atributo open
    para cerrar el details removeremos el atributo cuando ocurra algun evento:
    details.removeAttribute("open")
*/

inicio_btn.addEventListener("click", (event)=>{
    toggleSections(event);
    details.removeAttribute("open")  ;       // Cierra el menú
    console.log(activeSection); // inicio
})
inicio_btn_dkt.addEventListener("click", (event)=>{
    toggleSections(event);
    details.removeAttribute("open");        // Cierra el menú
    console.log(activeSection); // inicio
})
favorites_btn.addEventListener("click", (event)=>{
    toggleSections(event);
    details.removeAttribute("open");         // Cierra el menú
    // addIframe()                          // Recopilar gifos de LocalStorage
    console.log(activeSection); // favorites
})
favorites_btn_dkt.addEventListener("click", (event)=>{
    toggleSections(event);
    details.removeAttribute("open");         // Cierra el menú
    // addIframe()                          // Recopilar gifos de LocalStorage
    console.log(activeSection); // favorites
})
mis_gifos_btn.addEventListener("click", (event)=>{
    toggleSections(event);
    details.removeAttribute("open");         // Cierra el menú
    console.log(activeSection);              // Recopilar gifos de LocalStorage
})
mis_gifos_btn_dkt.addEventListener("click", (event)=>{
    toggleSections(event);
    details.removeAttribute("open");         // Cierra el menú
    console.log(activeSection);              // Recopilar gifos de LocalStorage
})
create_gifos_btn.addEventListener("click", (event)=>{
    toggleSections(event);
    details.removeAttribute("open");
    console.log(activeSection);

})
console.log(activeSection);

// FIN | CAMBIO ENTRE SECCIONES DESDE MENÚ ==================================================================
// ==========================================================================================================



// GENERAR BUSQUEDA DE GIFO ================================================================================
// Incluye: Busqueda y tendencias ==========================================================================

// Generar busqueda de GIf al presionar [Enter]
const search_bar = document.querySelector("input#search-bar")
const search_btn_img = document.querySelector("#search-btn-img")
const close_btn_img = document.querySelector("#close-btn-img")
// topicToSearch
const searchTopicGifos = (topicToSearch)=>{
    console.log(`Search ${topicToSearch}`)
    // Fecth
    // Include results in page
}

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
    // Evento al entrar a la barra de busqueda
    search_bar.addEventListener("keyup", toSearch)
})

// Borrar contenido de barra de busqueda
close_btn_img.addEventListener("click", (event)=>{
    search_bar.value = ""
})

// Generar busqueda a partir de palabras tendencias
var trends_words = document.querySelectorAll(".trend-word");
const tw_1 = document.querySelector(".tw-1")

for (var i=0; i<trends_words.length; i++){
    trends_words[i].addEventListener("click", (event)=>{
        searchTopicGifos(event.target.textContent);
    });
}


// FUNCIONALIDAD Botón VER-MÁS==============================================================
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



// CONTROL DE HOVER DE GIFO ======================================================
// ===============================================================================

// Modal for mobile version
// document.querySelectorAll(".modal-container img").forEach(gifo => {
//     gifo.addEventListener("click", function (event){
//         event.stopPropagation();
//         console.log("click sobre gifo")
//         // Agrega clase .active al contenedor de cada img (.modal-container)
//         this.parentNode.classList.add("active")
//     })
// })

// document.querySelectorAll(".modal-container").forEach(modal_container => {
//     modal_container.addEventListener("click", function(event){
//         this.classList.remove("active")
//     })
// })

// function preview(element, )

// Modal for desktop version
var normalTemplate = "";
var elementFigure = null;

function focusedElement(element) { // element == <figure>
    const widthScreen = screen.width;
    const innerWidth = window.innerWidth;
    // console.log("Width screen: ", widthScreen)
    // console.log("Windoe Width: ", innerWidth)

    console.log("Show hover")
    const img = element.firstElementChild.firstElementChild
    const title = element.lastElementChild.lastElementChild
    const author = element.lastElementChild.firstElementChild.nextElementSibling
    const btn_fav = element.lastElementChild.firstElementChild.firstElementChild
    const btn_download = element.lastElementChild.firstElementChild.firstElementChild.nextElementSibling
    const btn_modal = element.lastElementChild.firstElementChild.lastElementChild

    var templatePreview = `
    <div class="modal-btn btn-close hover-btns"></div>
    <img src=${img.src} alt=${title.textContent}>
    <div class="container-btns-info">
        <div class="container-info">
            <p class="author">${author.textContent}</p>
            <h3 class="title">${title.textContent}</h3>
        </div>
        <div class="modal-btn btn-fav hover-btns"></div>
        <div class="modal-btn btn-download hover-btns"></div>
    </div>
    `
    const container_preview = document.querySelector(".preview")
    //   MODAL DESKTOP FUNCTION =========================================================
    if (window.innerWidth>670 && element.getAttribute("statusdktp")==="false"){ // Ancho de documento en [px]
        btn_modal.addEventListener("click", (event)=>{
            event.stopPropagation();    
            console.log("HTML ELEMENT IMG:", img)
            console.log("GIFO TITLE: ", title)
            console.log("GIFO AUTHOR: ", author)
            container_preview.innerHTML = templatePreview
            container_preview.classList.remove("display-none")
    
            const btn_close = document.querySelector(".btn-close")
            btn_close.addEventListener("click", (event)=>{
                event.stopPropagation();
                container_preview.classList.add("display-none");
            })
        })
        element.setAttribute("statusdktp", "true");

    } else if (window.innerWidth<=670 && element.getAttribute("statusmobile")==="false"){
        element.addEventListener("click", (event)=>{
            console.log("HTML ELEMENT IMG:", img)
            console.log("GIFO TITLE: ", title)
            console.log("GIFO AUTHOR: ", author)
    
            container_preview.innerHTML = templatePreview;
            container_preview.classList.remove("display-none");

            const btn_close = document.querySelector(".btn-close")
            btn_close.addEventListener("click", (event)=>{
                container_preview.classList.add("display-none");
            })
        })

        element.setAttribute("statusmobile", "true")
    }

    // activeSection
        // gifListSection.find.id
            // Get Name
            // Get Author 
            // Get other required
        // Insert properties in capa hover

    // element.setAttribute("status", "true")  // Debe setearlo el metodo que inserte gifos
}

function unfocusedElement (element){
    if (element.getAttribute("status")==="true") {
        console.log("Remove hover")
        // element.setAttribute("status", "false") 
        // element.innerHTML = normalTemplate
    }
}


// Desplazamiento de carrusel con botones
const carrusel_btn_left = document.querySelector("#carrusel-btn-left");
const carrusel_btn_right = document.querySelector("#carrusel-btn-right");
carrusel_btn_right.addEventListener("click", (event)=>{
    console.log(event);
    carrusel.scrollLeft += 300;
})
carrusel_btn_left.addEventListener("click", (event)=>{
    console.log(event);
    carrusel.scrollLeft -= 300;
})






// GIFOS TEMPLATE GENERIC FOR ALL SECTIONS ======================

/*
<figure class="figure-gifo" onmouseover="focusedElement(this)" status="false">
    <div class="modal-container">
        <img id="0001-gifo" class="GIF img-gif" src="https://media2.giphy.com/media/R97jJCEGEmh0I/giphy.gif?cid=9039c678ca0c65q1ul8l281nf22l760bm4e99k6mebm3x4jp&rid=giphy.gif&ct=g" alt="" >
    </div>
    <div class="capa">
        <div class="buttons">
            <div class="btn-fav hover-btns" id="btn-a">A</div>
            <div class="btn-download hover-btns" id="btn-b">B</div>
            <div class="btn-max hover-btns" id="btn-c">C</div>
        </div>
        <p>@AuthorGif 1</p>
        <h3>Master Chief Title 1</h3>
    </div>
</figure>
*/


// HOVER TEMPLATE =================================
/*
hoverTemplate = `
<figure class="figure-gifo" onmouseover="focusedElement(this)" status="false">
    <img id="0001-gifo" class="GIF img-gif" src="https://media2.giphy.com/media/R97jJCEGEmh0I/giphy.gif?cid=9039c678ca0c65q1ul8l281nf22l760bm4e99k6mebm3x4jp&rid=giphy.gif&ct=g" alt="" >
    <div class="capa">
        <div class="buttons">
            <div class="btn-fav hover-btns" id="btn-a">A</div>
            <div class="btn-download hover-btns" id="btn-b">B</div>
            <div class="btn-max hover-btns" id="btn-c">C</div>
        </div>
        <p>@AuthorGif</p>
        <h3>Master Chief Title</h3>
    </div>
</figure>
`
*/



// MODAL PREVIEW TEMPLATE ================================
/**
 var templatePreview = `
 <div class="modal-btn btn-close"></div>
 <img src=${img.src} alt=${title.textContent}>
 <div class="container-btns-info">
     <div class="container-info">
         <p class="author">${author.textContent}</p>
         <h3 class="title">${title.textContent}</h3>
     </div>
     <div class="modal-btn btn-fav"></div>
     <div class="modal-btn btn-download"></div>
 </div>
 `
 
 */

// CARRUSEL GIF TEMPLATE ==================================
/*
<g>
    <figure class="figure-gifo" onmouseover="focusedElement(this)" status="false">
        <div class="modal-container">
            <img class="GIF img-gif" src="https://media2.giphy.com/media/Wr8PrRVqnGOLE48FWk/giphy.gif?cid=9039c67842hhv0o0swfod2gvu5rrmxqj55vm5mr4xiyt0v14&rid=giphy.gif&ct=g" alt="" >
        </div>
        <div class="capa">
            <div class="buttons">
                <div class="btn-fav hover-btns" id="btn-a">A</div>
                <div class="btn-download hover-btns" id="btn-b">B</div>
                <div class="btn-max hover-btns" id="btn-c">C</div>
            </div>
            <p>@AuthorGif 1</p>
            <h3>Master Chief Title 1</h3>
        </div>
    </figure>                      
</g>
*/



/*
    *** Desarrollar aplicacion de modo dark and light
    *** Incorporar boton [ver-más] a cada sección
    * Traer tendencia de palabras y ocultar seccion que muestra sus busquedas
    * Desarrollar aplicativo de crear y subir gifo
    * Incorporar comunicacion con API a cada section
*/


// window.pageYOffset
// window.pageXOffset
// window.scrollTo()
// document.documentElement.scrollTop
// document.documentElement.scrollLeft