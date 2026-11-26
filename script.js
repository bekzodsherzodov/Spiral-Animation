const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
const S = 1000;
cv.width = S;
cv.height = S;
const scale = S / 560;
const colors = ['hotpink', 'white', 'violet'];
const rad = d => d * Math.PI / 180;

// turtle'dagi circle(r, extent): chapga burilib yoy chizadi
function arc(pt, r, extent) {
  const cx = pt.x + r * Math.cos(rad(pt.h + 90));
  const cy = pt.y + r * Math.sin(rad(pt.h + 90));
  const start = pt.h - 90;
  const steps = 40;
  for (let k = 1; k <= steps; k++) {
    const ang = rad(start + extent * k / steps);
    const x = cx + r * Math.cos(ang);
    const y = cy + r * Math.sin(ang);
    ctx.lineTo(S / 2 + x * scale, S / 2 - y * scale);
  }
  pt.h += extent;
  const ang = rad(pt.h - 90);
  pt.x = cx + r * Math.cos(ang);
  pt.y = cy + r * Math.sin(ang);
}

function reset() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, S, S);
}

let a = 0;

function step() {
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    ctx.strokeStyle = colors[i % 3];
    const pt = { x: 0, y: 0, h: i * 30 + a };   // home + setheading
    const r = 80 + 40 * Math.sin(a / 15);
    ctx.beginPath();
    ctx.moveTo(S / 2, S / 2);
    arc(pt, r, 120);     // circle(r, 120)
    pt.h += 120;         // lt(120)
    arc(pt, r, 120);     // circle(r, 120)
    ctx.stroke();
  }
  a++;
}

reset();
let last = 0;
let waiting = false;

function loop(t) {
  if (t - last > 60) {            // tezlik (ms)
    last = t;
    if (a < 70) {
      step();
    } else if (!waiting) {        // tugagach 2.5 s kutib, qaytadan boshlaydi
      waiting = true;
      setTimeout(() => { reset(); a = 0; waiting = false; }, 2500);
    }
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);