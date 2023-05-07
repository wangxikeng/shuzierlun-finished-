window.onload = function () {
    //封装get 请求
    let get = function (url, data, callback) {
        let xhr = new XMLHttpRequest();
        let param = '?';
        //遍历数据对象
        for (let key in data) {
            //找到属于自己的属性
            if (data.hasOwnProperty(key)) {
                //开始拼接地址
                param += key + '=' + data[key] + '&';
            }
        }
        //截取地址
        param = param.slice(0, param.length - 1);
        xhr.open('get', url + param);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                if (callback) {
                    callback(JSON.parse(xhr.response));
                }
            }
        }

    }
    //建立一个搜索函数
    let search = function (keywords, callback) {
        get('http://localhost:3000/search', { keywords: keywords }, function (res) {
            if (callback) {
                //获得歌曲
                callback(res.result.songs);
            }
        })
    }
    //播放封装
    let getSongUrl = function (id, callback) {
        get('http://localhost:3000/song/url', { id: id }, function (res) {
            //音乐播放连接
            if (callback) {
                callback(res.data[0].url);
            }
        })
    }
    //渲染html
    let resultList = document.getElementById('result-list');
    let resultList_dex = 0;
    let result_list = document.getElementById('result-list');
    let renderSearchList = function (key) {
        search(key, function (res) {
            for (let i = 0; i < res.length; i++) {
                let resultList_curdex = (resultList_dex++);
                let result_list_li = document.createElement('li');

                result_list_li.dataset.id = res[i].id;
                result_list_li.className = 'songs'
                //console.log(result_list_li);
                result_list_li.innerHTML = `
                <div class="songlist__item">
                        <div class="songlist__number">
                       ${resultList_curdex + 1}
                    </div>
                    <div class="songlist__songname">
                        <span class="songlist__songname_txt">
                            ${res[i].name}
                        </span>
                    </div>
                    <div class="songlist__artist">
                        <a class="playlist__author">${res[i].artists[0].name}</a>
                    </div>
                    <div class="songlist__album">
                        <a>${res[i].album.name}</a>
                    </div>
                </div>
                </div>`
                result_list.appendChild(result_list_li)
              
            }
            addEventListener();
        })
    }
    //获取Input 里的内容
    let searchButton = document.getElementById('search-button');
    let keywordInput = document.getElementById('keyword');
    searchButton.addEventListener('click', function () {
        result_list.innerHTML = '';
        let value = keywordInput.value;
        //；console.log(value);
        renderSearchList(value);
    })
    //点击音乐进行播放
    let audio = document.getElementById('audio');
    //做一个li 点击事件
    let addEventListener = function () {
        let songs = document.getElementsByClassName('songs');
        for (let i = 0; i < songs.length; i++) {
            songs[i].addEventListener('click', function () {
                let id = parseInt(this.dataset.id);
                //通过getSongUrl 播放音乐
                getSongUrl(id, function (url) {
                    //通过src来播放
                    audio.src = url;
                    audio.play();
                    //   closeSearchList();
                })

            })
        }
    }

}