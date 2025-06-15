export default function addSpaceFromEnd(str) {
  return str
    .split("")
    .reverse()
    .join("")
    .replace(/.{3}/g, "$& ")
    .split("")
    .reverse()
    .join("")
    .trim();
}
