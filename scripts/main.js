var CARRUSEL_GIFOS = []
var SEARCHES_GIFOS = []
var FAVORITES_GIFOS = []
var MY_GIFOS = []

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

// DARK AND LIGHT THEME MODE =====================================================================================
// =========================================================================================================

console.log(mode_btn, mode_btn_dkt)
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

// SWITCH BETWEEN MENU SECTIONS WITH BUTTONS ====================================================================
// ===================================================================================================================

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

// FIN | SWITCH BETWEEN MENU SECTIONS  ==================================================================
// ==========================================================================================================



// CONTROL DE HOVER DE GIFO ======================================================
// ===============================================================================

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