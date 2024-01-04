const apiKey1 = 'AIzaSyCVFlyufTv2vVDCrc2H5-_nw1yWs5OJhhs';
const channelId1 = 'UCroM00J2ahCN6k-0-oAiDxg';
const channelApiUrl1 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId1}&key=${apiKey1}`;

const xhrChannel = new XMLHttpRequest();
xhrChannel.open('GET', channelApiUrl1, true);
xhrChannel.onreadystatechange = function () {
    if (xhrChannel.readyState === 4 && xhrChannel.status === 200) {
        const responseChannel = JSON.parse(xhrChannel.responseText);
        const channelInfo = responseChannel.items[0];

        document.getElementById('channelName').textContent = channelInfo.snippet.title;

        const subscriberCount = channelInfo.statistics.subscriberCount;
        const formattedSubscriberCount = formatSubscriberCount(subscriberCount);
        document.getElementById('subscriberCount').textContent = `구독자 수: ${formattedSubscriberCount}명`;

        document.getElementById('channelDescription').textContent = channelInfo.snippet.description;
    }
};
xhrChannel.send();

function formatSubscriberCount(count) {
    if (count < 10000) {
        return count.toString();
    } else {
        const formattedCount = (count / 10000).toFixed(1);
        return `${formattedCount}만`;
    }
}