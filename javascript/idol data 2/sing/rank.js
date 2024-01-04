const apiKey = 'AIzaSyDk0ggt7-O0t6Hv7mcpvoMOLqdfkGxwYt8';

// 마이 프로젝트 3        
const videoIds = [
    // 전체 앨범
    'rDFUl2mHIW4', 'wyhwJnNpVJI', 'i4SRH9jfUMQ','QgMFpuos4Rg','8KTFf2X-ago','fgSXAKsq-Vo','JY-gJkMuJ94',
    // 아이네
    'SXE-gIU3yJs','-in8F0zmLcM','YZoeO3T7hsc','7IcafhbXprU','YpCpF_CD2pM',
    // 징버거
    'kra0f71EIgc','qunpFTI90sU','p9TFQ9ySJLs','KjySNSxgg3U','wB4MB-UrVcc','Q0LWEyWI8-E','7E_cZ9eU3ZE','zjZpfpRkHJs','SQR0tzDvSVU','eWaBljLkd08','FeXN3_ub3oQ','tT-kuonVzfY','VE4sUxm2N7k',
    // 릴파
    '6hEvgKL0ClA','K-5WdjbCYnk','1UbyyaDc8x0','crvPldgKJIo','8tJb1YlMHfA','JwEEIHzZNuQ','oRiQHxft2mY','FAEARaip0rM','H02v7OU9Rtg','4ZjDoG0bc5Q','WS-bGFcPf9I','5tGwnxu8NIw','eEPmx_JZCkY',
    // 주르르
    'rFxJjpSeXHI','G0g3d6b5CZM','X7cO4xQ5Gqs','_OsnBqrh6yg','z6RSOiYOVuQ','-pczFfMtWrc','7sFIjj5BW3M','tc92ES3R6os','8kuevWdt01M','_T4ck9kc1ws',
    // 고세구
    'DPEtmqvaKqY','qZi1Xh0_8q4','SAJrAQGvOHE','uG91iq0AzKM','h5yU8WZsB9g','ZLQc1yuUOAM','Rclny6yachY','6GQV6lhwgNs','c4Fw8oRP-e8',
    //비챤 
    '-imWu1Xwz1g','aLB9ttASxPI','xs4d6QjY03w','sP0E6y0gWxA','g0jprFO8S_M','iLXmqg_HHRA','7D8wnXs4zSU','nWJB1U7cQVs','fzHJxq37cqI','lLIpFxWtqCQ','NVns4yRoTlU',
    // 단체 커버
    "fU8picIMbSk",'OTkFJyn4mvc','kNPykP_9wOQ','Kc85nOaqLwo','TYB9ScXvq34','21trg6DfzX8','Brf3LWwNVTk',

    //test
    '--Go33WYnqw','QLabzK9TKF8','Empfi8q0aas','jelNkU4mPuA','3XoZ8MsphNw','_klX8vJo4Co','mnX-cmDYCh0','gT3HKgVJuRQ','yPEDKgzG98k','WItY2T5zz1A','plO-C9aSwxs','xdvDs1Jgp6k',
    'XMRzgnqVT5s','SVCSM6zHwYI','f0oaJDjphWg','epHCbFL36uU','_PJvRDp4S5s','suAKxhbbtVs','afP7Y_3Ote4','sC7A7dLhjks','Mn5ZwEFKBc4','pl38om066m0','7wubxhtPKQE','3q3RlwImdGU',
    'lQIdaZgK56A','TQqu1ZsvVFo','N2Tj_FMqlX8',
    

    

];

function formatNumber(number) {
    if (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        return '비공개';
    }
}

function fetchVideoData(videoId, callback, key = apiKey) {
    fetch(`https://www.googleapis.com/youtube/v3/videos?key=${key}&part=snippet,statistics&id=${videoId}`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const snippet = data.items[0].snippet;
                const statistics = data.items[0].statistics;

                const title = snippet.title;
                const views = formatNumber(statistics.viewCount);
                const likes = statistics.likeCount !== undefined ? formatNumber(statistics.likeCount) : '비공개';
                const thumbnail = snippet.thumbnails.medium.url;
                const publishedAt = new Date(snippet.publishedAt);
                const elapsedTime = calculateElapsedTime(publishedAt);

                callback({ title, views, likes, thumbnail, videoId, publishedAt, elapsedTime });
            } else {
                callback(null);
            }
        })
}

function calculateElapsedTime(publishedAt) {
    const now = new Date();
    const elapsedMilliseconds = now - publishedAt;
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `최초 공개: ${publishedAt.toLocaleDateString()} (+ ${days}일)`;
    } else {
        return `최초 공개: ${publishedAt.toLocaleDateString()}`;
    }
}

function updateRankings(sortBy = 'rank-views') {
    let rankingsDiv = document.getElementById('rankings');
    rankingsDiv.innerHTML = '';
    let allVideoData = [];
    let completed = 0;

    videoIds.forEach(videoId => {
        fetchVideoData(videoId, data => {
            if (data) {
                allVideoData.push(data);
            }

            if (++completed === videoIds.length) {
                if (sortBy === 'rank-views') {
                    allVideoData.sort((a, b) => b.views.replace(/,/g, '') - a.views.replace(/,/g, ''));
                } else if (sortBy === 'rank-likes') {
                    allVideoData.sort((a, b) => {
                        if (a.likes === '비공개' && b.likes === '비공개') return 0;
                        if (a.likes === '비공개') return 1;
                        if (b.likes === '비공개') return -1;

                        return b.likes.replace(/,/g, '') - a.likes.replace(/,/g, '');
                    });
                }

                allVideoData.forEach((data, index) => {
                    const rank = index + 1;
                    const entry = document.createElement('div');
                    entry.className = 'ranking-entry';
                    const backgroundColor = index % 2 === 1 ? '#EaEaEa' : '#FFF';
                    entry.style.backgroundColor = backgroundColor;
                    entry.innerHTML = `
                        <div class="rank">${rank}.</div>
                        <div class="rank-info">
                            <div class="thumbnail" onclick="openVideo('${data.videoId}')">
                                <img src="${data.thumbnail}" title="${data.title}">
                            </div>
                            <div class="details">
                                <h2>${data.title}</h2>
                                <p class="rank-views">조회수: ${data.views}</p>
                                <p class="rank-likes">좋아요: ${data.likes}</p>
                                <p class="published-at">${data.elapsedTime}</p>
                            </div>
                        </div>
                    `;
                    rankingsDiv.appendChild(entry);
                });
            }
        });
    });
}

function openVideo(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}
