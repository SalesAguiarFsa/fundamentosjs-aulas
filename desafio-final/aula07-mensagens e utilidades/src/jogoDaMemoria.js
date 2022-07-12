class JogoDaMemoria{
    //se mandar um obj = {tela: 1, idade:2, etc:3} ...
    //vai ignorar o resto das propriedades e pegar somente a propriedade tela
    constructor({tela, util}) { // isto vem do arquivo index.js
        this.tela = tela
        this.util = util
        // caminho do arquivo, sempre relativo
        // ao index.html!
        this.heroisIniciais=[
            {img: './arquivos/batman.png', nome: 'batman'},
            {img: './arquivos/cyclops.png', nome: 'cyclops'},
            {img: './arquivos/hawkeye_gaviao.png', nome: 'hawkeye_gaviao'},
            {img: './arquivos/hell boy.png', nome: 'hell boy'},
        ]

        this.iconePadrao = './arquivos/padrao.png'
        // irar criar a logica para esconder os herois da tela
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }
    //para usar o this, não podemos usar static!
    inicializar(){
        // vai pegar todas as funcoes da classe tela!
        // coloca todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
        //Tela.atualizarImagens(this.heroisIniciais)
        
        //static configurarBotaoJogar(funcaoOnClick){
        //força a tela a usar o THIS de Jogo da memoria
        // quando acontecer o click ele irar chamar a função jogar(), somente quando clicar que execultará
        //a função jogar 
        // o unico objetivo do  BIND é de mantar as variaveis que estão nesta classe e também na outra classe
        //quando ela for execultada   
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        //O BIND faz manter o contexto dentro deste arquivo...
        this.tela.configurarClickVerificarSelecao(this.verificarSelecao.bind(this))
    }
    // para usar o "AWAIT" precisa colocar o "ASYNC"
    async embaralhar(){
        const copias = this.heroisIniciais
        //duplicar os itens do index.html
        .concat(this.heroisIniciais)
        //entra em cada idem e criar um id aleatorio "MAP"
        .map(item =>{
            return Object.assign({},item,{id: Math.random()/0.5})
        })
        //ordenar aleatoriamente
        .sort(()=>Math.random()-0.5)
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        // vamos esperar 1 segundo para atualizar a tela
            await this.util.timeout(1000)  
            this.esconderHerois(copias)
            this.tela.exibirCarregando(false)

    }

    esconderHerois(herois){
        // vamos trocar a imagem de todos os herois existentes pelo icone padrao
        //como fizemos no construtor, vamos extrair somente o necessario
        /* usando sintaxe ({chave:1}) estamos falando que vamos retornar o que tiver dentro 
        dos paranteses. Quando nao usamos : (exemplo do id), o JS entende que o nome é
        o mesmo do valor. Ex. id: id, vira id, */
        const heroisOcultos = herois.map(({nome,id})=>({
            id,
            nome,
            img: this.iconePadrao
        }))
        //atualizamos a tela com os herois ocultos
        this.tela.atualizarImagens(heroisOcultos)
        // guardamos os herois para trabalhar com eles depois
        this.heroisOcultos = heroisOcultos
    }

    exibirHerois(nomeDoHeroi){
        // vamos procurar esse heroi pelo nome em nossos heroisIniciais
        // vamos obter somente a imagem dele
        // dentro do FIND vou extrair apenas o nome
        const {img}=this.heroisIniciais.find(({nome}) => nomeDoHeroi === nome)
        // vamos criar a funcao na tela para exibir somente o heroi selecionado
        this.tela.exibirHerois(nomeDoHeroi,img)
    }

    verificarSelecao(id,nome){
        /*o objetivo é: aquela função de quando clicar dentro do card ela vai ser execultada
        dentro deste verificarSelecao para entender se foi clicado certo ou se foi clicado
        errado */

        //criando um OBJETO com o id e o nome
        const item = {id, nome}
        //vamos verificar a quantidade de herois selecionados
        // e tomar ação se escolheu certo ou errado
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados) {
            case 0:
                //adiciona a escolha numa lista, esperando pela proxima clicada 
                this.heroisSelecionados.push(item)
                break;
            case 1:
                // se a quantidade de escolhidos for 1, significa
                // que o usuario só pode escolher mais um
                // vamos obter o primeiro item da lista 
                // No JS se colocar no vetor uma variavel 'opcao1' ele entederá que o valor desta
                //variavel será 0
                const [ opcao1 ] = this.heroisSelecionados
                // zerar itens, para nao selecionar mais de dois
                this.heroisSelecionados = []
                let deveMostrarMensagem = false
                if(opcao1.nome === item.nome && opcao1.id !== id) {
                   /* codigo deletado dura a vide aula // aqui verificamos se são ids diferentes para 
                    //o usuario nao clicar duas vezes no mesmo
                    deveMostrarMensagem = true 
                    alert('combinação correta!' + item.nome)*/
                    this.exibirHerois(item.nome)
                    // como o padrão é true, nao precisa passar nada por paramento
                    this.tela.exibirMensagem()
                    // para a execução
                    return;
                }
                this.tela.exibirMensagem(false)
                break;
        }
    }

    jogar(){
        // aqui será criada a função de fato. ligando aqui com a tela.js (configurarBotaoJogar(funcaoOnClick))
        this.embaralhar()
    }
}