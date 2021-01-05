function solution(N, A, B, C) {
  const arr = [A, B, C];
  let count = [];
  arr.forEach((i) => {
    arr.forEach((j) => {
      if (i + j === N) {
        count.push(i);
        count.push(j);
      }
    });
  });
  if ([...new Set(arr)].length === 1) {
    return 1;
  }
  return [...new Set(count)].length;
}

console.log(solution(5, 5, 3, 2));
console.log(solution(7, 5, 5, 2));
console.log(solution(4, 4, 4, 4));
