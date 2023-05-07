window.onload = function () {
    let clock_btn = document.getElementById('clock_btn');
    //console.log(clock_btn);
    let history_song_txt = document.getElementById('history_song_txt');
    let history_song = document.getElementById('history_song');
    //  console.log(history_song);
    history_song.addEventListener('click', function () {
        history_song_txt.style.display = 'block';

    })

    clock_btn.addEventListener('click', function () {
        history_song_txt.style.display = 'none';

    })
    //获取数据
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
    get('GET', `/user/record?uid=1921827766&type=1&timestamp=${new Date().getTime()}`, function (res) {

        let history_Data = res.weekData;
        console.log(history_Data);
        for (let i = 0; i < 25; i++) {
            let history_song_time = getDuring_a(history_Data[i].song.dt);
            // console.log(history_song_time);
            // console.log(history_Data[i].song.name); 歌曲名字
            //  console.log(history_Data[i].song.dt) 时长
            //  console.log(history_Data[i].song.ar[0].name) 歌手
            let history_song_txt_list_tr = document.createElement('tr');
            history_song_txt_list_tr.innerHTML = ` <td>${history_Data[i].song.name}</td>
            <td>${history_Data[i].song.ar[0].name}</td>
            <td>${history_song_time}</td>`
            let history_song_txt_list = document.getElementById('history_song_txt_list');
            history_song_txt_list.appendChild(history_song_txt_list_tr);
        }

        // console.log(songlist);
    })
    let perdetail_list = document.getElementById('perdetail_list');
    let perdetail_cover = document.getElementById('perdetail_cover');
    let perdetail_list_itm_last = document.getElementById('perdetail_list_itm_last');
    perdetail_cover.addEventListener('mousemove', function () {
        perdetail_list.style.display = 'block';
    })
    perdetail_list_itm_last.addEventListener('mouseout', function () {
        perdetail_list.style.display = 'none';
    })

    function getDuring_a(t) {
        let minutes = Math.trunc(parseInt((t % (1000 * 60 * 60)) / (1000 * 60))) // 计算分钟
        let seconds = Math.trunc((t % (1000 * 60)) / 1000); // 计算秒数
        let getTime = minutes + `:` + seconds;
        // console.log(getTime);
        return (getTime);
    }
}