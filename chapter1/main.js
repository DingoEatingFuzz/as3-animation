import './main.css';

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
const { width, height } = cvs.getBoundingClientRect();

canvas.width = width * window.devicePixelRatio;
canvas.height = height * window.devicePixelRatio;

ctx.fillStyle = 'red';
ctx.rect(200, 200, 300, 150);
ctx.fill();
