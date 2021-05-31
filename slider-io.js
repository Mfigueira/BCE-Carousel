const BREAKPOINT_SMALL = `(max-width:${425}px)`;
const BREAKPOINT_LARGE = `(min-width:${768}px)`;

const smallScreen = () => window.matchMedia(BREAKPOINT_SMALL).matches;
const largeScreen = () => window.matchMedia(BREAKPOINT_LARGE).matches;

document.querySelectorAll('.sio-container').forEach(el => {
  const inner = el.querySelector('.sio-inner');
  const items = el.querySelectorAll('.sio-item');
  const count = items.length;
  const btnNext = el.querySelector('.next .sio-controls-btn');
  const btnPrev = el.querySelector('.prev .sio-controls-btn');

  if (count > 3) {
    const setInnerWidth = () =>
      (inner.style.width = `${
        (count + 1) * (smallScreen() ? 100 : largeScreen() ? 33.3333 : 50)
      }%`);
    window.addEventListener('resize', setInnerWidth);
    setInnerWidth();
  }

  if (count > 1)
    inner.insertAdjacentElement('afterbegin', items[count - 1].cloneNode(true));

  el.classList.add(`items-${count}`);

  const slideStart = ml => {
    inner.style.transition = 'margin 400ms';
    inner.style.marginLeft =
      ml ?? `-${smallScreen() ? 200 : largeScreen() ? 66.6667 : 100}%`;
  };

  const slideEnd = next => {
    const items = el.querySelectorAll('.sio-item');
    inner.style.transition = inner.style.marginLeft = '';
    items[next ? 0 : items.length - 1].remove();
    inner.insertAdjacentElement(
      next ? 'beforeend' : 'afterbegin',
      items[next ? 1 : items.length - 2].cloneNode(true)
    );
  };

  const goNext = () => slideStart() || setTimeout(slideEnd, 400, true);
  const goPrev = () => slideStart(0) || setTimeout(slideEnd, 400, false);

  btnNext.addEventListener('click', goNext);
  btnPrev.addEventListener('click', goPrev);
});
