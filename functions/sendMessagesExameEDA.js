const XLSX = require('xlsx');

function carregarPlanilha() {
    planilha = XLSX.readFile('BOT.xlsx');
}

async function sendMessagesExameEDA(client, chatId) {
    carregarPlanilha();
    client.sendMessage(chatId, 'Informações carregadas, processando função...');

    const workbook = XLSX.readFile('BOT.xlsx');
    const sheetName = workbook.SheetNames[4]; // Supõe que você queira ler a primeira planilha
    const worksheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const columnToSearch = 1;

    for (let row = range.s.r + 2; row <= range.e.r; row++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: columnToSearch });
        const phoneNumberWithPrefix = (worksheet[cellAddress]?.v || '').toString().trim();

            if (phoneNumberWithPrefix) {
                try {
                    const nameCellAddress = XLSX.utils.encode_cell({ r: row, c: 0 });
                    const name = (worksheet[nameCellAddress]?.v || '').toString().trim();

                    /*const dataCellAddress = XLSX.utils.encode_cell({ r: row, c: 2 });
                    const data = (worksheet[dataCellAddress]?.v || '').toString().trim();
                    
                    ANALISAR O PQ DA DATA ESTA INDO EM UM FORMATO DIFERENTE DO NORMAL (10/10/2000)
                    
                    */ 

                    // Remover (21) do número de telefone
                    const phoneNumber = phoneNumberWithPrefix.replace('(21) ', '');
    
                    // Adicionar prefixo e sufixo ao número de telefone
                    const formattedPhoneNumber = `5521${phoneNumber}@c.us`;
    
                    const message = `Prezado(a) ${name}, estou entrando em contato para falar sobre seu compromisso *ENDOSCOPIA* que está agendado aqui no Hospital Municipal de Piedade\n*Endereço:* Rua da Capela, 96 - Piedade.\n\n*Para realização de sua endoscopia:*\n✅ Necessário estar há 14 dias sem uso de omeprazol ou pantoprazol.\n✅ Jejum *ABSOLUTO* de 8h.\n✅ Sem alimentos.\n✅ Sem líquidos\n✅ *Sem ÁGUA.*\n✅Necessário estar acompanhado por uma pessoa maior de 18 anos.\n✅ Em caso de dúvidas entre em contato no número 96518-2038\n✅ Não vir dirigindo.\n✅O HORÁRIO É INFORMADO PELA CLÍNICA DA FAMÍLIA.\n*ATENÇÃO* Está ciente e de acordo com esses requisitos? Se sim confirme com um *”OK”*.`;                
                    // Enviar a mensagem para o número formatado
                    client.sendMessage(formattedPhoneNumber, message);
                                        
                    await new Promise(resolve => setTimeout(resolve, 3000));
                } catch (error) {
                    console.error(`Erro ao enviar mensagem para ${phoneNumberWithPrefix}: ${error.message}`);
                }
            }
        }

        console.log('Envio de mensagens de absenteismo concluído.');
        await client.sendMessage(chatId, 'Função de absenteismo executada com sucesso.');
        
}

module.exports = sendMessagesExameEDA;