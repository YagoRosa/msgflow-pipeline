📲 WhatsApp Bot - Envio de Mensagens Automatizadas
Este projeto é um bot do WhatsApp desenvolvido em Node.js, utilizando a biblioteca whatsapp-web.js para automação de mensagens. Ele permite o envio automatizado de mensagens com base em uma série de comandos administrativos, como alertas de absenteísmo, internações e exames.

🛠 Tecnologias Utilizadas
Node.js

whatsapp-web.js - Integração com o WhatsApp Web

qrcode-terminal - Geração de QR code no terminal

xlsx - Manipulação de arquivos Excel (caso os dados sejam lidos de planilhas)

Módulos personalizados de envio de mensagens (ex: sendMessagesAbsenteismo)

🚀 Como Funciona
O bot inicia e gera um QR Code no terminal para ser escaneado com o WhatsApp Web.

Após a conexão, ele escuta mensagens recebidas.

Se o usuário digitar "menu administrativo", o bot solicita o número de matrícula.

Se a matrícula digitada for correta (ex: n1164193), o bot apresenta um menu com opções de envio de mensagens.

O usuário escolhe uma das opções (de 1 a 5) e o bot executa a função correspondente.
