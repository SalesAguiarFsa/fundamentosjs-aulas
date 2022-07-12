const readLine = require('readline')
const terminal = readLine.createInterface({
    // definir o modo de entrada via terminal
    input: process.stdin,
    // todo texto de saida sairá no terminal
    output: process.stdout
})


// texto do menu
const textoMenu = `
Olá, seja bem vindo ao sistema de media
Digite 1 para acessar o menu inicial
Digite 2 para acessar o menu de Herois
Digite 3 para acessar o menu de Guerreiras
Digite 0 para sair
`
//console.log('textoMenu',textoMenu)

//obter valores do terminal

/*
const args = process.argv 
const opcao = args[args.length -1]

switch(parseInt(opcao)){
    case 1:
        console.log('pressionou 1')
        break;
    case 2:
        console.log('pressionou 2')
        break;
    default:
        console.log('opção invalida')
        break;

}*/

/*terminal.question('Qual é seu nome?',(msg)=>{
    console.log('voce escreveu',msg)
    terminal.close()
})*/

const questoes = {
    menuInicial: {
        texto:textoMenu,
        fn: menuInicial
    },
    opcao1: {
        texto: 'submenu! Pressione enter para selecionar mais opcoes...',
        fn: opcao1
    }
}

function opcao1(msg){
    console.log('Não há mais opcoes!')
    terminal.close()
}

function menuInicial(msg){
    const opcao = Number(msg)
    if(isNaN(opcao)){
        throw new Error('Não é um numero',msg)
    }
    switch(opcao){
        case 0:
                console.log('Saindo...')
                terminal.close()
                break;
        case 1:
            console.log('menu inicial')
            terminal.question(
                questoes.opcao1.texto,
                questoes.opcao1.fn
            )
            break;
        default:
            console.log('opcao invalida')
            terminal.close()
            break;
    }
}

terminal.question(
    questoes.menuInicial.texto,
    questoes.menuInicial.fn
)