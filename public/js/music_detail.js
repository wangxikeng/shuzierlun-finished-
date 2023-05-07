let compressbtn = document.getElementById('compressbtn');
let pagedetail = document.getElementById('pagedetail');
let poster = document.getElementById('poster');
compressbtn.addEventListener('click', function () {
    pagedetail.style.display = "none";

})
poster.addEventListener('click', function () {
    pagedetail.style.display = "block"
})