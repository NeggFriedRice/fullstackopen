const t = [1, 2, 3]

for (let num of t) {
    console.log(num)
}

// t.forEach(value => {
//     console.log(value + 5)
// })
// ** forEach is passed a callback arrow function 'value => {value + 5}'; it will take the value and then evaluate based on the callback

// const t2 = t.concat(5)
// console.log(t2)
// ** concat is used to create a new copy of the array that is being concatenated

// const m1 = t.map(value => value + 2)
// console.log(m1)
// ** map is used to create a new array with the evaluated values in the map function i.e. 'value + 2' in this example

// const object1 = {
//     name: 'Arto Hellas',
//     age: 35,
//     education: 'PhD',
// }

// const fieldName = 'age'
// console.log(object1[fieldName])