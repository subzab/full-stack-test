function solution(S) {
  let count = 0;
  for (let i = 0; i < S.length; i++) {
    if (S[i] === S[i + 1]) {
      count++;
    }
  }
  return count;
}

console.log(solution("RRG"));
console.log(solution("RRRRR"));
console.log(solution("BRBG"));
