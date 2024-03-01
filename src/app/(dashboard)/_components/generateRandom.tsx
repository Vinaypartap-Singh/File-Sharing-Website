export default function GenerateRandom() {
  const character =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 6;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += character.charAt(Math.floor(Math.random() * character.length));
  }
  return result;
}
