var audio_context;
var recorder;

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
      var pai1 = document.getElementById('recordingslist' + id);
      var liId = document.getElementById("li" + id);
      if (liId != undefined) {
        pai1.removeChild(liId);
      }

      var li = document.createElement('span');
      var au = document.createElement('audio');
      //var hf = document.createElement('a');

      var uploader = document.getElementById('uploader'),
        button = document.getElementById("salvar" + id);
      button.addEventListener("click", function (e) {

        var filename = new Date().toISOString() + '.wav';
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref(file.name);
        storageRef.put(file);
 
        task.on('state_changed',

          function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
            if (percentage == 100) {
              alert("Upload com sucesso.");
            }
          },
          function error(err) {

          },
          function complete() {

          })

      }, false);

      au.controls = true;
      au.src = url;
      //hf.href = url;
      //hf.download = new Date().toISOString() + '.wav';
      //hf.innerHTML = hf.download;
      li.appendChild(au);
      li.setAttribute("id", "li" + id);
      //li.appendChild(hf);
      pai1.appendChild(li);
      //document.getElementById('recordingslist' + id).appendChild(li);
    }
  );
}

function download(filename, url) {
  var element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

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
            alert('Audio detectado.');
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