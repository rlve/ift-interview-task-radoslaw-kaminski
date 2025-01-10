const response = await fetch("https://bun.sh");
const html = await response.text(); // HTML string

console.log(html);
