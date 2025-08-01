const bCalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const iCalls = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const nCalls = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const gCalls = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
const oCalls = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];

const BINGO_COLUMNS = [
  { letter: "B", range: [1, 15], calls: bCalls, color: "bg-simple-gold/20" },
  { letter: "I", range: [16, 30], calls: iCalls, color: "bg-simple-gold/20" },
  { letter: "N", range: [31, 45], calls: nCalls, color: "bg-simple-gold/20" },
  { letter: "G", range: [46, 60], calls: gCalls, color: "bg-simple-gold/20" },
  { letter: "O", range: [61, 75], calls: oCalls, color: "bg-simple-gold/20" },
];
export default BINGO_COLUMNS;