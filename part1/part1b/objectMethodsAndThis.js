const arto = {
    name: "Arto Hellas",
    age: 35,
    education: 'PhD',
    greet: function() {
        console.log("Hello, my name is " + this.name)
    },
    doAddition: function(a,b) {
        console.log(a + b)
    }
}

// arto.greet()

// arto.growOlder = function() {
//     this.age += 1
// }

// console.log(arto.age)
// arto.growOlder()
// console.log(arto.age)

arto.doAddition(1, 4)
const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)