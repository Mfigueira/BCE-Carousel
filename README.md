# Slider IO

## What is this?

Slider IO is a versatil Items Slider Component.

## What items are supported?

An 'item' can be anything as long as the component keeps the basic HTML structure provided in order to work.

## How are the items displayed?

The component accepts from 1 to many items (unlimited), and displays on the screen up to 3 items depending on the screen size. Breakpoints are: mobile < 425px < tablet < 768px < desktop.

## Usage

To use the Slider component include the _slider-io.css_ and _slider-io.js_ files in your project. Order matters: for styles include before custom styles, and for js include after HTML has loaded (before end of body, or 'defer' in the head tag).

The HTML that you need to include in you page consist in an outer container, the 2 controls (left and right), the inner items container, and the items themselves. Like this (example with 3 items):

```html
<div class="sio-container">
  <div class="sio-controls prev">
    <button>&larr;</button>
  </div>
  <div class="sio-inner">
    <figure class="sio-item">
      <img class="sio-item-img" src="..." alt="..." />
      <figcaption class="sio-item-caption">...</figcaption>
    </figure>
    <figure class="sio-item">
      <img class="sio-item-img" src="..." alt="..." />
      <figcaption class="sio-item-caption">...</figcaption>
    </figure>
    <figure class="sio-item">
      <img class="sio-item-img" src="..." alt="..." />
      <figcaption class="sio-item-caption">...</figcaption>
    </figure>
  </div>
  <div class="sio-controls next">
    <button>&rarr;</button>
  </div>
</div>
```

Personal style (css) can be added after the base css classes are included into the component.

**You need to at least include the "sio-container", "sio-controls prev", "sio-inner", "sio-item" (1 to many), and the "sio-controls next" for the Slider to work!**

## Can I see a working example?

Sure! In [this](https://mfigueira.github.io/slider-io/) link you can find examples with different amounts of items into the slider container. To see the flexible behavior please try different screen sizes.
