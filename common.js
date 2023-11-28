console.log('%c ( ̳• ·̫ • ̳)', 'color: #A594F9; font-size:24px; font-weight:700;');

const date = new Date();
console.log(date.getDay())

const canvas = document.getElementById('jsCanvas');
const context = canvas.getContext('2d');
const pastels = document.querySelectorAll('.pastels');
const pastel = document.querySelector('.pastel');
const pastelList = document.querySelectorAll('.pastels div');
const eraser = document.getElementById('eraser');
const resetBtn = document.querySelector('.resetBtn');
const test = document.querySelector('.pastels')

let effect = new Audio('sound/btnSnd_1.mp3');

canvas.width = 1310;
canvas.height = 550;


function distanceBetween(point1, point2){ // point1, point2 사이의 거리 계산
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2){ // point1, point2 사이의 각도 계산
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

var canv = document.getElementById('jsCanvas');
var ctx = canv.getContext('2d');

ctx.globalAlpha = "0.2";
ctx.lineWidth = 2;
ctx.globalCompositeOperation = "source-over"; 

var isDrawing, lastPoint;

canv.onmousedown = function(e){ // 마우스를 눌렀을 때
    isDrawing = true;
    lastPoint = { x: e.offsetX, y: e.offsetY };
};

canv.onmousemove = function(e){ // 마우스를 움직일 때
    if (!isDrawing) return;
    
    var currentPoint = { x: e.offsetX, y: e.offsetY };
    var dist = distanceBetween(lastPoint, currentPoint);
    var angle = angleBetween(lastPoint, currentPoint);
    
    for(var i = 0; i < dist; i+=1){
      x = lastPoint.x + (Math.sin(angle) * i);
      y = lastPoint.y + (Math.cos(angle) * i);
    ctx.beginPath();
      ctx.arc(x+10, y+10, 2, false, Math.PI * 10, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    }
    
    
    lastPoint = currentPoint; // 마우스 위치 현재 위치로 이동
};

canv.onmouseup = function(){ // 마우스를 뗐을 때
    isDrawing = false; // 그리기 멈춤
};


// 색상 변경

pastels.forEach(function(color){
    color.addEventListener('click', changeColor);
})

function changeColor(event){
    console.log(event.target.id);
    const color = event.target.dataset.color;
    context.strokeStyle = color;
    context.fillStyle = color;
    effect.play();
}


// 파스텔 클릭했을 때 효과 주기

pastelList.forEach(function(item){
    item.addEventListener('click',
    function(){
        pastelList.forEach(function(event){
            event.classList.remove('active'); // 원래대로 돌려놓기
        })
        item.classList.add('active'); // 선택한 요소만 효과 주기
    })
})


// 브러시 기본 설정

context.lineCap = 'round';
context.lineJoin = 'round';


// 브러시 두께 설정

test.addEventListener('click', a);
function a(event){
    let target = event.target;

    tClass = target.classList[0]
    console.log(tClass)

    if(tClass == 'pastel'){
        context.lineWidth = 2;
    }else{
        context.lineWidth = 20;
    }
}



// 2 출석체크

const attBoxBottom = document.querySelector('#attBoxBottom')
const attCheck = document.querySelector('#attCheck')
const day = document.querySelector('#day')
const dayNum = document.querySelector('#dayNum')

attCheck.addEventListener('mouseup',function(){ // 출석하기 버튼 눌렀다 뗐을 때

    // const date = new Date();
    // let currentDate = date.getDay();
    // if(currentDate == 1)

    // document.querySelector('#mon').style.background = '#a7b7ff';
    // document.querySelector('#mon').style.color = '#fff'; <-- 요일 체크

    document.querySelector('#mon').style.background = '#a7b7ff';
    document.querySelector('#mon').style.color = '#fff';

    attCheck.style.background = '#a7b7ff';
    attCheck.style.boxShadow = '0 5px 0 #939df6';

    attBtnChange();
    attDayChange();
})

function attBtnChange(){ // 출석하기 버튼 눌렀을 때 텍스트 변경
    attCheck.innerText = "출석 완료!";
}
function attDayChange(){ // n일째(+1)
    dayNum.innerText = "1";
}


// 3 오늘의 할 일

const inputBox = document.querySelector('#inputBox');
const list = document.querySelector('#todoList');

inputBox.addEventListener('keyup',function(e){

    userMessage = inputBox.value.trim();
    if(!userMessage)return;
    if(e.keyCode === 13){ // 엔터키 누를 경우
        addItem(this.value) // 입력한 텍스트 투두리스트에 추가
        this.value = '' // 텍스트 입력란 비우기
    }
})

const addItem = (inputBox) => {

    const listItem = document.createElement('li');
    listItem.innerHTML = `${inputBox}<i class="checkbox"><a class="material-symbols-outlined">done</a></i><i class="remove"><a class="material-symbols-outlined">cancel</a></i>`;

    listItem.addEventListener('click',function(){
        this.classList.toggle('check')
    })
    listItem.querySelector('.remove').addEventListener('click',function(){
        listItem.remove();
    })
    
    list.appendChild(listItem);

    list.scrollTo(0,list.scrollHeight);
}


window.onload = scriptChange;

function scriptChange(){ // 텍스트 입력 예시 문구 랜덤 출력

    var list = ['국어 모의고사 오답 풀이하기','영단어 암기하기','미분법 개념 정리하기','똥 싸기']
    const inputs = document.querySelectorAll('input')
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomValue = list[randomIndex]

    inputs.forEach(input => {
        inputBox.placeholder = randomValue;
    })
};

inputBox.addEventListener('mousedown',function(){ // 텍스트 입력란 클릭할 경우 예시 문구 삭제

    inputBox.placeholder = '';
})


// 4 프로필 사진 변경

const profilePic = document.getElementById('profilePic');
const inputFile = document.getElementById('input-file');

inputFile.onchange = function(){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}