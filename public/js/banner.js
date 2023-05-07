let imgs = document.querySelectorAll('.imgshow a');
let points = document.querySelectorAll('.points a');
let btns = document.querySelectorAll('.btn');
let nowIndex = 0;
let timer = null;
let curindex_d = 0;
let curindex_c = 0;
console.log(imgs, points, btns);
function Hiddenimages() {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = 'none';
    }
}
function Hiddenpoints() {
    for (let i = 0; i < points.length; i++) {
        points[i].className = 'hidden';
    }
}
function changeAll() {
    Hiddenimages();
    Hiddenpoints();//将图片和小圆点统统隐藏
    imgs[nowIndex].style.display = 'block';
    points[nowIndex].className = 'show';
    //将小圆点与图片进行绑定
}
changeAll();


//设计轮播效果
function barnerPlay() {
    //添加定时器
    timer = setInterval(function () {
        changeAll();
        nowIndex++;
        if (nowIndex >= imgs.length) {
            nowIndex = 0;
        }
    }, 3000)
}
barnerPlay();
//进行小圆点的触发
for (let i = 0; i < points.length; i++) {
    points[i].onmouseover = function () {
        clearInterval(timer);
    }
    points[i].onmouseout = function () {
        barnerPlay();
    }
    //进行小圆点点击的跳转
    points[i].index = i;//获取小圆点当前的下标
    points[i].onclick = function () {
        nowIndex = this.index;
        changeAll();//调用捆绑函数
    }
}
//左右按钮部分
for (let i = 0; i < btns.length; i++) {
    //鼠标悬停和鼠标移开
    btns[i].onmouseover = function () {
        clearInterval(timer);
    }
    btns[i].onmouseout = function () {
        barnerPlay();
    }
    //点击切换照片
    //左键部分
    btns[0].onclick = function () {
        nowIndex--;
        if (nowIndex < 0) {
            nowIndex = 4;
        }
        changeAll();
    }
    //右键部分
    btns[1].onclick = function () {
        nowIndex++;
        if (nowIndex > imgs.length - 1) {
            nowIndex = 0;
        }
        changeAll();
    }
}
//页面跳转部分
let person_center = document.getElementById('person_center');
person_center.addEventListener('click', function () {
    window.location.assign('person_center.html')
})
let search = document.getElementById('search');
search.addEventListener('click', function () {
    window.location.assign('text.html')
})
let ranklist = document.getElementById('ranklist');

ranklist.addEventListener('click', function () {
    window.location.assign('ranklist.html')
})
let singer = document.getElementById('singer');

singer.addEventListener('click', function () {
    window.location.assign('singer.html')
})
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
get('get', `/personalized?limit=3&timestamp=${new Date().getTime()}`, function (res) {
    let recommendlist = res.result;
    for (let i = 0; i < recommendlist.length; i++) {
        let recommendlist_name = recommendlist[i].name;
        let recommendlist_id = recommendlist[i].id;
        let recommendlist_pic = recommendlist[i].picUrl;
        //  console.log(recommendlist_name);
        //    console.log(recommendlist_id);
        //    console.log(recommendlist_pic);
        let recommendlist_li = document.createElement('li');
        recommendlist_li.dataset.name = recommendlist_name;
        recommendlist_li.dataset.index = (curindex_d++);
        recommendlist_li.dataset.id = recommendlist_id;
        recommendlist_li.innerHTML = `<div>
        <img src="${recommendlist_pic}" alt="">
        <a href="javascript:">
            <p>${recommendlist_name}</p>
        </a>
    </div>`
        let song_content = document.getElementById('song_content');
        song_content.appendChild(recommendlist_li);
    }

    let song_content_img = $("#song_content").find('li')
    let main_d = document.getElementById('main_d');
    let container = document.getElementById("container");
    let song_list_2 = document.getElementById('song_list_2');
    //数据传输  跳转 推荐页面
    for (let i = 0; i < song_content_img.length; i++) {
        song_content_img[i].addEventListener('click', function () {
            curindex_d = song_content_img[i].dataset.id;
            main_d.style.display = "block";
            container.style.display = "none";
            song_list_2.style.display = 'none'
            let song_content = document.getElementById('song_content');
            Incoming_id(curindex_d);
            song_content.remove();

        })
    }
    //得到数据渲染列表
    function Incoming_id(curindex_d) {
        get('get', `/playlist/detail?id=${curindex_d}&timestamp=${new Date().getTime()}`, function (res) {
            let res_list = res.playlist;
            xuanran(res_list);
        })
    }
    //渲染函数
    function xuanran(res_list) {
        // console.log(res_list.coverImgUrl);//封面照片
        //console.log(res_list.description);//歌单描述
        //   console.log(res_list.name);//歌单名字
        for (let i = 0; i < res_list.tags.length; i++) {
            //console.log(res_list.tags[i]);//歌单标签
            let data_tag_box = document.getElementById('data_tag_box');
            data_tag_box.innerHTML = ` 标签:
           <span>
              <a href="javascript:" class="data_info__tags">
                   ${res_list.tags[i]}
              </a>
           </span>`
        }
        let about__cont = document.getElementById('about__cont');
        let mod_data_cover_d = document.getElementById('mod_data_cover_d');
        let data__name = document.getElementById('data__name');
        mod_data_cover_d.innerHTML = `
         <img class='data__photo' src="${res_list.coverImgUrl}" alt="">
     `
        data__name.innerHTML = `<h1 class="data__name_txt">
    ${res_list.name}
</h1>`
        about__cont.innerHTML = `<p>${res_list.description}。</p>`
        //歌曲渲染
        for (let i = 0; i <= 10; i++) {
            //添加需要的数据
            let songlist__list_d = document.getElementById("songlist__list_d");
            let songlist__list_d_li = document.createElement('li');
            songlist__list_d_li.dataset.id = res_list.tracks[i].id;
            songlist__list_d_li.dataset.name = res_list.tracks[i].name;
            songlist__list_d_li.dataset.album = res_list.tracks[i].al.name;
            songlist__list_d_li.dataset.time = res_list.tracks[i].dt;
            songlist__list_d_li.dataset.songer = res_list.tracks[i].ar[0].name;
            songlist__list_d_li.dataset.url = `http://music.163.com/song/media/outer/url?id=${res_list.tracks[i].id}.mp3`;
            let cur_time = getDuring_a(res_list.tracks[i].dt);
            songlist__list_d_li.dataset.id = i;
            songlist__list_d_li.innerHTML = ` <div class="songlist__item songlist__item_even">
            <div class="songlist__number">${i + 1}</div>
            <div class="songlist__songname">
                <span class="songlist__songname_txt">
                    ${res_list.tracks[i].name}
                </span>
            </div>
            <div class="songlist__artist">
                ${res_list.tracks[i].ar[0].name}
            </div>
            <div class="songlist__time">
                04:58
            </div>
            <div class="songlist__album">${res_list.tracks[i].al.name}</div>
        </div>
            `
            songlist__list_d.appendChild(songlist__list_d_li);
            // console.log(res_list.tracks[i].name);//歌曲
            // console.log(res_list.tracks[i].id);//歌曲id
            // console.log(res_list.tracks[i].al.name);//专辑名字
            // console.log(res_list.tracks[i].ar[0].name);//歌手
            // console.log(res_list.tracks[i].dt);//获得时长
        }
        //播放设置
        function mymusic_a() {
            songlist__list_d = $("#songlist__list_d").find('li');
            let audio_d = document.getElementById('audio_d');
            for (let i = 0; i < songlist__list_d.length; i++) {
                songlist__list_d[i].addEventListener('dblclick', function () {
                    audio_d.src = songlist__list_d[i].dataset.url;
                    audio_d.play();
                })
            }
        }
        mymusic_a();

    }

})
//格式化歌曲时长
function getDuring_a(t) {
    let minutes = Math.trunc(parseInt((t % (1000 * 60 * 60)) / (1000 * 60))) // 计算分钟
    let seconds = Math.trunc((t % (1000 * 60)) / 1000); // 计算秒数
    let getTime = minutes + `:` + seconds;
    // console.log(getTime);
    return (getTime);
}
