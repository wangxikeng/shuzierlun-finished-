window.onload = function () {
    let cur_num = 0;
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
    //获取数据
    get('GET', `/user/record?uid=1921827766&type=1&timestamp=${new Date().getTime()}`, function (res) {
        let history_Data = res.weekData;
        // console.log(history_Data);
        for (let i = 0; i < 25; i++) {
            // console.log(history_song_time);
            // console.log(history_Data[i].song.name); 歌曲名字
            //  console.log(history_Data[i].song.dt) 时长
            //  console.log(history_Data[i].song.ar[0].name) 歌手
            // console.log(history_Data[i].song.id); 歌曲id
            let history_Data_id = history_Data[i].song.id;
            let m_record = document.getElementById('m-record');
            let m_record_li = document.createElement('li');
            m_record_li.dataset.id = history_Data_id;
            m_record_li.dataset.url = `http://music.163.com/song/media/outer/url?id=${history_Data_id}.mp3`;
            let cur_num_f = (cur_num++);
            m_record_li.innerHTML = `   
            <div class="hd">
                <span class="num_dd">${cur_num_f + 1}</span>
            </div>
            <div class="song">
                <div class="tt">
                    <div class="ttc">
                        <div class="txt">
                            <span>${history_Data[i].song.name}</span>
                            <span class="ar">
                                <em>-</em>
                                <span>
                                    <a href="" class='s-fc8'>${history_Data[i].song.ar[0].name}</a>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
       `
            m_record.appendChild(m_record_li)
        }
        //播放设置
        function mymusic_a() {
            li_a = $("#m-record").find('li');
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
    //获得用户数据
    get('get', `/user/playlist?uid=1921827766&timestamp=${new Date().getTime()}`, function (res) {
        // console.log(res.playlist);
        //收藏歌单
        for (let i = 3; i < res.playlist.length; i++) {
            //console.log(res.playlist[i]);
            // console.log(res.playlist[i].name); 歌名
            // console.log(res.playlist[i].coverImgUrl); 图片
            let sBox_li = document.createElement('li');
            sBox_li.innerHTML = ` <div class="sBox_cover">
            <img src="${res.playlist[i].coverImgUrl}" alt="">
        </div>
        <p class="dec">
            <a class="tit_ f">${res.playlist[i].name}</a>
        </p>`
            let sBox = document.getElementById('sBox');
            sBox.appendChild(sBox_li);
        }
    })
    get('get', `/user/playlist?uid=1921827766&timestamp=${new Date().getTime()}`, function (res) {
        for (let i = 0; i < 3; i++) {
            let cBox_li = document.createElement('li');
            let cBox = document.getElementById('cBox');
            // console.log(cBox);
            // console.log(res.playlist[i].name);
            // console.log(8);
            cBox_li.innerHTML = `
           <div class="u-cover">
               <img src="${res.playlist[i].coverImgUrl}" alt="">
           </div>
           <p class="dec">
               <a href="javascript:" class=" f-thide ">${res.playlist[i].name}</a>
           </p>
       `
            cBox.appendChild(cBox_li)
        }
    })
    //退出设置
    let nav_login = this.document.getElementById('nav_login');
    nav_login.addEventListener('click', function () {
        alert('您已成功退出！')
        window.location.assign('logout.html');
    })
}


