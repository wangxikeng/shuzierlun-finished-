
window.onload = function () {
    //封装get请求
    let reindex_b = 0;
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
    get('get', `/top/artists?offset=0&limit=10&timestamp=${new Date().getTime()}`, function (res) {
        let singer_list_b = res.artists;
        // console.log(singer_list_b);
        for (let i = 0; i < singer_list_b.length; i++) {
            //歌手名字
            let singer_list_name = singer_list_b[i].name;
            //歌手id
            let singer_list_id = singer_list_b[i].id;
            //歌手图片
            let singer_list_pic = singer_list_b[i].img1v1Url;
            let singer_list_li = document.createElement('li');
            singer_list_li.dataset.id = singer_list_id;
            singer_list_li.dataset.name = singer_list_name;
            singer_list_li.dataset.url = singer_list_pic;
            singer_list_li.innerHTML = `
        <div class="songer_list_itm_box">
            <a class="songer_list_itm_imgcover" href="javascript:;">
                <img class='songer_list_itm_imgprc' src="${singer_list_pic}" alt="">
            </a>
            <h3 class="songer_list_title">${singer_list_name}</h3>
        </div> `
            singer_list_li.className = "songer_list_lists_itm"
            let songer_list_lists = document.getElementById('songer_list_lists');
            songer_list_lists.appendChild(singer_list_li);

        }
        //跳转页面
        function skip_b() {
            songer_list_lists_b = $('#songer_list_lists').find('li');
            for (let i = 0; i < songer_list_lists_b.length; i++) {
                songer_list_lists_b[i].addEventListener('click', function () {
                    window.location.assign('singer_detail.html')
                })
            }
        }
        skip_b();

    })
    


}

