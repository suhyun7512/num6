document.addEventListener('DOMContentLoaded', function () {
    const isdCovers = document.querySelectorAll('.isd-cover');
    const videoInfoContainer = document.getElementById('video-info-container');
    const videoLink = document.getElementById('video-link');
    const videoThumbnail = document.getElementById('video-thumbnail');
    const videoTitle = document.getElementById('video-title');
    const channelTitle = document.getElementById('channel-title');
    const statistics = document.getElementById('statistics');

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function fetchVideoInfo(videoId) {
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=AIzaSyCJaFQotQkggPP_K7NHT8-F6PM4VQdltQk`)
            .then(response => response.json())
            .then(data => {
                const snippet = data.items[0].snippet;
                const videoStatistics = data.items[0].statistics;

                const views = numberWithCommas(videoStatistics.viewCount);
                const likes = numberWithCommas(videoStatistics.likeCount);

                videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
                videoThumbnail.src = snippet.thumbnails.high.url;
                videoTitle.textContent = snippet.title;
                channelTitle.textContent = snippet.channelTitle;
                statistics.innerHTML = `조회수: ${views}회<br>좋아요: ${likes}개`;
            });
    }

    fetchVideoInfo(isdCovers[0].getAttribute('data-video-id'));

    isdCovers.forEach(function (isdCover) {
        isdCover.addEventListener('click', function () {
            const videoId = isdCover.getAttribute('data-video-id');
            fetchVideoInfo(videoId);
        });
    });

    videoInfoContainer.addEventListener('click', function () {});
});