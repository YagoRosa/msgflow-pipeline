const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
const XLSX = require('xlsx');
const { sendMessagesChamado} = require('./index');
const menuContext = {};

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {    
    console.log('WhatsApp conectado!');    
});


client.on('message', async message => {
    const userMessage = message.body.toLowerCase();

    if (userMessage === 'menu administrativo') {
        client.sendMessage(message.from, 'Informe o número da sua matrícula:');
    } else if (userMessage === 'n1164193') {
        // Se a matrícula estiver correta, envie o menu de opções
        menuContext[message.from] = 'admin_menu'; // Defina o contexto do menu
        sendMenu(message.from);
    } else if (userMessage === '1' && menuContext[message.from] === 'admin_menu') {
        // Ative a função de absenteismo
        sendMessagesChamado(client, message.from);
    } 
});

// Função para enviar o menu de opções
function sendMenu(chatId) {
    const menu = `Escolha uma função para executar:\n1 - Enviar mensagem de chamado de cirurgia`;
    client.sendMessage(chatId, menu);
}

async function DelayMessage (chatId, message, delayMs = 2000){
    await new Promise(resolve => setTimeout(resolve, delayMs));
    await client.sendMessage(chatId, message);
}


client.initialize();