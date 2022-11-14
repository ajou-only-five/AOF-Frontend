const ITEM_DISTANCE = 52.8;
const CENTER_ITEM_DISTANCE = 21.12;

export function setTransform(el, xpos, ypos, yAngle) {
  el.style.transform = `translateX(${xpos * 1.5}px) translateY(${
    ypos * 40
  }px)  rotate(${yAngle}deg)`;
  el.style.zIndex = `${999 - ypos}`;
}

export function target(items, index) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (i === index) setTransform(item, -66, 0, 0);
    else if (i < index)
      setTransform(
        item,
        (i - index) * ITEM_DISTANCE - CENTER_ITEM_DISTANCE - 66,
        index - i,
        (360 / items.length) * (i - index)
      );
    else
      setTransform(
        item,
        (i - index) * ITEM_DISTANCE + CENTER_ITEM_DISTANCE - 66,
        i - index,
        (360 / items.length) * (i - index)
      );
  }
}
