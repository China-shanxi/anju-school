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
// 家校留言板功能
const msgUser = document.getElementById('msgUser');
const msgText = document.getElementById('msgText');
const sendMsg = document.getElementById('sendMsg');
const msgList = document.getElementById('msgList');

// 读取本地留言
function loadMessage(){
    const arr = JSON.parse(localStorage.getItem('schoolMsg')) || [];
    msgList.innerHTML = "";
    if(arr.length === 0){
        msgList.innerHTML = "<p style='text-align:center;color:#666;'>暂无留言，快来发布第一条吧</p>";
        return;
    }
    arr.forEach(item=>{
        const div = document.createElement('div');
        div.style.background="#fff";
        div.style.border="1px solid #e8f1fc";
        div.style.borderRadius="8px";
        div.style.padding="16px";
        div.style.marginBottom="14px";
        div.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                <span style="font-weight:bold;color:#0056b3;">${item.name}</span>
                <span style="font-size:13px;color:#888;">${item.time}</span>
            </div>
            <p style="color:#333;line-height:1.7;">${item.content}</p>
        `;
        msgList.appendChild(div);
    })
}
// 页面加载读取留言
loadMessage();

// 提交留言
sendMsg.onclick = function(){
    const name = msgUser.value.trim();
    const text = msgText.value.trim();
    if(!name){
        alert("请填写称呼");
        return;
    }
    if(!text){
        alert("请输入留言内容");
        return;
    }
    const data = {
        name:name,
        content:text,
        time:new Date().toLocaleString()
    }
    let list = JSON.parse(localStorage.getItem('schoolMsg')) || [];
    list.unshift(data); //新留言放最顶部
    localStorage.setItem('schoolMsg',JSON.stringify(list));
    loadMessage();
    msgUser.value = "";
    msgText.value = "";
    alert("留言发布成功！");
}
