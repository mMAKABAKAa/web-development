document.querySelectorAll('button').forEach(element => {
    element.addEventListener('click',function (){
        makeSound(this.innerHTML);
        buttonAnimation(this.innerHTML);
    });
});

document.addEventListener('keypress',function(event){
    makeSound(event.key);
    buttonAnimation(event.key);
});
function makeSound(key){
    switch (key) {
        case 'w':
        var w=new Audio('./sounds/crash.mp3');
        w.play();
            break;
        case 'a':
        var audio=new Audio('./sounds/kick-bass.mp3');
        audio.play();
            break;
            case 's':
        var audio=new Audio('./sounds/snare.mp3');
        audio.play();
            break;
            case 'd':
        var audio=new Audio('./sounds/tom-1.mp3');
        audio.play();
            break;
            case 'j':
        var audio=new Audio('./sounds/tom-2.mp3');
        audio.play();
            break;
            case 'k':
        var audio=new Audio('./sounds/tom-3.mp3');
        audio.play();
            break;
            case 'l':
        var audio=new Audio('./sounds/tom-4.mp3');
        audio.play();
            break;
        default:
            console.log(this.innerHTML);
            break;
    }
}

function buttonAnimation(currentKey){
    var activeButton=document.querySelector("."+currentKey);
    activeButton.classList.add('pressed');
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },100);
}