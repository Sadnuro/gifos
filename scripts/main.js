// INICIO | CAMBIO ENTRE SECCIONES DESDE MENÚ ======================================================
// =================================================================================================
const body = document.querySelector("body");
const html_doc = document.getElementsByTagName("HTML")[0]

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
const container_favs_gifs_id = document.querySelector("#container-favs-gifs");
const container_section_mis_gifos_id = document.querySelector("#container-section-mis-gifos");
const container_mis_gifos = document.querySelector(".container-mis-gifos");     // Contenedor de gifos
const create_gifos_section_id = document.querySelector("#create-gifos-section");
const carrusel_section_id = document.querySelector("#carrusel-section");

var genericList = [];
function validateClassList (validate, classList) {
    /* input:
            validate: name class to search in class list from element
            classList: class list of element to check if have the class
        Output: 
            true or false: element have or not have the class
    */
    let classListCleaned = [];
    for (const i of classList) {    // guarda clases y omite metadatos
        classListCleaned.push(i)
    }
    for (const key in classListCleaned) { // Se recorren las clases, ya no hay metadatos
        if (Object.hasOwnProperty.call(classListCleaned, key)) {
            const element = classListCleaned[key];
            if (element === validate){
                return true
            }
        }
    }
    return false
}

// DARK AND LIGHT THEME MODE =====================================================================================
if (localStorage.getItem("THEME")===null) {
    // THEME = "LIGHT" // DARK | LIGHT
    localStorage.setItem("THEME", "LIGHT")
    mode_btn.textContent = "Modo nocturno";
    mode_btn_dkt.textContent = "MODO NOCTURNO";
    body.classList.remove("dark-mode");
} else if (localStorage.getItem("THEME")==="DARK") {
    mode_btn.textContent = "Modo diurno";
    mode_btn_dkt.textContent = "MODO DIURNO";
    if (validateClassList("dark-mode", body.classList)!==true){
        body.classList.add("dark-mode");
    }
} else if (localStorage.getItem("THEME")==="LIGHT"){
    mode_btn.textContent = "Modo nocturno";
    mode_btn_dkt.textContent = "MODO NOCTURNO";
    if (validateClassList("dark-mode", body.classList)==true){
        body.classList.remove("dark-mode");
    }
}

console.log(localStorage.getItem("THEME"))

const details = document.getElementById("detailsMenu")
mode_btn.addEventListener ("click", (event)=>{
    // console.log("CLICK MODE_BTN")
    details.removeAttribute("open")         // Cierra el menú
    body.classList.toggle("dark-mode")
    localStorage.getItem("THEME")==="LIGHT" ? localStorage.setItem("THEME", "DARK") : localStorage.setItem("THEME", "LIGHT");
    mode_btn.textContent == "Modo nocturno" ? mode_btn.textContent ="Modo diurno" : mode_btn.textContent ="Modo nocturno";
    mode_btn_dkt.textContent == "MODO NOCTURNO" ? mode_btn_dkt.textContent ="MODO DIURNO" : mode_btn_dkt.textContent ="MODO NOCTURNO";
})

mode_btn_dkt.addEventListener ("click", (event)=>{
    // console.log("CLICK MODE_BTN_DKT")
    details.removeAttribute("open")         // Cierra el menú
    body.classList.toggle("dark-mode")
    localStorage.getItem("THEME")==="LIGHT" ? localStorage.setItem("THEME", "DARK") : localStorage.setItem("THEME", "LIGHT");
    mode_btn.textContent == "Modo nocturno" ? mode_btn.textContent ="Modo diurno" : mode_btn.textContent ="Modo nocturno";
    mode_btn_dkt.textContent == "MODO NOCTURNO" ? mode_btn_dkt.textContent ="MODO DIURNO" : mode_btn_dkt.textContent ="MODO NOCTURNO";
})

// SWITCH BETWEEN MENU SECTIONS WITH BUTTONS ====================================================================

var activeSection = "inicio"
const toggleSections = (event)=>{
    const clase = event.target.classList[0];
    if (clase === "inicio-btn" && activeSection!=="inicio") {
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
        search_section_id.classList.toggle("display-none");
        // search_section_id.classList.toggle("display-none") // search-section
        activeSection = "inicio"

    } else if (clase === "favorites-btn" && activeSection!=="favorites") {
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
        }

        create_gifos_section_id.classList.toggle("display-none");
        activeSection = "create-gifos"
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
const notFoundFavsGifs = `
<div class="defaultFavs">
    <div class="img"></div>
    <p>¡Guarda tu primer GIFO en favoritos para que se muestre aquí!</p>
</div>
`
const notFoundMyGifs = `
<div class="defaultMyGifs">
    <div class="img"></div>
    <p>¡Anímate a crear tu primer GIFO! <br>(Usa la versión de escritorio)</p>
</div>
`


container_mis_gifos.innerHTML = notFoundMyGifs;

function initLocalStorageMyGifo(){
    if (localStorage.getItem("myGifosId")==null || localStorage.getItem("myGifosId")==undefined){
        localStorage.setItem("myGifosId", myGifosId);
    }
}
function initLocalStorageFavGifo(){
    if (localStorage.getItem("favGifosId")==null || localStorage.getItem("favGifosId")==undefined){
        localStorage.setItem("favGifosId", gifosFavoritesId);
    }
}

let subArray = [];
let offsetFavs = 0;
let offsetMyGifos =0;
// init | end
let favPageHistory = [0, 12];
let myGifosPageHistory = [0, 12];

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
    
    // Recopilar gifos de LocalStorage
    initLocalStorageFavGifo();
    

    console.log(activeSection); // favorites
    container_favs_gifs_id.innerHTML='';
    insertGifos(gifosFavorites, container_favs_gifs_id, notFoundFavsGifs, viewMore_btn_favs, true)

})
favorites_btn_dkt.addEventListener("click", async (event)=>{
    toggleSections(event);
    details.removeAttribute("open");         // Cierra el menú
    // addIframe()                          // Recopilar gifos de LocalStorage

    initLocalStorageFavGifo();
    gifosFavoritesId = getLocalArray("favGifosId");
    if(gifosFavoritesId.length>0){
        gifosFavorites = await searchGifosById(gifosFavoritesId);
    } else {
        gifosFavorites = [];
    }

    console.log(activeSection); // favorites
    container_favs_gifs_id.innerHTML='';
    insertGifos(gifosFavorites, container_favs_gifs_id, notFoundFavsGifs, viewMore_btn_favs, true)
})
mis_gifos_btn.addEventListener("click", async (event)=>{
    toggleSections(event);
    details.removeAttribute("open");         // Cierra el menú
    console.log(activeSection);              // Recopilar gifos de LocalStorage

    initLocalStorageMyGifo();
    gifosFavorites = getLocalArray("favGifosId");
    // Fetch al id de los gifos en localStorage
    // El array resultado insertarlo en la sección
    const idLocalStorage =  JSON.parse(localStorage.getItem("myGifosId"));

    const myGifos = await searchGifosById(idLocalStorage);
    container_mis_gifos.innerHTML = '';
    insertGifos(Array.from(myGifos), container_mis_gifos, notFoundMyGifs, viewMore_btn_misGifos, false, 1)
})
mis_gifos_btn_dkt.addEventListener("click", async (event)=>{
    toggleSections(event);
    details.removeAttribute("open");         // Cierra el menú
    console.log(activeSection);              // Recopilar gifos de LocalStorage

    // Fetch al id de los gifos en localStorage
    // El array resultado insertarlo en la sección
    initLocalStorageMyGifo();
    const idLocalStorage =  JSON.parse(localStorage.getItem("myGifosId"));

    const myGifos = await searchGifosById(idLocalStorage);
    container_mis_gifos.innerHTML = '';
    insertGifos(Array.from(myGifos), container_mis_gifos, notFoundMyGifs, viewMore_btn_misGifos, false, 1)
})
create_gifos_btn.addEventListener("click", (event)=>{
    toggleSections(event);
    details.removeAttribute("open");
    console.log(activeSection);

})
console.log(activeSection);

// CONTROL DE HOVER DE GIFO ======================================================
// ===============================================================================
function getLocalArray(itemListName){
    let localArrayString = localStorage.getItem(itemListName);
    let localArray = [];
    if (localArrayString!=''){
        localArray = JSON.parse(localArrayString);
    } 
    return localArray;
}
async function addToFav (imgId){
    console.log("id to insert:", imgId);

    initLocalStorageFavGifo();
    localArray = getLocalArray("favGifosId");
    gifosFavoritesId = [imgId].concat(localArray);

    localStorage.setItem("favGifosId", JSON.stringify(gifosFavoritesId));

    gifosFavorites = await searchGifosById(gifosFavoritesId);

    container_favs_gifs_id.innerHTML='';
    insertGifos(gifosFavorites, container_favs_gifs_id, notFoundFavsGifs, viewMore_btn_favs, true)
}
async function removeToFav (imgId){
    console.log("id to delete:", imgId);

    localArray = getLocalArray("favGifosId");
    if (localArray.length>0){
        const index = localArray.findIndex(id => id == imgId)
        console.log("index to delete:", index)
        if (index>=0){
            localArray.splice(index, 1)
            gifosFavoritesId = localArray;
            localStorage.setItem("favGifosId", JSON.stringify(gifosFavoritesId));

            if(gifosFavoritesId.length>0){
                gifosFavorites = await searchGifosById(gifosFavoritesId);
            } else {
                gifosFavorites = [];
            }
            container_favs_gifs_id.innerHTML='';
            insertGifos(gifosFavorites, container_favs_gifs_id, notFoundFavsGifs, viewMore_btn_favs, true)
        }    
    }
}

// Modal for desktop version
var normalTemplate = "";
var elementFigure = null;


function focusedElement(figureElement) { // element == <figure>
    const widthScreen = screen.width;
    const innerWidth = window.innerWidth;

    const img = figureElement.querySelector(".img-gif");
    const title = figureElement.querySelector("#title")
    const author = figureElement.querySelector("#author")
    const btn_fav = figureElement.querySelector(".buttons #btn-fav")
    const btn_download = figureElement.querySelector(".buttons #btn-download")
    const btn_modal = figureElement.querySelector(".buttons #btn-max")
    const btn_delete = figureElement.querySelector(".btn-delete")
    // btn_fav.setAttribute("fav", "true")
    var btn_insert = btn_fav.outerHTML;
    // <div class="modal-btn btn-fav hover-btns" ></div>
    var templatePreview = ``
    const container_preview = document.querySelector(".preview")
    var modal_btn_download;

    //   MODAL DESKTOP FUNCTION =========================================================
    if (window.innerWidth>670 && figureElement.getAttribute("statusdktp")==="false"){ // Ancho de documento en [px]
        btn_modal.addEventListener("click", (event)=>{
            event.stopPropagation();    
            btn_insert = btn_fav.outerHTML;
            templatePreview = `
                    <div class="modal-btn btn-close hover-btns"></div>
                    <div class="modal-preview">
                        <img class="GIF img-gif" id=${img.id} src=${img.src} alt=${title.textContent} >
                    </div>
                    <div class="container-btns-info">
                        <div class="container-info">
                            <p class="author">${author.textContent}</p>
                            <h3 class="title">${title.textContent}</h3>
                        </div>
                        ${btn_insert}
                        <div class="modal-btn btn-download hover-btns"></div>
                    </div>
                `
            container_preview.innerHTML = templatePreview
            modal_btn_download = document.querySelector(".preview .btn-download");
            container_preview.classList.remove("display-none")
    
            const btn_close = document.querySelector(".btn-close")
            btn_close.addEventListener("click", (event)=>{
                event.stopPropagation();
                container_preview.classList.add("display-none");
            })
            const btn_fav_preview = document.querySelector(".preview #btn-fav")
            // inicio | favorites | mis-gifos
            // Add gif to fav -> preview
            btn_fav_preview.addEventListener("click", (event)=>{
                event.stopPropagation();
                if (btn_fav.getAttribute("fav")=="false"){
                    btn_fav.setAttribute("fav" , "true")
                    btn_fav_preview.setAttribute("fav" , "true")
                    addToFav(img.id);
                } else {
                    btn_fav.setAttribute("fav" , "false")
                    btn_fav_preview.setAttribute("fav" , "false")
                    removeToFav(img.id);
                }
            })
    
            modal_btn_download.addEventListener("click", (event)=>{
                const imagen = event.target.parentElement.previousElementSibling.firstElementChild;
                event.stopPropagation();
                downloadGif(img.src, `${img.alt}.gif`);
            })
        })
        // Add gif to fav -> hover desktop
        btn_fav.addEventListener("click", (event)=>{
            event.stopPropagation();
            if (btn_fav.getAttribute("fav")=="false"){
                btn_fav.setAttribute("fav" , "true")
                addToFav(img.id);
            } else {
                btn_fav.setAttribute("fav" , "false")
                removeToFav(img.id);
            }
        })
    
        btn_download.addEventListener("click", (event)=>{
            event.stopPropagation();
            downloadGif(img.src, `${img.alt}.gif`);
        })
        figureElement.setAttribute("statusdktp", "true");

    } else if (window.innerWidth<=670 && figureElement.getAttribute("statusmobile")==="false"){
        figureElement.addEventListener("click", (event)=>{
            event.stopPropagation();
            btn_insert = btn_fav.outerHTML;
            templatePreview = `
                <div class="modal-btn btn-close hover-btns"></div>
                <div class="modal-preview">
                    <img class="GIF img-gif" id=${img.id} src=${img.src} alt=${title.textContent} >
                </div>
                <div class="container-btns-info">
                    <div class="container-info">
                        <p class="author">${author.textContent}</p>
                        <h3 class="title">${title.textContent}</h3>
                    </div>
                    ${btn_insert}
                    <div class="modal-btn btn-download hover-btns"></div>
                </div>
            `
    
            container_preview.innerHTML = templatePreview;
            container_preview.classList.remove("display-none");

            const btn_close = document.querySelector(".btn-close")
            btn_close.addEventListener("click", (event)=>{
                event.stopPropagation();
                container_preview.classList.add("display-none");
            })
            const btn_fav_preview = document.querySelector(".preview #btn-fav")
            // Add gif to fav -> mobile
            btn_fav_preview.addEventListener("click", (event)=>{
                event.stopPropagation();
                if (btn_fav.getAttribute("fav")=="false"){
                    btn_fav.setAttribute("fav" , "true")
                    btn_fav_preview.setAttribute("fav" , "true")
                    addToFav(img.id);
                } else {
                    btn_fav.setAttribute("fav" , "false")
                    btn_fav_preview.setAttribute("fav" , "false")
                    removeToFav(img.id);
                }
            })
            btn_download_mobile = document.querySelector(".preview .container-btns-info .btn-download");
            btn_download_mobile.addEventListener("click", (event)=>{
                event.stopPropagation();
                downloadGif(img.src, `${img.alt}.gif`);
            })
        })
        figureElement.setAttribute("statusmobile", "true")
    }
}

// Desplazamiento de carrusel con botones
const carrusel_btn_left = document.querySelector("#carrusel-btn-left");
const carrusel_btn_right = document.querySelector("#carrusel-btn-right");
carrusel_btn_right.addEventListener("click", (event)=>{
    carrusel.scrollLeft += 300;
})
carrusel_btn_left.addEventListener("click", (event)=>{
    carrusel.scrollLeft -= 300;
})