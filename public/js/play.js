let audio = document.getElementById('audio');
let play = document.querySelector('.play');
let curIndex = 0;
//暂停
play.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        play.innerHTML = '<i class="iconfont">&#xe644;</i>'
    }
    else {
        audio.pause();
        play.innerHTML = '<i class="iconfont">&#xe87c;</i>'
    }
})
//下一首歌
let forward = document.querySelector('.forward');
forward.addEventListener('click', function () {
    let songTotals = localStorage.getItem('songTotals');
    curIndex = (curIndex + 1 > songTotals) ? 0 : curIndex + 1;
    playMusic(curIndex);
})
//上一首歌
let backward = document.querySelector('.backward');
backward.addEventListener('click', function () {
    let songTotals = localStorage.getItem('songTotals');
    curIndex = (curIndex - 1 < 0) ? songTotals : curIndex - 1;
    // console.log(curIndex);
    playMusic(curIndex);
})
//播放设置
function playMusic(index) {
    let poster = document.getElementById('poster');
    let name = document.getElementById('name');
    let artistName = document.getElementById('artistName');
    let info_poster = document.getElementById("info_poster");
    let post = document.getElementById('post');
    let info_song = document.getElementById('info_song');
    let album_a = document.getElementById('album_a');
    let singer_a = document.getElementById('singer_a');
     audio.pause();
    play.innerHTML = '<i class="iconfont">&#xe87c;</i>'
    //使用jquery
    //找到每行
    trs = $('#infoList_playlist').find("tr");
    //找到某一行
    curTR = trs.get(index);
    // console.log(curTR);
    curTR.style.backgroundcolor = "red";
    //小窗的初始化信息
    name.innerHTML = `${curTR.dataset.name}`
    poster.innerHTML = ` <img src="${curTR.dataset.song_prc}" alt="">`
    artistName.innerHTML = `${curTR.dataset.songername}`
    info_poster.innerHTML = ` <img src="${curTR.dataset.song_prc}" alt="">`
    //详情页信息
    post.innerHTML = ` <img src="${curTR.dataset.song_prc}" alt="">`
    album_a.innerHTML = `${curTR.dataset.album}`
    info_song.innerHTML = `${curTR.dataset.name}`
    singer_a.innerHTML = `${curTR.dataset.songername}`
    audio.src = curTR.dataset.url;
    //获取每首歌 歌词
    get('get', `/lyric?id=${curTR.dataset.id}&timestamp=${new Date().getTime()}`, function (res) {
        let lyric = formatLyric(res.lrc.lyric);
        let IrcBox = document.getElementById('IrcBox');
        let p = document.createElement("p");
        //计算滚动距离
        IrcBox.innerHTML = '';
        // let minHeight = document.getAnimations('irccontainer');
        // let srcHeight = 200;
        createLyric(lyric);
        //创建歌词函数
        function createLyric(lyric) {
            for (let i = 0; i < lyric.length; i++) {
                lyrics = lyric[i];
                let p = document.createElement("p")
                p.innerHTML = lyrics.lrcstr;
                IrcBox.appendChild(p);
                //添加所需要的时间，用来高亮显示
                p.dataset.time = lyrics.timepoint;
                //标记行号
                p.dataset.line = i;
            }
        }
        //计算滚动距离
        let re_duan = $('#irccontainer').find('p');
        for (let i = 0; i < re_duan.length; i++) {
        }
    })
}
let infoList_playlist = document.getElementById('infoList_playlist');
//使用了jqery,获取infoList_playlist下的每一个tr
//双击播放
$('#infoList_playlist').on('dblclick', 'tr', function () {
    curIndex = parseInt(this.dataset.index);
    playMusic(curIndex);
})
//唱片旋转
audio.addEventListener('play', function () {
    $(post).css("animation-play-state", "running")
})
audio.addEventListener('pause', function () {
    $(post).css("animation-play-state", "paused")
})