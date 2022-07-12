class JogoDaMemoria{
    //se mandar um obj = {tela: 1, idade:2, etc:3} ...
    //vai ignorar o resto das propriedades e pegar somente a propriedade tela
    constructor({tela}) {
        this.tela = tela
        // caminho do arquivo, sempre relativo
        // ao index.html!
        this.heroisIniciais=[
            {img: './arquivos/batman.png', name: 'batman'},
            {img: './arquivos/cyclops.png', name: 'cyclops'},
            {img: './arquivos/hawkeye_gaviao.png', name: 'hawkeye_gaviao'},
            {img: './arquivos/hell boy.png', name: 'hell boy'},
        ]
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
    }
    
    embaralhar(){
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
    }

    jogar(){
        // aqui será criada a função de fato. ligando aqui com a tela.js (configurarBotaoJogar(funcaoOnClick))
        this.embaralhar()
    }
}