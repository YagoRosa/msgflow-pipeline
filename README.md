Descrição
Este bot tem como objetivo automatizar o envio de mensagens para um grupo de usuários através do WhatsApp. O bot utiliza o whatsapp-web.js para interagir com o WhatsApp Web e oferece um menu administrativo onde o usuário pode escolher diferentes opções para enviar mensagens específicas. Ele é útil para automação de processos administrativos e interações com um grupo de pessoas de forma eficiente.

Tecnologias
O projeto utiliza as seguintes tecnologias:

Node.js (v12 ou superior)

whatsapp-web.js - Para interação com o WhatsApp Web

qrcode-terminal - Para exibição do QR Code no terminal

XLSX - Para manipulação de arquivos XLSX (caso necessário)

Dependências
Você pode instalar as dependências utilizando o npm:

bash
Copiar
Editar
npm install
Instalação
1. Clonar o repositório
Clone o repositório para sua máquina local:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/whatsapp-bot-administrativo.git
cd whatsapp-bot-administrativo
2. Instalar as dependências
Instale todas as dependências necessárias utilizando o npm:

bash
Copiar
Editar
npm install
3. Configurar o ambiente
Este bot funciona com o WhatsApp Web, então você precisará escanear um QR Code para conectar a sua conta do WhatsApp. Ao executar o bot pela primeira vez, o código gerará um QR Code no terminal para que você faça a leitura com o seu celular.

4. Iniciar o bot
Para iniciar o bot, basta executar o seguinte comando:

bash
Copiar
Editar
node index.js
Isso inicializará o bot e, ao escanear o QR Code, o bot estará pronto para enviar mensagens conforme as opções selecionadas no menu.

Como usar
O bot interage com o usuário de forma simples. Após a inicialização, o bot ficará aguardando mensagens do usuário no WhatsApp. O fluxo básico é o seguinte:

O usuário envia a mensagem "menu administrativo" para o bot.

O bot responde pedindo a matrícula do usuário.

O usuário envia a matrícula. Se a matrícula for válida (por exemplo, "n1164193"), o bot exibirá um menu com opções.

O usuário escolhe uma opção (1 a 5) e o bot executa a ação correspondente, como enviar mensagens de absenteísmo, internação, exames, etc.

Comandos disponíveis no menu:
1: Enviar mensagem de absenteísmo

2: Enviar mensagem de internação

3: Enviar mensagem de consulta de colonoscopia

4: Enviar mensagem de exame de endoscopia

5: Enviar mensagem de exame de colonoscopia

Comandos
Menu Administrativo
O bot começa perguntando pela matrícula do usuário e, ao receber a matrícula correta, ele exibe um menu com as seguintes opções:

1: Enviar mensagem de absenteísmo

2: Enviar mensagem de internação

3: Enviar mensagem de consulta de colonoscopia

4: Enviar mensagem de exame de endoscopia

5: Enviar mensagem de exame de colonoscopia

Cada uma dessas opções chama uma função específica (como sendMessagesAbsenteismo, sendMessagesInterncao, etc.) para enviar uma mensagem relacionada ao respectivo tópico.

Funções
As funções de envio de mensagens são implementadas no arquivo index.js e podem ser personalizadas de acordo com as necessidades do projeto. Elas são chamadas após o usuário escolher uma opção no menu.

Contribuindo
Contribuições são bem-vindas! Para contribuir com o projeto:

Faça um fork do repositório.

Crie uma nova branch para sua feature (git checkout -b feature/nova-feature).

Faça as alterações necessárias e commite-as (git commit -am 'Adiciona nova feature').

Envie para o seu fork (git push origin feature/nova-feature).

Crie um pull request.
