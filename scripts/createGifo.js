let initInfo = `
    <h3>Aquí podrás <br> crear tus propios <span class="text-resalt">GIFOS</span></h3>
    <p>¡Crea tu GIFO en solo 3 pasos! <br> (Solo necesitas una cámara para grabar un video)</p>
`

let userMediaAccessInfo = `
    <h3>¿Nos das acceso <br> a tu cámara?</h3>
    <p>El acceso a tu camara será válido sólo<br>por el tiempo en el que estés creando el GIFO.</p>
`
let contentVideo = `
    <video src="" id="video"></video>
`

let previewGif =`
    <img id="gif-img" src="" alt="mygifo.gif">
`
let previewGifCapa = `
    <div id="createGifo-capa" >
    <div class="statusinfo-container">
        <div class="upload status-img" id="upload"></div>
        <p id="status-text">Estamos subiendo tu GIFO</p>
    </div>
    <div class="createGifo-containerBtns">
    </div>
    </div>
`
let gifoSubidoTemplate = `
    <div class="uploaded status-img" id="uploaded"></div>
    <p id="status-text">GIFO subido con éxito</p>
`
let buttons_actions = `
    <div class="btn-download"></div>
    <div class="btn-link"></div>
`
let timelapseTemplate = `
    <p id="timelapse" class="timelapse"></p>
`
let repeatRecordTemplate = `
    <p id="repeatRecordBtn">REPETIR CAPTURA</p>
`

const step1 = document.querySelector(".step1");
const step2 = document.querySelector(".step2");
const step3 = document.querySelector(".step3");

const process_btn = document.querySelector("#process-btn");
const infoDiv = document.querySelector(".info");
let video = document.createElement('video');
let img = document.createElement('img');
const timelapse_container = document.querySelector(".timelapse-container");
let timelapse = document.createElement('p');
let repeatRecordBtn;
let createGifoCapa;

let status = "NONE"
let streamSignal;
let recording;
let gif;
let gifId = "";

 // Id asignado al gifo subido
 secondsCounter = 0;
 minutesCounter = 0;
 seconds = '00';
 minutes = '00'

function initCreateGifosSection() {
    console.log("Clear section")
    infoDiv.innerHTML = initInfo;
    process_btn.textContent = "CONTINUAR";

    timelapse = document.createElement('p');
    repeatRecordBtn = null;
    createGifoCapa = null;

    streamSignal = null;
    recording = null;
    gif = null;

    video.remove();
    img.remove();

    step1.removeAttribute("data-active")
    step2.removeAttribute("data-active")
    step3.removeAttribute("data-active")

    clearChronos();
}

// create_gifos_btn.onclick = initCreateGifosSection();
create_gifos_btn.addEventListener("click", (event)=>{
    if(status!="UPLOAD"){
        process_btn.classList.remove("display-none");
        initCreateGifosSection();
    }
})

function clearChronos(){
    secondsCounter = 0;
    minutesCounter = 0;
    seconds = '00';
    minutes = '00';
    timelapse.textContent = minutes + ':' + seconds;
}

// clearChronos();
// initCreateGifosSection();

function chronos(){
    if (process_btn.textContent==="FINALIZAR") {
        
        secondsCounter +=1;

        if (secondsCounter >=60){
            secondsCounter = 0;
            minutesCounter +=1;

            if (minutesCounter>=60){
                minutesCounter = 0;
            }
            minutesCounter<10? minutes = '0' + minutesCounter : minutes=minutesCounter;
        }
        secondsCounter<10? seconds = '0' + secondsCounter : seconds=secondsCounter;


        timelapse.textContent = `${minutes}:${seconds}`

 
        if (minutesCounter===1 && secondsCounter>=0 ){
            minutesCounter = 0;
            secondsCounter = 0;
            process_btn.click();
        }
    }
}
setInterval(chronos, 1000);

const gifSetup = {type: 'gif', frameRate: 10, quality: 10, width: 360, height: 240}

process_btn.addEventListener("click", async (event)=>{
    switch (event.target.textContent){
        case "CONTINUAR":
            status = "NONE"
            // change infoDiv | getUserMedia permisions
            infoDiv.innerHTML = userMediaAccessInfo;
            step1.setAttribute("data-active", true)
            navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then((stream)=>{
                streamSignal = stream;
                infoDiv.innerHTML = contentVideo;
                video = document.querySelector("#video");
                video.srcObject = streamSignal;
                video.play();

                process_btn.textContent = "GRABAR";
            })
            .catch((error)=>alert("Para continuar necesitamos usar la cámara!: ", error))
            break;
        case "GRABAR":
            // init: RecordRTC | video.play() | Chronos
            infoDiv.innerHTML = contentVideo;
            video = document.querySelector("#video");
            video.srcObject = streamSignal;
            video.play();

            timelapse_container.innerHTML = timelapseTemplate;
            timelapse = document.querySelector("#timelapse");
            // timelapse.textContent = minutes + ':' + seconds;

            step1.removeAttribute("data-active");
            step2.setAttribute("data-active", true);
            recording = RecordRTC(streamSignal, gifSetup);
            recording.startRecording();

            clearChronos();

            process_btn.textContent = "FINALIZAR";
            break;
        case "FINALIZAR":
            // stop: RecordRTC | video.pause() | Chronos stop | Show gif 
            video.pause();
            streamSignal.stop();
            recording.stopRecording();
            clearInterval(chronos);

            infoDiv.innerHTML = previewGif; 
            img = document.querySelector("#gif-img"); // Show gif

            timelapse_container.innerHTML = repeatRecordTemplate;
            repeatRecordBtn = document.querySelector("#repeatRecordBtn");
            repeatRecordBtn.addEventListener("click", async (event)=>{
                recording = null;
                gif = null;
                clearChronos();

                // video.srcObject = "";

                img.style = "display: none";
                img.setAttribute("src", "");

                const streamRepeat = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
                streamSignal = streamRepeat;
                process_btn.textContent = "GRABAR";
                process_btn.click();

            })

            gif = recording.getBlob();

            // Preview created gifo
            URL_OBJECT = URL.createObjectURL(gif);
            img.setAttribute("src", URL_OBJECT);
            img.style = "display: visible"

            process_btn.textContent = "SUBIR GIFO";
            break;
        case "SUBIR GIFO":
            status = "UPLOAD"
            process_btn.classList.add("display-none");

            // Create record.Blob() | fetch Giphy POST | 
            step2.removeAttribute("data-active");
            step3.setAttribute("data-active", true);


            timelapse_container.innerHTML = "";

            // wait to resolve fetch upload          
            let formData = new FormData();
            formData.append('api_key', API_KEY);
            formData.append('file', gif, 'myGifo.gif');

            infoDiv.innerHTML += previewGifCapa; 
            createGifoCapa = document.querySelector(".statusinfo-container");

            let resultReq = undefined; 
            resultReq = await upload(gif);
            const statusInfoContainer = document.querySelector(".statusinfo-container");
            const createGifo_containerBtns = document.querySelector(".createGifo-containerBtns");
            statusInfoContainer.innerHTML = gifoSubidoTemplate;   
            createGifo_containerBtns.innerHTML = buttons_actions;

            const GIFO_ID = resultReq.data.id;
            console.log("gifoId:", GIFO_ID);

            // Update localStorage
            local = JSON.parse(localStorage.getItem("myGifosId"))
            myGifosId = [GIFO_ID].concat(local);
            localStorage.setItem("myGifosId", JSON.stringify(myGifosId));

            REQ_TYPE ="gifs";                // gifs | stickers
            REQUEST = "trending";            // trending | search

            URI = `${API_URL}/${REQ_TYPE}?api_key=${API_KEY}&ids=${GIFO_ID}`;
            const myGifo = await search(URI);
            myGifos.push(myGifo[0]);

            console.log("myGifo:", myGifo);
            console.log(myGifos)

            step3.removeAttribute("data-active")

            // invokeSaveAsDialog(gif);
            recording = null;
            gif = null;
            clearChronos();

            status = "NONE"
            process_btn.textContent = "CONTINUAR"
            break;
    
        default:
            console.log(event.target.textContent)
            break;
    }
})


function copyToClipBoard() {

    var content = document.getElementById('textArea');
    
    content.select();
    document.execCommand('copy');

    alert("Copied!");
}
// const statusInfoContainer = document.querySelector(".statusinfo-container");
// statusInfoContainer.innerHTML = gifoSubidoTemplate;

 
    // fetch('https://upload.giphy.com/v1/gifs', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then((res)=>res.json())
    // .then((resJson)=>{
    //     console.log("resJson: " + resJson.data);
    //     console.log("resJson: " + resJson.data.id);
    // })
    // .catch((err)=>console.error(err))