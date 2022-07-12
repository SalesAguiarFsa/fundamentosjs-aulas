const dataAniversario = new Date(2020,0,20)
console.log(dataAniversario)

const primeiraDataDoJs = new Date(0)
console.log(primeiraDataDoJs.getTime())

const hoje= new Date()
console.log(hoje.toString())
console.log(hoje.toLocaleDateString)

// formato global recomendado!
console.log(hoje.toISOString())

