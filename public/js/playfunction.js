//设置播放起，末时间
let time_star = document.querySelector('.time_star');
let changeVAL = 0;
let isDrage = false;//布尔变量
audio.addEventListener('timeupdate', function () {
    //更新时间timeupdate
    // console.log(this.currentTime / this.duration);
    let currentTime = formatTime(this.currentTime);
    let totalTime = formatTime(this.duration);
    //  不拖动状态下
    if (!isDrage) {
        let time_end = document.querySelector('.time_end');
        let process_current = document.getElementById('process_current');
        time_star.innerHTML = `${currentTime.I}:${currentTime.S}`
        time_end.innerHTML = `${totalTime.I}:${totalTime.S}`
        //获取当前歌曲长度的百分比
        let prc = (this.currentTime / this.duration * 100).toFixed(2)
        process_current.style.width = `${prc}%`

    }
})
//拖动进度条 mousedown
let circle = document.getElementById('circle');
circle.addEventListener('mousedown', function (event) {
    // console.log(event.clientX, event.clientY);//得到当前的小圆点坐标
    // console.log(this.getBoundingClientRect().left);//获得盒子最左边的距离
    let disX = event.clientX - this.getBoundingClientRect().left;
    let play_process = document.getElementById("play_process");
    let play_process_ClientRect = play_process.getBoundingClientRect();
    //鼠标按下事件
    let moveArr = function (event) {
        let prc_process = (((event.clientX - disX - play_process_ClientRect.left) / play_process_ClientRect.width) * 100).toFixed(2);
        // console.log(prc_process+`%`);
        //做判断
        prc_process = prc_process < 0 ? 0 : (prc_process > 100 ? 100 : prc_process)
        process_current.style.width = `${prc_process}%`//改变进度条宽度
        //得到当前的拖动时间
        isDrage = true;
        changeVAL = (audio.duration * prc_process / 100).toFixed(2);
        // console.log(changeVAL);
        let changeTime = formatTime(changeVAL);
        time_star.innerHTML = `${changeTime.I}:${changeTime.S}`
    }
    //鼠标按上事件
    let upArr = function () {
        document.removeEventListener('mousemove', moveArr)
        document.removeEventListener('mouseup', upArr)
        isDrage = false;
        audio.currentTime = changeVAL;
        console.log(changeVAL);
    }
    // 作用在文档中 mousmove
    document.addEventListener('mousemove', moveArr)
    //鼠标抬起事件
    document.addEventListener('mouseup', upArr)
})
//格式化时间函数
let formatTime = function (seconds) {
    let h = 0, i = 0, s;
    s = Math.floor(seconds);
    h = Math.floor(s / 3600); h
    i = Math.floor((s % 3600) / 60);
    s = s % 3600 % 60;
    return {
        H: h = h < 10 ? '0' + h : h,
        I: i = i < 10 ? '0' + i : i,
        S: s = s < 10 ? '0' + s : s
    };
}