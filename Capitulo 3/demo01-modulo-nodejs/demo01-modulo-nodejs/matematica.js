class Matematica{
    // por ser estatica não precisa instancia com o New e nem acessar os atributos com o this
    static somar(valor1,valor2){
        return valor1 + valor2
    }

    static multiplicar(valor1,valor2){
        return valor1 * valor2
    }
}

// deixar arquivo publico
module.exports = Matematica

