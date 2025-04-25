const XLSX = require('xlsx');

function carregarPlanilha() {
    planilha = XLSX.readFile('BOT.xlsx');
}

async function sendMessagesInterncao(client, chatId) {
    carregarPlanilha();
    client.sendMessage(chatId, 'Informações carregadas, processando função...');

    const workbook = XLSX.readFile('BOT.xlsx');
    const sheetName = workbook.SheetNames[1]; // Supõe que você queira ler a segunda planilha
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
    
                    const message = `Prezado(a) ${name}, estou entrando em contato para *CONFIRMAR* sua *CIRURGIA* que está agendado aqui no Hospital Municipal de Piedade\nEndereço: Rua da Capela, 96 – Piedade.\n\nORIENTAÇÕES PARA INTERNAÇÃO:\n1- Comparecer no NIR do MROSC no dia marcado as 07:00 DA MANHÃ com os seguintes documentos: Identidade, Comprovante de Residência, Cartão do SUS, CPF e Todos os Exames relacionados ao procedimento a ser realizado.\n2- Retirar unhas postiças, Implante de Cabelo, Cílios Postiços, Piercings, Brincos e etc..\n3- Trazer Itens de Higiene Pessoal, Toalha de Banho, Camisola (Caso Queira) e Roupa para a Alta. (NÃO PRECISA TRAZER ROUPA DE CAMA E ALIMENTOS).\n4- A falta no dia da cirurgia sem informar ao Hospital pode causar suspensão da mesma.\n5- Atraso no dia da internação pode causar suspensão da cirurgia.\n\n*ATENÇÃO*: Está ciente e de acordo com esses requisitos? Se sim confirme com um ”OK”.`;
                
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

module.exports = sendMessagesInterncao;
