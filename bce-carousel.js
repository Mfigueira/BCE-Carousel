const CLASS_ONE_ITEM = "one-item";
const CLASS_TWO_ITEMS = "two-items";
const CLASS_THREE_ITEMS = "three-items";
const DATA_ID = "data-bceid";
const BREAKPOINT_LARGE = 768;
const BREAKPOINT_SMALL = 425;

const isMobile = () =>
  window.matchMedia("(max-width:" + BREAKPOINT_SMALL + "px)").matches;

const isLargeSize = () =>
  window.matchMedia("(min-width:" + BREAKPOINT_LARGE + "px)").matches;

document.querySelectorAll(".bce-component").forEach((el) => {
  const inner = el.querySelector(".bce-inner");
  const items = el.querySelectorAll(".bce-item");
  const controls = el.querySelectorAll(".bce-controls");

  const nextBtn = el.querySelector(".bce-controls.next .bce-controls-btn");
  const prevBtn = el.querySelector(".bce-controls.prev .bce-controls-btn");

  cloneItem = () => {
    const lastItemClone = items[items.length - 1].cloneNode(true);
    inner.insertAdjacentElement("afterbegin", lastItemClone);
  };

  if (items.length === 1) {
    el.classList.add(CLASS_ONE_ITEM);
    inner.classList.add(CLASS_ONE_ITEM);
    items.forEach((item) => item.classList.add(CLASS_ONE_ITEM));
    controls.forEach((c) => c.classList.add(CLASS_ONE_ITEM));
  } else if (items.length === 2) {
    inner.classList.add(CLASS_TWO_ITEMS);
    items.forEach((item) => item.classList.add(CLASS_TWO_ITEMS));
    controls.forEach((c) => c.classList.add(CLASS_TWO_ITEMS));
    cloneItem();
  } else if (items.length === 3) {
    inner.classList.add(CLASS_THREE_ITEMS);
    controls.forEach((c) => c.classList.add(CLASS_THREE_ITEMS));
    cloneItem();
  } else {
    const setInnerWidth = (itemsCount) =>
      (inner.style.width = `${
        ++itemsCount * (isMobile() ? 100 : isLargeSize() ? 33.3333 : 50)
      }%`);
    window.addEventListener("resize", () => setInnerWidth(items.length));
    setInnerWidth(items.length);
    cloneItem();
  }

  const slideStart = (ml) => {
    inner.style.transition = "margin 400ms";
    inner.style.marginLeft = ml;
  };

  const slideEnd = (next) => {
    const items = el.querySelectorAll(".bce-item");
    inner.style.transition = inner.style.marginLeft = "";
    items[next ? 0 : items.length - 1].remove();
    inner.insertAdjacentElement(
      next ? "beforeend" : "afterbegin",
      items[next ? 1 : items.length - 2].cloneNode(true)
    );
  };

  const goNext = (ml) => slideStart(ml) || setTimeout(slideEnd, 400, true);

  const goPrev = () => slideStart(0) || setTimeout(slideEnd, 400, false);

  nextBtn.addEventListener("click", (e) => {
    if (!e.target.closest(".bce-controls").style.visibility) {
      if (isMobile()) goNext("-200%");
      else if (isLargeSize()) goNext("-66.6667%");
      else goNext("-100%");
    }
  });

  prevBtn.addEventListener("click", (e) => {
    if (!e.target.closest(".bce-controls").style.visibility) goPrev();
  });
});
