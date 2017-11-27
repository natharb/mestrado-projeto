var audio_context;
var recorder;

var transactionId = '_' + Math.random().toString(36).substr(2, 9);
console.log(transactionId);

var config = {
  apiKey: "AIzaSyBinR79zFjxe7Qu7XG6xFo_zCpGp9WJrYI",
  authDomain: "audio-recorder-503d8.firebaseapp.com",
  databaseURL: "https://audio-recorder-503d8.firebaseio.com",
  projectId: "audio-recorder-503d8",
  storageBucket: "audio-recorder-503d8.appspot.com",
  messagingSenderId: "318922865113"
}

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  recorder = new Recorder(input);
}

function startRecording(button) {
  recorder && recorder.record();
}

function stopRecording(button, id, count) {
  recorder && recorder.stop();
  createDownloadLink(id,count);  
}

function createDownloadLink(id, count) {
  
  recorder && recorder.exportWAV(
    function (blob) {
      
      var lista = document.getElementById('recordingslist' + id);
      var item = document.getElementById("li" + id);
      var url = URL.createObjectURL(blob);

      var li = document.createElement('span');
      var audioEl = document.createElement('audio');
      audioEl.controls = true;
      audioEl.src = url;
      li.appendChild(audioEl);
      li.setAttribute("id", "li" + id);
      lista.appendChild(li);

      if (item != undefined) {
        lista.removeChild(item);
        
       }
       recorder && recorder.clear();
       document.getElementById("salvar" + id).addEventListener("click", function () {
        var idade = document.getElementById('idade').value;
        var cidade = document.getElementById('cidade').value;
        var estado = document.getElementById('estado').value;
        var sexo = document.querySelector('input[name="sexo"]:checked').value;
        var data = document.getElementById("data").value;
        var escolaridade = document.getElementById("escolaridade").value;
        var filename = 'frase' + '_' + id + '_' + data + '_' + idade + '_' + cidade + '_' + estado + '_' + sexo + '_' + escolaridade + '.wav';
        var teste = document.getElementById("li" + id);            
        upload(filename, teste.lastChild.src, blob,count);
        
      }, false);
    }
  );
}

function uploadTextFile() {

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
    return;
  }

  var saida = [];
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(() => navigator.mediaDevices.enumerateDevices())
    .then(devices => {
      saida.push(devices.length + " devices.").toString();
      devices.forEach(function (device) {
        saida.push(device.kind + ": " + device.label).toString();
        var blobFileText = new Blob([saida], { type: 'text/plain' });
        let uploadTaskTextFile = firebase.storage().ref();
        var refTextFile = uploadTaskTextFile.child(`${transactionId + '_' + "deviceType"}`);
        refTextFile.put(blobFileText).then(function (snapshot) {
          console.log('Arquivo de texto salvo na base de dados com sucesso!');
        });
      }
      );
    })
    .catch(e => console.log(e));
}

function upload(filename, url, blob,count) {

  let uploadTask = firebase.storage().ref();
  var thisRef = uploadTask.child(`${transactionId + '_' + filename}`);

  thisRef.put(blob);
}

var recorderObject = (function () {
  return {
    recorder: function () {
      (function ($) {
        'use strict';
        window.onload = function init() {
          try {
            // webkit shim
            firebase.initializeApp(config);
            //uploadTextFile();
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia;

            window.URL = window.URL || window.webkitURL;

            audio_context = new AudioContext;
            //alert('Audio detectado.');

          } catch (e) {
            alert('Este browser não dá suporte ao plugin!');
          }
          navigator.getUserMedia({ audio: true }, startUserMedia, function (e) {
          });
        };
      })(window.jQuery);
    }
  }
})(recorderObject || {})

/*function download(filename, url) {
  var element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', filename);
  element.style.display = 'display: block';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);""
}*/