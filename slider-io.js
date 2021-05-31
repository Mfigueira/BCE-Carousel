const BREAKPOINT_LARGE = 768;
const BREAKPOINT_SMALL = 425;

const smallScreen = () =>
  window.matchMedia(`(max-width:${BREAKPOINT_SMALL}px)`).matches;

const largeScreen = () =>
  window.matchMedia(`(min-width:${BREAKPOINT_LARGE}px)`).matches;

document.querySelectorAll('.bce-component').forEach(el => {
  const inner = el.querySelector('.bce-inner');
  const items = el.querySelectorAll('.bce-item');
  const count = items.length;
  const nextBtn = el.querySelector('.next .bce-controls-btn');
  const prevBtn = el.querySelector('.prev .bce-controls-btn');

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
    inner.style.marginLeft = ml;
  };

  const slideEnd = next => {
    const items = el.querySelectorAll('.bce-item');
    inner.style.transition = inner.style.marginLeft = '';
    items[next ? 0 : items.length - 1].remove();
    inner.insertAdjacentElement(
      next ? 'beforeend' : 'afterbegin',
      items[next ? 1 : items.length - 2].cloneNode(true)
    );
  };

  const goNext = ml => slideStart(ml) || setTimeout(slideEnd, 400, true);
  const goPrev = () => slideStart(0) || setTimeout(slideEnd, 400, false);

  nextBtn.addEventListener('click', () =>
    goNext(`-${smallScreen() ? 200 : largeScreen() ? 66.6667 : 100}%`)
  );
  prevBtn.addEventListener('click', goPrev);
});
