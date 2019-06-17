var startTouchX = 0;
var startTouchY = 0;
var endTouchX = 0;
var endTouchY = 0;

var touchZone = document.getElementById('slider__list');

touchZone.addEventListener('touchstart', function(event){
    startTouchX = event.changedTouches[0].screenX;
    startTouchY = event.changedTouches[0].screenY;
}, false);

touchZone.addEventListener('touchend', function(event){
    endTouchX = event.changedTouches[0].screenX;
    endTouchY = event.changedTouches[0].screenY;
    controllGesture();
}, false);


function controllGesture(){
    var swiped = 'swiped: ';

    if(endTouchX < startTouchX){
        console.log(swiped + 'left');
    }

    if(endTouchX > startTouchX){
        console.log(swiped+'right');
    }

    if(endTouchY < startTouchY){
        console.log(swiped+'down');
    }

    if(endTouchY > startTouchY){
        console.log(swiped+'up');
    }

    if(endTouchY == startTouchY && endTouchX == startTouchX ){
        console.log('tap');
    }
}

var left = document.querySelector('.slider__btn.left');
var right = document.querySelector('.slider__btn.right');

left.addEventListener('click', moveLeft, false);
right.addEventListener('click', moveRight, false);


function moveLeft(){
    console.log('left');
}

function moveRight(){
    console.log('right');
}