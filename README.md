# Slider IO

## What is this?

Slider IO is a versatil Items Slider Component.

## What items are supported?

An 'item' can be anything as long as the component keeps the basic HTML structure provided in order to work.

## Usage

To use the Slider component include the _slider-io.css_ and _slider-io.js_ in your project, and the HTML needed.

The Slider HTML consist in an outer container, the 2 controls (left and right), the inner container, and the items themselves. Like this:

Example with 3 items:

```
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

## Can I see a working example?

Yes! In [this](https://mfigueira.github.io/slider-io/) link you can find examples with different amounts of items into the slider container, to show the flexible behavior.
