import { handleHit } from "../game/throws.js";

const overlay = document.getElementById("menuOverlay");
const menu = document.getElementById("menu");
let lastHit = null;

export function openMenu(hit){
    lastHit = hit;
    menu.innerHTML = "";
    // mark menu as hit-menu so CSS can make buttons large and vertical
    menu.classList.add('hit-menu');
    // create a horizontal button row so buttons are adjacent
    const row = document.createElement('div');
    row.className = 'menu-btn-row';

    if(hit === "BULL"){
        ['SBull','DBull'].forEach(l=> row.appendChild(makeBtn(l)));
    } else {
        ['S'+hit,'D'+hit,'T'+hit].forEach(l=> row.appendChild(makeBtn(l)));
    }

    menu.appendChild(row);
    overlay.classList.remove("hidden");
}

function makeBtn(label){
    const b = document.createElement('button');
    b.textContent = label;
    b.onclick = ()=>{
        overlay.classList.add('hidden');
        menu.classList.remove('hit-menu');
        handleHit(lastHit,label);
    };
    return b;
}
overlay.onclick = ()=> {
    overlay.classList.add("hidden");
    menu.classList.remove('hit-menu');
}
menu.onclick = e => e.stopPropagation();
