
window.onload = function () {
    let get_a = function (type, url, callback) {
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

    //排行榜数据
    get_a('get', `/playlist/track/all?id=19723756&limit=20&offset=0&timestamp=${new Date().getTime()}`, function (res) {
        let topList_a = res.songs;
        let index_a = 0;
        for (let i = 0; i < topList_a.length; i++) {
            //console.log(topList_a[i]);
            //获取歌名
            let topList_a_name = topList_a[i].name;
            //获取歌手
            let topList_a_songer = topList_a[i].ar[0].name
            //获取时长
            let topList_a_time = topList_a[i].dt;
            time_a = getDuring_a(topList_a_time);
            //获取歌曲id
            let topList_a_time_id = topList_a[i].id;
            //创建li
            let top_li = document.createElement('li');
            top_li.dataset.id = topList_a_time_id;
            top_li.dataset.name = topList_a_name;
            top_li.dataset.songer = topList_a_songer;
            top_li.dataset.time = topList_a_time;
            top_li.dataset.index = (index_a++);
            top_li.dataset.url = `http://music.163.com/song/media/outer/url?id=${topList_a_time_id}.mp3`;
            let toplist_songlist = document.getElementById('toplist_songlist');
            top_li.innerHTML = `
            <div class="songlist_itm">
                <div class="songlist_songname">${topList_a_name}</div>
                <div class="songlist_songer">${topList_a_songer}</div>
                <div class="songlist_time_a">${time_a}</div>
            </div>`
            let toplist_songlist_itm = document.getElementById('toplist_songlist_itm');
            toplist_songlist_itm.appendChild(top_li);
        }
        //播放设置
        function mymusic_a() {
            li_a = $("#toplist_songlist_itm").find('li');
            let audio_a = document.getElementById('audio_a');
            for (let i = 0; i < li_a.length; i++) {
                li_a[i].addEventListener('dblclick', function () {

                    audio_a.src = li_a[i].dataset.url;
                    audio_a.play();
                })
            }
        }
        mymusic_a();


    })
    //排行榜评论
    let yemian = 20;
    let all = 100;
    let limit = 20;
    let reached = false;
    let finished = true;
    function getItems(yemian, limit) {
        console.log('666666');
        let url = `/comment/playlist?id=19723756&limit=${limit}&offset=${yemian}&timestamp=${new Date().getTime()}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:3000` + url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                const res = JSON.parse(xhr.response);
                const comment = res.comments;
                //console.log(intemData);
                //console.log(comment);
                renderItems(comment);
            }
        }
    }
    //渲染数据
    function renderItems(comment) {
        //console.log('66666');
        for (let i = 0; i < comment.length; i++) {
            //console.log(res.comments[i].content);评论内容
            // console.log(res.comments[i].ipLocation.location);获得地区
            //console.log(res.comments[i].time) 获得时间
            //console.log(res.comments[i].user.avatarUrl);获得头像
            //console.log(res.comments[i].user.nickname);获得名字
            let comment__list_li = document.createElement('li');
            let for_time = timestampToTime(comment[i].time);
            let comment__list = document.getElementById('comment__list');
            comment__list_li.innerHTML = `  <div>
                            <a href="" class="comment__avatar">
                                <img class='comment_list__avatar_img' src="${comment[i].user.avatarUrl}" alt="">
                            </a>
                            <h4 class="comment__title">
                                <a class='c_tx_thin'>
                                    ${comment[i].user.nickname}
                                </a>
                            </h4>
                            <div class="comment__date c_tx_thin">
                              ${for_time} &nbsp;&nbsp;  来自：${comment[i].ipLocation.location}
                            </div>
                            <div class="comment__text">
                                <span>${comment[i].content}</span>
                            </div>
                            <div class="comment__opt">
                                <a class="comment__zan">
                                    <i class="icon_comment icon_comment_like iconfont">
                                        &#xe870;
                                    </i>
                                    858
                                </a>
                                <a class="comment__feedback c_tx_thin">回复</a>
                            </div>
                        </div>`
            comment__list_li.className = 'comment__list_item';
            comment__list.appendChild(comment__list_li);
            finished = true;
        }
    }
    // getItems(20, 40);
    const { clientHeight: a, scrollTop: b, scrollHeight: c } = document.documentElement;
    getItems(yemian, limit);
    // console.log('scrollTop' + scrollTop);
    if (a + b >= c && yemian < all) {
        if (!finished) return
        else {
            finished = false;
            yemian += 20;
            getItems(yemian, limit);
        }
    }
    // getItems(yemian, limit)
}

function getDuring_a(t) {
    let minutes = Math.trunc(parseInt((t % (1000 * 60 * 60)) / (1000 * 60))) // 计算分钟
    let seconds = Math.trunc((t % (1000 * 60)) / 1000); // 计算秒数
    let getTime = minutes + `:` + seconds;
    // console.log(getTime);
    return (getTime);

}
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}
