document.querySelector('.img1').src='./images/dice6.png';
document.querySelector('.img2').src='./images/dice6.png';
var randomNumber1=Math.floor(Math.random()*6)+1;
document.querySelector('.img1').src='./images/dice'+randomNumber1+'.png';
var randomNumber2=Math.floor(Math.random()*6)+1;
document.querySelector('.img2').src='./images/dice'+randomNumber2+'.png';
if (randomNumber1>randomNumber2) {
    document.querySelector('h1').innerText='Player 1 wins!';
}; 
if (randomNumber1<randomNumber2) {
        document.querySelector('h1').innerText='Player 2 wins!';
    } ;
if(randomNumber1===randomNumber2) {
        document.querySelector('h1').innerText='Draws!';
    };
