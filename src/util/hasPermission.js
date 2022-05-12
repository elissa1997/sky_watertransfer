export function hasPermission(who, perList) {
  if (who) {
    return perList.indexOf(who) != -1;
  }
  return false;
}