function add(...args) {
    let sum = 0
    for (let nums of args) {
        sum += nums
    }
    return sum
}

console.log(add(1, 2, 3, 4))