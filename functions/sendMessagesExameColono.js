const XLSX = require('xlsx');

function carregarPlanilha() {
    planilha = XLSX.readFile('BOT.xlsx');
}

async function sendMessagesExameColono(client, chatId) {
    carregarPlanilha();
    client.sendMessage(chatId, 'Informações carregadas, processando função...');

    const workbook = XLSX.readFile('BOT.xlsx');
    const sheetName = workbook.SheetNames[3]; // Supõe que você queira ler a quarta planilha
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
    
                    const message = `Prezado(a) ${name}, estou entrando em contato para *CONFIRMAR* seu compromisso *COLONOSCOPIA* que está agendado aqui no Hospital Municipal de Piedadez\n\n*Para realização de sua COLONOSCOPIA:*\n✅Necessário fazer o preparo conforme descrito nas orientações entregue pela nossa equipe.\n✅Trazer identidade e comprovante de residência e todos os exames pertinentes ao procedimento.\n✅Necessário estar acompanhado por uma pessoa maior de 18 anos.\n✅Necessário trazer documento de identificação e comprovante de residência.\n✅ Em caso de dúvidas entre em contato no número 96518-2038( de segunda a sexta de 7h às 16h)\n✅Não é necessário trazer roupas de cama nem alimentos.\n\n*ATENÇÃO* Está ciente e de acordo com esses requisitos? Se sim confirme com um ”OK”.`;                
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

module.exports = sendMessagesExameColono;