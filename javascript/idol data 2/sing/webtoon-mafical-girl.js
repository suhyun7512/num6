document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('playButton').addEventListener('click', function() {
        var audioPlayer = document.getElementById('audioPlayer');
        var audioPlayer1 = document.getElementById('audioPlayer-1');

        if (!audioPlayer1.paused) {
            audioPlayer1.pause();
        }

        if (audioPlayer.paused) {
            audioPlayer.currentTime = 6;
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });

    document.getElementById('playButton1').addEventListener('click', function() {
        var audioPlayer = document.getElementById('audioPlayer');
        var audioPlayer1 = document.getElementById('audioPlayer-1');

        if (!audioPlayer.paused) {
            audioPlayer.pause();
        }

        if (audioPlayer1.paused) {
            audioPlayer1.volume = 0.2;
            audioPlayer1.currentTime = 0;
            audioPlayer1.play();
        } else {
            audioPlayer1.pause();
        }
    });
});