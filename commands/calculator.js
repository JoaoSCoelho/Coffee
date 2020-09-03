// Requerimentos padrões
const Discord = require('discord.js')
const hex = require('../colors.json')
const config = require('../info.json')

// Código exportado
module.exports = {
  name: "calculator",
  name2: "calculadora",
  name3: "calcular",
  type: "Geral",
  description: "Calculadora para quando você precisar fazer uma conta rápida\nModo de usar:\n**Soma:** *3+3* ```\n6\n```\n**Subtração:** *2-3* ```\n-1\n```\n**Multiplicação:** _2*5_ ```\n10\n```\n**Divisão:** *50 / 2* ```\n25\n```\n**Resto da divisão (módulo):** *100 % 3* ```\n1\n```\n**Potência:** _5 **2_ ```\n25\n```\n\nOBS: Para usar essa funcionalidade do bot, não é necessário o uso do prefixo, nem de nenhum comando antes, basta digitar a operação matemática no chat e o bot lhe mostra o reultado.",
  
  async execute(message, args, comando, client, prefix) { // Código executado quando o usuário usa o comando calculator 
    const botMembro = message.guild.member(client.user.id) // O membro do bot no servidor em que foi enviado a mensagem
    const permissoesBot = message.channel.memberPermissions(botMembro) // As permissões que o bot tem no canal em que foi enviada a mensagem
    const podeEnviarMsg = permissoesBot.has("SEND_MESSAGES") // Um boolean se o bot pode enviar mensagens naquele canal
    if (podeEnviarMsg) {
      const descEmbed = new Discord.MessageEmbed()
        .setColor(hex.blue2)
        .setTitle(`<:calculator:750013968432758875> Como usar o ${prefix}${comando}`)
        .setDescription("Modo de usar:\n**Soma:** *3+3* ```\n6\n```\n**Subtração:** *2-3* ```\n-1\n```\n**Multiplicação:** _2*5_ ```\n10\n```\n**Divisão:** *50 / 2* ```\n25\n```\n**Resto da divisão (módulo):** *100 % 3* ```\n1\n```\n**Potência:** _5 **2_ ```\n25\n```\n\nOBS: Para usar essa funcionalidade do bot, não é necessário o uso do prefixo, nem de nenhum comando antes, basta digitar a operação matemática no chat e o bot lhe mostra o reultado.")
        .setTimestamp()
        .setFooter(`Sistema de ajuda ${client.user.username}`, client.user.displayAvatarURL())
      message.reply(descEmbed) 
    }
  },

  async calc(message, client) { // Código executado quando o usuario usa a calculadora em si
    const podeEnviarMsg = message.channel.memberPermissions(message.guild.member(client.user.id)).has("SEND_MESSAGES") // Boolean para verificar se o bot pode enviar mensagens naquele canal
    const notIsNumber = message.content.split(/\d+/g).join('').split(/[/*+%-]/).join('').split(' ') // Pega o conteúdo da mensagem e divide todas as parte que forem números, depois, tudo o que for sinal, por fim divide todos os espaços e joga tudo isso que não for núnero, sinal ou espaço e joga em um array
    while(notIsNumber.indexOf('') >= 0) { notIsNumber.splice(notIsNumber.indexOf(''), 1) } // retira os '' do array acima
    const numbers = message.content.split(/\D+/g) // Coloca em um array todos os números do conteúdo da mensagem
    const sinais = message.content.split(/[^/*+%-]/) // Coloca em um array todos os sinais "/", "*", "%", "+", e "-" que tiverem no conteúdo da mensagem
    while(numbers.indexOf('') >= 0) { numbers.splice(numbers.indexOf(''), 1) } // Tira os '' do array de numeros
    while(sinais.indexOf('') >= 0) { sinais.splice(sinais.indexOf(''), 1) } // Tira os '' do array de sinais
    if(sinais.length === 0 || numbers.length === 0 || notIsNumber.length !== 0)return; // Verifica se a mensagem não tem sinais, ou números e se na mensagem há algo que não seja número, caso a resposta para alguma dessas verificações seja positiva, ele não prossegue.
    if(message.content.startsWith('-') && numbers.length === 1)return; // Verifica se o número inicial é negativo e se há apenas ele na mensage, caso sim, retorna
    let result; // Starta a variável result
    try { // Tenta realizar um eval() do conteúdo da mensagem, caso aconteca algum erro, ele retorna
      result = await eval(message.content)
    } catch (e) {
      return;
    }
    if(typeof(result) != "number")return; // Se o resultado do eval não for um número, retorna
    if(podeEnviarMsg) message.channel.send(`\`\`\`${result}\`\`\``) // Se poder enviar mensagens naquele canal, ele envia o resultado do eval
  }
}