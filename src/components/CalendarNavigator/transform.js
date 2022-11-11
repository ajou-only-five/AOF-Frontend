const ITEM_DISTANCE = 52.8;
const ITEM_ANGLE = -45;
// const CENTER_ITEM_POP = 100;
const CENTER_ITEM_POP = 0;
const CENTER_ITEM_DISTANCE = 21.12;

export function setTransform(el, xpos, ypos, zpos, yAngle) {
  el.style.transform = `translateX(${xpos * 1.5}px) translateY(${
    ypos * 30
  }px) translateZ(${zpos}px) rotate(${yAngle}deg)`;
  el.style.zIndex = `${999 - ypos}`;
}

export function target(items, index) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (i === index) setTransform(item, -66, 0, CENTER_ITEM_POP, 0);
    else if (i < index)
      setTransform(
        item,
        (i - index) * ITEM_DISTANCE - CENTER_ITEM_DISTANCE - 66,
        index - i,
        0,
        // -ITEM_ANGLE
        (360 / items.length) * (i - index)
      );
    else
      setTransform(
        item,
        (i - index) * ITEM_DISTANCE + CENTER_ITEM_DISTANCE - 66,
        i - index,
        0,
        // ITEM_ANGLE
        (360 / items.length) * (i - index)
      );
  }
}
