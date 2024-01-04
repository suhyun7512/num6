document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('playButton2').addEventListener('click', playMP3);

    function playMP3() {
        var audioPlayer = document.getElementById('audioPlayer-2');

        if (audioPlayer.paused) {
            audioPlayer.play();
            audioPlayer.currentTime = 0;
            audioPlayer.volume = 0.5;
        } else {
            audioPlayer.pause();
        }
    }
});