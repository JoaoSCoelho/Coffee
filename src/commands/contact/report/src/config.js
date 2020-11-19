module.exports = {
  name: "report",
  aliases: ["reportar"],
  type: "Contato",
  description: 'Se você encontrou algum bug ou coisa que você acredita que não esteja funcionando como deveria, basta usar o comando para que os devenvolvedores fiquem a par do problema e o resolva.',
  how_to_use: 'Digite _report no chat e passe como parâmetro o seu report, em seguida envie a mensagem.',
  example: '_report Encontrei um bug ao executar o comando ajuda, ao usar o comando o bot não responde!',
  example_url: 'https://i.imgur.com/mAs7Ueq.png',
  cooldown: 10000,
  cooldownControl: {},
  times_limit: 2,
  active: true,
  reason_inactivity: null,
  created_timestamp: 1598646020000,
  updated_timestamp: 1605780157057,
  version: '2.0',
  releases_notes: {
    '1.0': null,
    '2.0': 'Comando refeito, agora com um sistema de gestão de reports mais aprimorado. O usuário que fez o report é notificado quando o status do seu report muda, sabe se foi aceito ou rejeitado, e caso aceito, sabe quando foi solucionado!'
  }
};

