function solution(number) {
  let cal_100 = Math.floor(number / 100);
  number = number % 100;

  let cal_20 = Math.floor(number / 20);
  number = number % 20;

  let cal_10 = Math.floor(number / 10);
  number = number % 10;

  let cal_5 = Math.floor(number / 5);
  number = number % 5;

  let cal_1 = Math.floor(number / 1);
  number = number % 1;

  return cal_1 + cal_5 + cal_10 + cal_20 + cal_100;
}

console.log(solution(125));
console.log(solution(43));
console.log(solution(1000000000));
