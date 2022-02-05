const str = "Hello World";
const base = "SGVsbG8gV29ybGQ=";

const conB = Buffer.from(str, "utf8").toString("base64");
const conS = Buffer.from(base, "base64").toString("utf8");

console.log(conB);
console.log(conS);
