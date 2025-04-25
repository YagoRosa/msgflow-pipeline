const XLSX = require('xlsx');

function carregarPlanilha() {
    planilha = XLSX.readFile('BOT.xlsx');
}

async function sendMessagesConsultaColono(client, chatId) {
    carregarPlanilha();
    client.sendMessage(chatId, 'Informações carregadas, processando função...');

    const workbook = XLSX.readFile('BOT.xlsx');
    const sheetName = workbook.SheetNames[2]; // Supõe que você queira ler a terça planilha
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
                    
                    ANALISAR O PQ DA DATA ESTA INDO EM UM FORMATO DIFERENTE DO NORMAL (dd/mm/yyyy)
                    
                    */ 


                    // Remover (21) do número de telefone
                    const phoneNumber = phoneNumberWithPrefix.replace('(21) ', '');
    
                    // Adicionar prefixo e sufixo ao número de telefone
                    const formattedPhoneNumber = `5521${phoneNumber}@c.us`;
    
                    const message = `Prezado(a) ${name}, estou entrando em contato para falar sobre seu compromisso *CONSULTA PARA COLONOSCOPIA* que está agendado aqui no Hospital Municipal de Piedade\n*Endereço:* Rua da Capela, 96 - Piedade.\n✅ A data e horário são informados pela sua clínica da família com antecedência.\n✅ *NÃO É O EXAME E SIM UMA CONSULTA*\n✅ Precisa comparecer à consulta com a guia(documento de agendamento) da clínica da família.\n\n*ATENÇÃO* Por favor, confirme sua presença com um *"OK"*.`;
                
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

module.exports = sendMessagesConsultaColono;
