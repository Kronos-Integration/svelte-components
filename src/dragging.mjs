export function makeDraggable(el, cb) {
  let svg = el;
  while (svg && svg.tagName != "svg") svg = svg.parentNode;
  const pt = svg.createSVGPoint(),
    doc = svg.ownerDocument;

  const root = doc.rootElement || doc.body || svg;
  let xlate, txStartX, txStartY, mouseStart;
  let xforms = el.transform.baseVal;

  el.addEventListener("pointerdown", startMove, false);

  function startMove(evt) {
    // We listen for mousemove/up on the root-most
    // element in case the mouse is not over el.
    root.addEventListener("pointermove", handleMove, false);
    root.addEventListener("pointerup", finishMove, false);

    // Ensure that the first transform is a translate()
    xlate = xforms.numberOfItems > 0 && xforms.getItem(0);
    if (!xlate || xlate.type != SVGTransform.SVG_TRANSFORM_TRANSLATE) {
      xlate = xforms.createSVGTransformFromMatrix(svg.createSVGMatrix());
      xforms.insertItemBefore(xlate, 0);
    }
    txStartX = xlate.matrix.e;
    txStartY = xlate.matrix.f;
    mouseStart = inElementSpace(evt);
    fireEvent("dragstart");
  }

  function handleMove(evt) {
    const point = inElementSpace(evt);
    xlate.setTranslate(
      Math.round(txStartX + point.x - mouseStart.x),
      Math.round(txStartY + point.y - mouseStart.y)
    );
    fireEvent("drag");
  }

  function finishMove(evt) {
    root.removeEventListener("pointermove", handleMove, false);
    root.removeEventListener("pointerup", finishMove, false);
    fireEvent("dragend");

    cb(xlate.matrix.e, xlate.matrix.f);
  }

  function fireEvent(eventName) {
    const event = new Event(eventName);
    event.detail = { x: xlate.matrix.e, y: xlate.matrix.f };
    return el.dispatchEvent(event);
  }

  // Convert mouse position from screen space to coordinates of el
  function inElementSpace(evt) {
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(el.parentNode.getScreenCTM().inverse());
  }
}
