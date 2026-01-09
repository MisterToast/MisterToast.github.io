import { openMenu } from "./menus/hitMenu.js";

const board = document.querySelector(".board");
const wrapper = document.querySelector(".board-wrapper");

const segments = [20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5];

segments.forEach((num, i) => {
    const slice = document.createElement("button");
    slice.className = "slice";
    slice.style.setProperty("--i", i);
    slice.onclick = () => openMenu(num);
    board.appendChild(slice);
});

const bull = document.createElement("button");
bull.className = "bull";
bull.onclick = () => openMenu("BULL");
board.appendChild(bull);

// add numeric labels on the outer ring to indicate segment numbers
const labelEls = [];
segments.forEach((num, i) => {
    const lbl = document.createElement('div');
    lbl.className = 'segment-label';
    lbl.dataset.i = i;
    const inner = document.createElement('span');
    inner.className = 'label-text';
    inner.textContent = num;
    lbl.appendChild(inner);
    wrapper.appendChild(lbl); // append to wrapper, not board, so overflow:hidden doesn't clip them
    labelEls.push({lbl, inner, i});
});

/* RESPONSIVE BOARD SIZE */
function resizeBoard() {
    // use the smaller of wrapper's width or height to keep board within bounds
    const size = Math.min(
        wrapper.clientWidth,
        wrapper.clientHeight
    );
    board.style.width = size + "px";
    board.style.height = size + "px";

    // position segment labels exactly on the dark ring
    const borderSize = 44; // must match CSS border width
    const radius = size / 2;
    // push labels to the outer edge of the ring
    const distance = radius - (borderSize / 2);
    labelEls.forEach(({lbl, inner, i})=>{
        const angle = i * 18; // degrees
        // place label by rotating the container and translating outwards by pixel distance
        lbl.style.transform = `translate(-50%,-50%) rotate(${angle}deg) translateY(-${distance}px)`;
        // rotate inner text back so it's readable
        inner.style.transform = `rotate(${-angle}deg)`;
    });
}

window.addEventListener("resize", resizeBoard);
resizeBoard();
