
window.onload = function () {
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
    let curedex_c = 0;
    //个人单曲
    get('GET', `/artists?id=6472&timestamp=${new Date().getTime()}`, function (res) {
        //渲染页面
        for (let i = 0; i < 10; i++) {
            //获取歌名
            let insigle_name = res.hotSongs[i].name;
            // console.log(insigle);
            //获得专辑
            let insigle_album = res.hotSongs[i].al.name;
            //console.log(insigle_album);
            //获得时长
            let insigle_time = res.hotSongs[i].dt;
            // console.log(insigle_time);
            //获得时长
            let songlist_id = res.hotSongs[i].id;
            //console.log(songlist_time);
            //创建li
            let songlist_li_c = document.createElement('li');
            songlist_li_c.dataset.id = songlist_id;
            songlist_li_c.dataset.name = insigle_name;
            songlist_li_c.dataset.album = insigle_album;
            songlist_li_c.dataset.time = insigle_time;
            let = insigle_time_infor = getDuring_a(insigle_time)
            songlist_li_c.dataset.index = (curedex_c++);
            songlist_li_c.dataset.url = `http://music.163.com/song/media/outer/url?id=${songlist_id}.mp3`;
            songlist_li_c.innerHTML = `
        <div class="songlist__item songlist__item_even">
            <div class="songlist__number">
                ${curedex_c}
            </div>
            <div class="songlist__songname">
                <span class="songlist__songname_txt">
                    <a href="javascript:">${insigle_name}</a>
                </span>
            </div>
            <div class="songlist__time">
               ${insigle_time_infor}
            </div>
            <div class="songlist__album">
                ${insigle_album}
            </div>
        </div>
    `
            let songlist__list = document.getElementById('songlist__list');
            songlist__list.appendChild(songlist_li_c);
        }
        function mymusic_c() {
            li_c = $("#songlist__list").find('li');

            let audio_c = document.getElementById('audio_c');
            for (let i = 0; i < li_c.length; i++) {
                li_c[i].addEventListener('dblclick', function () {
                    audio_c.src = li_c[i].dataset.url;
                    audio_c.play();
                })
            }

        }
        mymusic_c();

    })
    get('get', `/artist/mv?id=6472&limit=10`, function (res) {
        renderDom(res);
    })
    //渲染dom
    function renderDom(res) {
        // console.log(res.mvs);
        for (let i = 0; i < res.mvs.length; i++) {
            // console.log(res.hotAlbums[i].blurPicUrl);//封面
            // console.log(res.hotAlbums[i].name)//歌名
            // console.log(res.hotAlbums[i].picUrl);//封面
            // console.log(res.hotAlbums[i].id);//Mvid
            //  res.mvs[i].id; mvid
            let mvID = res.mvs[i].id;
            let mv_list__list = document.getElementById('mv_list__list');
            let mv_list__list_li = document.createElement('li');
            mv_list__list_li.dataset.id = mvID;
            mv_list__list_li.className = 'mv_list__item';
            mv_list__list_li.innerHTML = ` <div class="mv_list__item_box">
            <a class="mv_list__cover">
                <img src="${res.mvs[i].imgurl}" alt="${res.mvs[i].name}" class="mv_list__pic">
            </a>
            <h3 class="mv_list__title">
                <a>${res.mvs[i].name}</a>
            </h3>
            <div class="mv_list__info">
                <span class="mv_list__listen">
                    <i class="mv_list__listen_icon iconfont">
                        &#xe9f0;
                        <span>800万</span>

                    </i>
                </span>
            </div>
        </div>`
            mv_list__list.appendChild(mv_list__list_li);

            //地址获取
            get('get', `/mv/url?id=${res.mvs[i].id}&timestamp=${new Date().getTime()}`, function (res) {
                //console.log(res.data.url);
                let mv_url = res.data.url;
                mv_list__list_li.dataset.url = mv_url;

            })

        }

        mvPlay();
    }
    function getDuring_a(t) {
        let minutes = Math.trunc(parseInt((t % (1000 * 60 * 60)) / (1000 * 60))) // 计算分钟
        let seconds = Math.trunc((t % (1000 * 60)) / 1000); // 计算秒数
        let getTime = minutes + `:` + seconds;
        // console.log(getTime);
        return (getTime);
    }
    //mv播放设置
    function mvPlay() {
        let mv_list__list_mv = $('#mv_list__list').find('.mv_list__item');
        for (let i = 0; i < mv_list__list_mv.length; i++) {
            //console.log("66666");
            mv_list__list_mv[i].addEventListener('click', function () {
                let mod_mv = document.getElementById('mod_mv');
                mod_mv.style.display = 'block'
                let video_player__source = document.getElementById('video_player__source');
                // console.log(video_player__source);
                console.log(mv_list__list_mv[i].dataset.url);
                video_player__source.src = mv_list__list_mv[i].dataset.url;
                video_player__source.play();
            })
        }

    }
    mvPlay();
}
