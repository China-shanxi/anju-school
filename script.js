// 轮播图逻辑
const items = document.querySelectorAll('.banner-item');
const dots = document.querySelectorAll('.dot');
let index = 0;

function changeBanner(i) {
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    items[i].classList.add('active');
    dots[i].classList.add('active');
}

// 自动轮播
function autoPlay() {
    index++;
    if(index >= items.length) index = 0;
    changeBanner(index);
}
setInterval(autoPlay, 4000);

// 点击小圆点切换
dots.forEach((dot, i)=>{
    dot.onclick = ()=>{
        index = i;
        changeBanner(i);
    }
})

// 导航平滑滚动
document.querySelectorAll('.nav-menu a').forEach(link=>{
    link.onclick = function(e){
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetDom = document.querySelector(targetId);
        targetDom.scrollIntoView({behavior:"smooth"})
    }
})
