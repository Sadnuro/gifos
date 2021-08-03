// const API_URL = "https://api.giphy.com/v1";
// const API_KEY = "oAF6BugvxZqmpPf30UwCOVes8vOpwQEe";
// let REQ_TYPE ="gifs";                // gifs | stickers
// let REQUEST = "trending";            // trending | search
// let Q ="";                           // Búsqueda usuario
// let LIMIT = 12;                      // Cant gifos to get
// let OFFSET = 0;
// let URL = "";

// // GIFOS storage
// let gifosSearchedList = [];
// let gifosinTrendList = [];

URL = "https://api.giphy.com/v1/gifs/trending?api_key=oAF6BugvxZqmpPf30UwCOVes8vOpwQEe&limit=5";
// URL = `${API_URL}/${REQ_TYPE}/${REQUEST}?api_key=${API_KEY}&q=${Q}&offset=${OFFSET}&limit=${LIMIT}`

var gifosList = [];
var gifosTrends = [];
var gifosFavorites = [];
var myGifos = [];

var gifosResults = [];

// var gifoCarruselTemplate = `
//     <g>
//         ${gifoTemplate}                
//     </g>
// `

const carrusel = document.querySelector(".carrusel");

const gifosTemplate = "";
function insertGifos (gifos, containerGifosElement) {
    gifos.forEach(gifo => {
        gifosTemplate = `
            <g>
                <figure class="figure-gifo" onmouseover="focusedElement(this)" status="false">
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
        containerGifosElement.innerHTML += gifosTemplate;
        console.log(gifosTemplate)
    })
}



function search (URL){
    console.log("Fetch starting...")
    gifosResults = []; //inicializa
    fetch(URL)
    .then(apiResponse => apiResponse.json())
    .then(apiResponseJSON => {
        const data = apiResponseJSON.data;

        // Storage gifos code or function 
        data.forEach(gifo => {
          const gifoData  = {
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
            // gifosResponse.push(gifoData);
            // gifosList.push(gifosResponse) Almacena por lote, cada lote de n gifos en una posicion
            gifosList.push(gifoData);
            gifosResults.push(gifoData)
        });

        // Insert gifos in page code or function
    })
    .catch(error => console.error(error))
}

search(URL);
insertGifos(gifosResults, carrusel);

