import { CARDS } from '@/data/journals.data'

const N = CARDS.length
const SPEED = 0.006
const C_W = 294
const C_H = 390
const SPREAD_X = 320
const ROT_Y = 52
const SPREAD_Z = 160
const STAIR_Y = 110
const PCOLORS = ['#00e6fc', '#2b75cc', '#fff', '#00c9ff', '#7b8fff']
let _pid = 0
export const nextPid = () => ++_pid

const KF = `
@keyframes ej_shimmer { 0%{left:-100%} 100%{left:200%} }
@keyframes ej_ripple  { 0%{transform:scale(.5);opacity:.8} 100%{transform:scale(3.5);opacity:0} }
@keyframes ej_holo    { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
@keyframes ej_glow    { 0%,100%{opacity:.45;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.3)} }
@keyframes ej_border  { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes ej_p       { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0} }
@keyframes ej_fadeUp  { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
@media (max-width: 767px) { .ej-carousel { transform: scale(0.72); transform-origin: center top; } }
`

function wrapOffset(raw) {
	let o = raw % N
	if (o > N / 2) o -= N
	if (o < -N / 2) o += N
	return o
}

export { N, SPEED, C_W, C_H, SPREAD_X, ROT_Y, SPREAD_Z, STAIR_Y, PCOLORS, KF, wrapOffset }
