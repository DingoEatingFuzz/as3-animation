import './main.css';
import Rect from './rect';

const dpi = window.devicePixelRatio;
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d', { willReadFrequently: true })
const { width, height } = cvs.getBoundingClientRect();
const bgCvs = new OffscreenCanvas(width * dpi, height * dpi);
const bgCtx = bgCvs.getContext('2d', { willReadFrequently: true });

const num = (a, b) => a - b;

canvas.width = width * dpi;
canvas.height = height * dpi;

let mx = 0;
let my = 0;

function render(ctx) {
  ctx.fillStyle = 'red';
  ctx.translate(800, 400);
  ctx.fill(star(200));
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const myStar = star(140);
  bgCtx.clearRect(0, 0, width * dpi, height * dpi);
  bgCtx.translate(mx, my);
  bgCtx.fill(myStar);

  const rA = new Rect(800 - 200, 400 - 200, 800 + 200, 400 + 200);
  const rB = new Rect(mx - 140, my - 140, mx + 140, my + 140);
  const intersection = rectIntersect(rA, rB);

  if (intersection) {
    ctx.beginPath()
    ctx.rect(intersection.x, intersection.y, intersection.width, intersection.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();
  }

  const collides = bHitTest(
    ctx, bgCtx, rA, rB
  );

  ctx.fillStyle = 'blue';

  ctx.translate(mx, my);
  ctx.fill(star(135));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

draw(cvs, ctx, render);

cvs.addEventListener('mousemove', ev => {
  mx = ev.offsetX * dpi;
  my = ev.offsetY * dpi;
  render(ctx);
});

function rectIntersect(a, b) {
  // The intersection of a rectangle the is the area between b.width and a.x
  // and b.height and a.y
  if (a.y2 <= b.y || b.y2 <= a.y || a.x2 <= b.x || b.x2 <= a.x) {
    // No overlap
    return null;
  }

  const [y1, y2] = [a.y, a.y2, b.y, b.y2].sort(num).slice(1, 3);
  const [x1, x2] = [a.x, a.x2, b.x, b.x2].sort(num).slice(1, 3);

  if (y2 - y1 < 1 || x2 - x1 < 1) return null;

  return new Rect(x1, y1, x2, y2);
}

function bHitTest(ctxA, ctxB, a, b) {
  const i = rectIntersect(a, b);
  if (!i) return false;

  const a32 = new Uint32Array(ctxA.getImageData(i.x, i.y, i.width, i.height).data.buffer);
  const b32 = new Uint32Array(ctxB.getImageData(i.x, i.y, i.width, i.height).data.buffer);

  for (let idx = 0; idx < a32.length; idx++) {
    // console.log(a32[idx], b32[idx]);
  }
}

function star(radius) {
  const p = new Path2D();
  p.moveTo(radius, 0);
  for (let i = 0; i < 11; i++) {
    let r = i % 2 > 0 ? radius / 2 : radius;
    let angle = Math.PI * 2 / 10 * i;
    p.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  return p;
}

function draw(canvas, ctx, fn) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fn(ctx);
  requestAnimationFrame(() => draw(canvas, ctx, fn));
}
