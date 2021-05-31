const CLASS_ONE_ITEM = "one-item";
const CLASS_TWO_ITEMS = "two-items";
const CLASS_THREE_ITEMS = "three-items";
const DATA_ID = "data-bceid";
const BREAKPOINT_LARGE = 1200;
const BREAKPOINT_SMALL = 768;

const isMobile = () => {
  const m = window.matchMedia("(min-width:" + BREAKPOINT_SMALL + "px)");
  return !m.matches ? true : false;
};

const isLargeSize = () => {
  const m = window.matchMedia("(min-width:" + BREAKPOINT_LARGE + "px)");
  return m.matches ? true : false;
};

const setInnerWidth = (a, b) => {
  if (isMobile()) {
    a.style.width = (b + 1) * 100 + "%";
  } else if (isLargeSize()) {
    a.style.width = (b + 1) * 33.3333 + "%";
  } else {
    a.style.width = (b + 1) * 50 + "%";
  }
  return;
};

const goNext = (n, data, i) => {
  document
    .querySelector(`.bce-inner[${data}="${i}"]`)
    .animate({ marginLeft: n }, 500, function () {
      document
        .querySelector(`.bce-inner[${data}="${i}"] .bce-item:first-child`)
        .remove();
      document
        .querySelector(`.bce-inner[${data}="${i}"] .bce-item:first-child`)
        .clone()
        .insertAfter(`.bce-inner[${data}="${i}"] .bce-item:last-child`);
      document
        .querySelector(`.bce-inner[${data}="${i}"]`)
        .css("margin-left", "");
    });
};

const goPrev = (data, i) => {
  document
    .querySelector(`.bce-inner[${data}="${i}"]`)
    .animate({ marginLeft: 0 }, 500, function () {
      document
        .querySelector(`.bce-inner[${data}="${i}"] .bce-item:last-child`)
        .remove();
      document
        .querySelector(`.bce-inner[${data}="${i}"] .bce-item:last-child`)
        .clone()
        .insertBefore(`.bce-inner[${data}="${i}"] .bce-item:first-child`);
      document
        .querySelector(`.bce-inner[${data}="${i}"]`)
        .css("margin-left", "");
    });
};

document.querySelectorAll(".bce-component").forEach((el, i) => {
  const inner = el.querySelector(".bce-inner");
  const items = el.querySelectorAll(".bce-item");
  const controls = el.querySelectorAll(".bce-controls");

  el.dataset.bceid = i;
  inner.dataset.bceid = i;
  controls.forEach((c) => (c.dataset.bceid = i));

  const nextBtn = el.querySelector(".bce-controls.next .bce-controls-btn");
  const prevBtn = el.querySelector(".bce-controls.prev .bce-controls-btn");

  cloneItem = () => {
    const lastItem = inner.querySelector(".bce-item:last-child");
    inner
      .querySelector(".bce-item:first-child")
      .insertAdjacentElement("beforebegin", lastItem);
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
    window.onresize = () => {
      setInnerWidth(inner, items.length);
    };
    setInnerWidth(inner, items.length);
    cloneItem();
  }

  nextBtn.addEventListener("click", (e) => {
    if (!e.target.closest(".bce-controls").style.visibility) {
      if (isMobile()) goNext("-200%", DATA_ID, i);
      else if (isLargeSize()) goNext("-66.6667%", DATA_ID, i);
      else goNext("-100%", DATA_ID, i);
    }
  });

  prevBtn.addEventListener("click", (e) => {
    if (!e.target.closest(".bce-controls").style.visibility) goPrev(DATA_ID, i);
  });
});
