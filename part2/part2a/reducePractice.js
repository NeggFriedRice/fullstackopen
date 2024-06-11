const numbers = [3, 6, 2, 9, 1]
const sum = numbers.reduce((prev, curr) => {
    return prev + curr
}, 0)

console.log(sum)