export const SERVICES = "_SERVICES";
export const SERVICE = "_SERVICE";
export const ENDPOINT = "_ENDPOINT";
export const INTERCEPTOR = "_INTERCEPTOR";

export function connectionPath(from, to) {
  const fx = from.x + from.owner.x;
  const fy = from.y + from.owner.y;
  const tx = to.x + to.owner.x;
  const ty = to.y + to.owner.y;
  const rx = from.rx || 16; //TODO why
  return `M${fx} ${fy}H${fx + rx}V${ty}H${tx + 2}`;
}
