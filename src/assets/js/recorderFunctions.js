var audio_context;
var recorder;

var config = {
  apiKey: "AIzaSyBinR79zFjxe7Qu7XG6xFo_zCpGp9WJrYI",
  authDomain: "audio-recorder-503d8.firebaseapp.com",
  databaseURL: "https://audio-recorder-503d8.firebaseio.com",
  projectId: "audio-recorder-503d8",
  storageBucket: "audio-recorder-503d8.appspot.com",
  messagingSenderId: "318922865113"
}

console.log(config);

function toggleVisibility(id) {
  var e = document.getElementById(id);
  if(e.style.visibility == 'hidden')
     e.style.visibility = 'visible';
}

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  recorder = new Recorder(input);
}

function startRecording(button) {
  recorder && recorder.record();
}

function stopRecording(button, id) {
  recorder && recorder.stop();
  // create WAV download link using audio data blob
  createDownloadLink(id);
  recorder.clear();
}

function createDownloadLink(id) {
  // Start file download.
  recorder && recorder.exportWAV(
    function (blob) {
      var url = URL.createObjectURL(blob);
      console.log(blob);
      console.log(url);
      var pai1 = document.getElementById('recordingslist' + id);
      var liId = document.getElementById("li" + id);
      if (liId != undefined) {
        pai1.removeChild(liId);
      }

      var li = document.createElement('span');
      var audioEl = document.createElement('audio');
      //var hf = document.createElement('a');
      audioEl.controls = true;
      audioEl.src = url;
      //hf.href = url;
      //hf.download = new Date().toISOString() + '.wav';
      //hf.innerHTML = hf.download;
      li.appendChild(audioEl);
      li.setAttribute("id", "li" + id);
      //li.appendChild(hf);
      pai1.appendChild(li);
      //document.getElementById('recordingslist' + id).appendChild(li);

      document.getElementById("salvar" + id).addEventListener("click", function () {

        // Generate download of hello.txt file with some content
        //var text = document.getElementById("text-val").value; 
        var idade = document.getElementById('idade').value;
        var cidade = document.getElementById('cidade').value;
        var estado = document.getElementById('estado').value;
        var sexo = document.getElementById('sexo').value;
        var data = document.getElementById("data").value;
        var filename = 'frase'+ '_'+ id + '_' + data + '_'+ idade +'_' + cidade + '_'+ estado + '_'+ sexo + '.wav';
        //download(filename, url);
        upload(filename, url, blob)
      }, false);
    }
  );
}

function upload(filename, url, blob,id) {

  firebase.initializeApp(config);

  let uploadTask = firebase.storage().ref();

  var thisRef = uploadTask.child(`${filename}`);

  thisRef.put(blob).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });
}


/*function download(filename, url) {
  var element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', filename);
  element.style.display = 'display: block';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);""
}*/

var recorderObject = (function () {
  return {
    recorder: function () {
      (function ($) {
        'use strict';
        window.onload = function init() {
          try {
            // webkit shim
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