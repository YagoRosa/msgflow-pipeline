const XLSX = require('xlsx');

function carregarPlanilha() {
    planilha = XLSX.readFile('BOT.xlsx');
}

async function sendMessagesAbsenteismo(client, chatId) {
    carregarPlanilha();
    client.sendMessage(chatId, 'Informações carregadas, processando função...');

    const workbook = XLSX.readFile('BOT.xlsx');
    const sheetName = workbook.SheetNames[0]; // Supõe que você queira ler a primeira planilha
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

                    const dataCellAddress = XLSX.utils.encode_cell({ r: row, c: 2 });
                    const data = (worksheet[dataCellAddress]?.v || '').toString().trim();
                    
                    const procedimentoCellAddress = XLSX.utils.encode_cell({ r: row, c: 3 });
                    const procedimento = (worksheet[procedimentoCellAddress]?.v || '').toString().trim();

                    // Remover (21) do número de telefone
                    const phoneNumber = phoneNumberWithPrefix.replace('(21) ', '');
    
                    // Adicionar prefixo e sufixo ao número de telefone
                    const formattedPhoneNumber = `5521${phoneNumber}@c.us`;
    
                    const message = `Prezado(a) ${name}, estou entrando em contato para falar sobre seu compromisso de ${procedimento} que estava agendado aqui no Hospital Municipal de Piedade na data ${data} e aqui não consta sua presença, gostariamos de saber se tem interesse em reagendar.`;
                
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

module.exports = sendMessagesAbsenteismo;
