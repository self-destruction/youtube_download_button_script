// ==UserScript==
// @name YouTube Simple Download Button Script
// @description Edited by https://github.com/self-destruction/youtube_download_button_script
// @author Intercross
// @version 1.0
// @date 2024-01-16
// @icon https://i.imgur.com/InuDDVK.png
// @compatible chrome
// @license CC-BY-NC-ND-4.0
// @match *://*.youtube.com/*
// @require https://code.jquery.com/jquery-2.2.4.min.js
// @run-at document-end
// @downloadURL https://github.com/self-destruction/youtube_download_button_script/blob/main/script.js
// @updateURL https://github.com/self-destruction/youtube_download_button_script/blob/main/script.js
// ==/UserScript==

if ("undefined" == typeof(initYT)) {
   var initYT = {
      currentMedia: null,
      init: function() {
         initYT.pageLoad();
      },
      addClick: function(document) {
         if (document.URL.match('youtube.com') && new RegExp('v=[a-zA-Z0-9-_]{11}').exec(document.URL)) {
            var youtubeID = RegExp.lastMatch.substr(2);
            var newInterface = $('#meta-contents');
            if (newInterface) {
               var downloadBtn = $(".ytd-download-button-renderer");
               if (downloadBtn.length > 0) {
                   var childBtn = downloadBtn.find(".yt-spec-touch-feedback-shape");
                   if (childBtn.length > 0) {
                       childBtn.off('click').on('click', function(e){
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        window.open("https://youtubepp.com/watch?v=" + youtubeID, "_blank");
                      });
                   }
               }
            }
         }
      },
      pageLoad: function() {
         if (document.body && document.domain == 'www.youtube.com') {
            setInterval(initYT.inspectPg, 1000);
            initYT.inspectPg();
         }
      },
      inspectPg: function() {
         if (initYT.currentMedia != document.URL && typeof ytplayer != 'undefined' && ytplayer) {
            initYT.currentMedia = document.URL;
            if ($('#initYT')) {
               $('#initYT').remove()
            }
         }
         if ($("#meta-contents")[0] && !$('#initYT')[0] && typeof ytplayer != 'undefined' && ytplayer) {
            initYT.addClick(document);
         }
      },
   };
}
initYT.init();
