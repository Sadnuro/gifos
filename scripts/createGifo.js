initInfo = `
    <h3>Aquí podrás <br> crear tus propios <span class="text-resalt">GIFOS</span></h3>
    <p>¡Crea tu GIFO en solo 3 pasos! <br> (Solo necesitas una cámara para grabar un video)</p>
`

userMediaAccessInfo = `
    <h3>¿Nos das acceso <br> a tu cámara?</h3>
    <p>El acceso a tu camara será válido sólo<br>por el tiempo en el que estés creando el GIFO.</p>
`
contentVideo = `
    <video src="" id="video"></video>
`

previewGif =`
    <img id="gif-img" src="" alt="mygifo.gif">
    <div id="createGifo-capa" >
        <div id="status-img">Chulo</div>
        <p id="status-text">Estamos subiendo tu GIFO</p>

        <div class="createGifo-containerBtns">
            <div class="btn-download"></div>
            <div class="btn-link"></div>
        </div>
    </div>
`
timelapseTemplate = `
    <p id="timelapse" class="timelapse"></p>
`
repeatRecordTemplate = `
    <p id="repeatRecordBtn">REPETIR CAPTURA</p>
`

const step1 = document.querySelector(".step1");
const step2 = document.querySelector(".step2");
const step3 = document.querySelector(".step3");

const process_btn = document.querySelector("#process-btn");
const infoDiv = document.querySelector(".info");
let video;
let img;
const timelapse_container = document.querySelector(".timelapse-container");
let timelapse;
let repeatRecordBtn;

infoDiv.innerHTML = initInfo;
process_btn.textContent = "CONTINUAR";

let streamSignal;
let recording;
let gif;

secondsCounter = 0;
minutesCounter = 0;
seconds = '00';
minutes = '00'


function clearChronos(){
    secondsCounter = 0;
    minutesCounter = 0;
    seconds = '00';
    minutes = '00';
    timelapse.textContent = minutes + ':' + seconds;
}
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

            infoDiv.innerHTML = previewGif;
            img = document.querySelector("#gif-img"); // Show gif

            gif = recording.getBlob();

            // Preview created gifo
            URL_OBJECT = URL.createObjectURL(gif);
            img.setAttribute("src", URL_OBJECT);
            img.style = "display: visible"

            process_btn.textContent = "SUBIR GIFO";
            break;
        case "SUBIR GIFO":
            // Create record.Blob() | fetch Giphy POST | 
            step2.removeAttribute("data-active");
            step3.setAttribute("data-active", true);

            img.style = "display: none";
            img.setAttribute("src", "");

            // wait to resolve fetch upload          
            let formData = new FormData();
            formData.append('api_key', API_KEY);
            formData.append('file', gif, 'myGifo.gif');


            let resultReq = undefined; 

            resultReq = await upload(gif);
            console.log("resultReq.data.id:", resultReq.data.id)

            step3.removeAttribute("data-active")

            infoDiv.innerHTML = initInfo;

            // invokeSaveAsDialog(gif);
            recording = null;
            gif = null;
            clearChronos();

            process_btn.textContent = "CONTINUAR"
            break;
    
        default:
            console.log(event.target.textContent)
            break;
    }
})




         
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