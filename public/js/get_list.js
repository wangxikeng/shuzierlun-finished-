
//封装get请求
let get = function (type, url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(type, `http://localhost:3000` + url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            if (callback) {
                callback(JSON.parse(xhr.response))
            }
        }
    }
}
//渲染歌单
get('GET', `/playlist/detail?id=7917861134&timestamp=${new Date().getTime()}`, function (res) {
    let songlist = res.playlist.tracks;
    let index = 0;
    let songTotals = res.playlist.tracks.length;
    localStorage.setItem('songTotals', songTotals);
    for (let i = 0; i < songlist.length; i++) {
        let songlist_name;
        songlist_name = songlist[i].name;
        // console.log(songlist_name);获得歌名
        let songlist_songer;
        songlist_songer = songlist[i].ar[0].name;
        // console.log(songlist_songer);获得歌手
        let songlist_album;
        songlist_album = songlist[i].al.name;
        // console.log(songlist_album); 获得专辑
        let songlist_during = [];
        songlist_during = songlist[i].dt;
        time = getDuring(songlist_during);
        // songlist_during = songlist[i].dt; 获得时间 
        let song_imge = songlist[i].al.picUrl;
        let tr = document.createElement('tr');
        tr.dataset.id = songlist[i].id;
        tr.dataset.index = (index++);
        tr.dataset.name = songlist_name;
        tr.dataset.album = songlist_album;
        tr.dataset.songername = songlist_songer;
        tr.dataset.song_prc = song_imge;
        tr.dataset.url = `http://music.163.com/song/media/outer/url?id=${songlist[i].id}.mp3`;
        tr.innerHTML = ` <tr data-index="0" data-id="483671599" data-song-name="追光者 data-num="">
          <td>${songlist_name}</td>
          <td>${songlist_songer}</td>
          <td>${songlist_album}</td>
          <td>${time}</td>
      </tr>`
        let infoList_playlist = document.getElementById('infoList_playlist');
        infoList_playlist.appendChild(tr);
    }
    resh();
});
//格式化歌曲时间
function getDuring(t) {
    let minutes = Math.trunc(parseInt((t % (1000 * 60 * 60)) / (1000 * 60))) // 计算分钟
    let seconds = Math.trunc((t % (1000 * 60)) / 1000); // 计算秒数
    let getTime = minutes + `:` + seconds;
    // console.log(getTime);
    return (getTime);
}
//格式化歌词时间
function formatLyricTime(str) {
    let arr = str.split(':');
    let second = 0;
    if (arr.length == 3) {
        second = -(arr[0] * 3600 - arr[1] * 60 - arr[2]);
    }
    else {
        second = -(arr[0] * 60 - arr[1]);
    }
    return second.toFixed(3);
}
//格式化歌词
function formatLyric(str) {
    let arr = [],
        brr = [],
        crr = [],
        data = {

        };
    arr = str.split("\n");
    arr.splice(-1, 1);
    for (let i = 0; i < arr.length; i++) {
        brr = arr[i].split(']');
        if (!!/^(\d+:){1,2}\d+\.?\d+$/g.test(brr[0].substring(1)));
        data = {
            'timepoint': formatLyricTime(brr[0].substring(1)),
            'lrcstr': brr[1] || "<br/>"
        };
        crr.push(data)
    }
    return crr;
}
//初始化信息函数
function resh() {
    let infoList_playlist = document.getElementById('infoList_playlist');
    let audio = document.querySelector('audio');
    let poster = document.getElementById('poster');
    let name = document.getElementById('name');
    let artistName = document.getElementById('artistName');
    let info_poster = document.getElementById("info_poster");
    let post = document.getElementById('post');
    let info_song = document.getElementById('info_song');
    let album_a = document.getElementById('album_a');
    let singer_a = document.getElementById('singer_a');
    audio.src = infoList_playlist.firstElementChild.dataset.url;
    //小窗口的初始化信息
    poster.innerHTML = ` <img src="${infoList_playlist.firstElementChild.dataset.song_prc}" alt="">`
    name.innerHTML = `${infoList_playlist.firstElementChild.dataset.name}`
    artistName.innerHTML = `${infoList_playlist.firstElementChild.dataset.songername}`
    info_poster.innerHTML = ` <img src="${infoList_playlist.firstElementChild.dataset.song_prc}" alt="">`
    //详情页的初始信息
    post.innerHTML = ` <img src="${infoList_playlist.firstElementChild.dataset.song_prc}" alt="">`
    //console.log(post);
    album_a.innerHTML = `${infoList_playlist.firstElementChild.dataset.album}`
    info_song.innerHTML = `${infoList_playlist.firstElementChild.dataset.name}`
    singer_a.innerHTML = `${infoList_playlist.firstElementChild.dataset.songername}`

}
