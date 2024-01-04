var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    script.onload = function() {
      $(function () {
        var playerTrack = $("#player-track"),
          bgArtwork = $("#bg-artwork"),
          bgArtworkUrl,
          albumName = $("#album-name"),
          trackName = $("#track-name"),
          albumArt = $("#album-art"),
          sArea = $("#s-area"),
          seekBar = $("#seek-bar"),
          trackTime = $("#track-time"),
          insTime = $("#ins-time"),
          sHover = $("#s-hover"),
          playPauseButton = $("#play-pause-button"),
          i = playPauseButton.find("i"),
          tProgress = $("#current-time"),
          tTime = $("#track-length"),
          seekT,
          seekLoc,
          seekBarPos,
          cM,
          ctMinutes,
          ctSeconds,
          curMinutes,
          curSeconds,
          durMinutes,
          durSeconds,
          playProgress,
          bTime,
          nTime = 0,
          buffInterval = null,
          tFlag = false,
          albums = [
              "리와인드 (RE:WIND)",
              "겨울봄 (Winter Spring)",
              "LOCKDOWN (락다운)",
              "Another World",
              "KIDDING (키딩)",
              "OVER (오버)",
              "Superhero (슈퍼히어로)",
          ],
          trackNames = [
              "이세계아이돌 (ISEGYE IDOL)",
              "이세계아이돌 (ISEGYE IDOL)",
              "이세계아이돌 (ISEGYE IDOL)",
              "이세계아이돌 (ISEGYE IDOL)",
              "이세계아이돌 (ISEGYE IDOL)",
              "이세계아이돌 (ISEGYE IDOL)",
              "이세계아이돌 (ISEGYE IDOL)",
          ],
          albumArtworks = ["_1", "_2", "_3", "_4", "_5", "_6", "_7"],
          trackUrl = [
              "./mp3/이세계아이돌 (ISEGYE IDOL) - 리와인드 (RE_WIND) Official MV.mp3",
              "./mp3/겨울봄 (Winter Spring) MV - 이세계아이돌 (ISEGYE IDOL).mp3",
              "./mp3/LOCKDOWN (락다운) MV.mp3",
              "./mp3/Another World (어나더 월드) Official MV (차원을넘어 이세계아이돌 웹툰 OST).mp3",
              "./mp3/이세계아이돌 (ISEGYE IDOL) - KIDDING (키딩) Official MV (320 kbps).mp3",
              "./mp3/OVER.mp3",
              "./mp3/Superhero.mp3"
          ],
          playPreviousTrackButton = $("#play-previous"),
          playNextTrackButton = $("#play-next"),
          currIndex = -1;
          var audio = new Audio();

    // 볼륨 바 엘리먼트 선택
    var volumeInput = $("#volume-input");

    // 볼륨 변경 이벤트 처리
    volumeInput.on("input", function () {
      audio.volume = volumeInput.val();
      updateVolumeBar();
    });

    audio.onvolumechange = function () {
      updateVolumeBar();
    };

    function updateVolumeBar() {
      var volume = audio.volume;
      var volumeBar = $("#volume-progress");

      volumeBar.width(volume * 100 + "%");

      volumeBar.css("background-color", "#4caf50");
    }
        function playPause() {
          setTimeout(function () {
            if (audio.paused) {
              playerTrack.addClass("active");
              albumArt.addClass("active");
              checkBuffering();
              i.attr("class", "fas fa-pause");
              audio.play();
            } else {
              playerTrack.removeClass("active");
              albumArt.removeClass("active");
              clearInterval(buffInterval);
              albumArt.removeClass("buffering");
              i.attr("class", "fas fa-play");
              audio.pause();
            }
          }, 1);
        }

        function showHover(event) {
          seekBarPos = sArea.offset();
          seekT = event.clientX - seekBarPos.left;
          seekLoc = audio.duration * (seekT / sArea.outerWidth());

          sHover.width(seekT);

          cM = seekLoc / 60;

          ctMinutes = Math.floor(cM);
          ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

          if (ctMinutes < 0 || ctSeconds < 0) return;

          if (ctMinutes < 0 || ctSeconds < 0) return;

          if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
          if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

          if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
          else insTime.text(ctMinutes + ":" + ctSeconds);

          insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
        }

        function hideHover() {
          sHover.width(0);
          insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
        }

        function playFromClickedPos() {
          audio.currentTime = seekLoc;
          seekBar.width(seekT);
          hideHover();
        }

        function updateCurrTime() {
          nTime = new Date();
          nTime = nTime.getTime();

          if (!tFlag) {
            tFlag = true;
            trackTime.addClass("active");
          }

          curMinutes = Math.floor(audio.currentTime / 60);
          curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

          durMinutes = Math.floor(audio.duration / 60);
          durSeconds = Math.floor(audio.duration - durMinutes * 60);

          playProgress = (audio.currentTime / audio.duration) * 100;

          if (curMinutes < 10) curMinutes = "0" + curMinutes;
          if (curSeconds < 10) curSeconds = "0" + curSeconds;

          if (durMinutes < 10) durMinutes = "0" + durMinutes;
          if (durSeconds < 10) durSeconds = "0" + durSeconds;

          if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
          else tProgress.text(curMinutes + ":" + curSeconds);

          if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
          else tTime.text(durMinutes + ":" + durSeconds);

          if (
            isNaN(curMinutes) ||
            isNaN(curSeconds) ||
            isNaN(durMinutes) ||
            isNaN(durSeconds)
          )
            trackTime.removeClass("active");
          else trackTime.addClass("active");

          seekBar.width(playProgress + "%");

          if (playProgress == 100) {
            i.attr("class", "fa fa-play");
            seekBar.width(0);
            tProgress.text("00:00");
            albumArt.removeClass("buffering").removeClass("active");
            clearInterval(buffInterval);
          }
        }

        function checkBuffering() {
          clearInterval(buffInterval);
          buffInterval = setInterval(function () {
            if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
            else albumArt.removeClass("buffering");

            bTime = new Date();
            bTime = bTime.getTime();
          }, 100);
        }

        function selectTrack(flag) {
          if (flag == 0 || flag == 1) ++currIndex;
          else --currIndex;

          if (currIndex > -1 && currIndex < albumArtworks.length) {
            if (flag == 0) i.attr("class", "fa fa-play");
            else {
              albumArt.removeClass("buffering");
              i.attr("class", "fa fa-pause");
            }

            seekBar.width(0);
            trackTime.removeClass("active");
            tProgress.text("00:00");
            tTime.text("00:00");

            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audio.src = trackUrl[currIndex];

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
              audio.play();
              playerTrack.addClass("active");
              albumArt.addClass("active");

              clearInterval(buffInterval);
              checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find("img.active").removeClass("active");
            $("#" + currArtwork).addClass("active");

            bgArtworkUrl = $("#" + currArtwork).attr("src");

            bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });
          } else {
            if (flag == 0 || flag == 1) --currIndex;
            else ++currIndex;
          }
        }

        function initPlayer() {
          audio = new Audio();

          selectTrack(0);

          audio.loop = false;

          playPauseButton.on("click", playPause);

          sArea.mousemove(function (event) {
            showHover(event);
          });

          sArea.mouseout(hideHover);

          sArea.on("click", playFromClickedPos);

          $(audio).on("timeupdate", updateCurrTime);

          playPreviousTrackButton.on("click", function () {
            selectTrack(-1);
          });

          playNextTrackButton.on("click", function () {
            selectTrack(1);
          });

          $(".playlist-item").on("click", function () {
            var trackIndex = $(this).data("index");
            selectTrackByIndex(trackIndex);
            playPause();
          });
        }

        
        function loadPlaylist() {
            var playlistTracks = $("#playlist-tracks");
            playlistTracks.empty();

            for (var i = 0; i < albums.length; i++) {
              var listItem = $("<li>");
              listItem.text(albums[i]);
              listItem.data("index", i);
              listItem.on("click", function () {
                var trackIndex = $(this).data("index");
                selectTrackByIndex(trackIndex-1);
              });

              playlistTracks.append(listItem);
            }
          }

          function selectTrackByIndex(index) {
            currIndex = index;
            selectTrack(0);
          }

          loadPlaylist();
          initPlayer();
        });
      };