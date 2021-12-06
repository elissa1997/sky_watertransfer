export function centerList(name) {
  // longitude, latitude
  let list = {
    hb: [116.693923, 33.790335],
    sz: [117.173201, 34.162729],
    bb: [117.346236, 33.245351]
  }

  return list[name];
}