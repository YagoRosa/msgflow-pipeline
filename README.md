# Bot Automessage — Nova Arquitetura Integrada com Pipeline de Dados 🤖

Este projeto está passando por uma evolução estrutural para operar como um pipeline completo de chamadas cirúrgicas, unificando automação via WhatsApp, ingestão de dados em SQL Server e camada analítica em Power BI.
O objetivo é garantir eficiência operacional, rastreabilidade e governança dos dados, sem comprometer o SLA do chamado e mantendo conformidade com a LGPD.

# 🎯 Objetivo

Automatizar o envio de chamadas cirúrgicas via WhatsApp e, em paralelo, registrar os dados operacionais em um banco SQL Server para análises posteriores.
O fluxo é desenhado para que o envio das mensagens seja sempre prioridade — caso o bulk insert falhe, o chamado não é impactado.

# 🧩 Arquitetura do Processo

Modelo da planilha aonde é realizado o chamado, o operador alimenta todos os campos listados na imagem abaixo. 

<img width="1079" height="121" alt="image" src="https://github.com/user-attachments/assets/0c5b4055-6df4-4889-843a-da040f7e7990" />



O texto final da mensagem é gerado via CONCAT direto na planilha, garantindo padronização.
Apos garantir que todas as informações estejam corretas, o operador ira via VSCODE executar o codigo do bot para que seja gerado o QRCode aonde sera escaneado pelo celular operacional do setor responsavel pelo chamado.

Utilizando a bliblioteca whatsapp-web.js para integrar o codigo com o WhatsApp possibilitando o envio das mensagens, após a conexão o operador envia a palavra-chave para ativar o bot que solicitara uma validação, apos validado o bot irá disponibilizar o menu de função. A função desenvolvida dispara uma mensagem personalizada por paciente.

Exemplo de texto utilizado:

<img width="267" height="224" alt="image" src="https://github.com/user-attachments/assets/1626cc04-05b0-40c4-ae73-53d36617829e" />

O bot processa a planilha de forma sequencial, linha a linha, capturando exclusivamente o número de telefone e o texto final a ser enviado ao paciente. A coluna TEXTO_PARA_ENVIAR é totalmente construída via CONCAT na própria planilha, incorporando procedimento, horário e demais parâmetros operacionais. Isso elimina a necessidade de o bot manter constantes internas para montar mensagens, simplifica manutenção, reduz acoplamento e facilita ajustes futuros de conteúdo sem intervenção no código.


# Sincronização com SQL Server (Pipeline de Dados)

Após finalizar o disparo das mensagens, o bot aciona um processo de bulk insert em Python, responsável por registrar toda a telemetria operacional do fluxo, incluindo:

- Metadados do chamado (data do acionamento, horário exato do disparo).
- Indicadores operacionais relevantes para auditoria..
- Histórico completo de envios, garantindo rastreabilidade ponta-a-ponta

Todo o material sensível permanece integralmente armazenado no SQL Server local, assegurando aderência plena aos requisitos da LGPD e evitando qualquer exposição externa.


# 📊 Camada de Inteligência — Dashboard Power BI

Com a base alimentada pelo SQL Server, a dashboard em Power BI entrega uma visão consolidada dos indicadores assistenciais e de performance do processo:

- KPIs de fluxo
- Tendências operacionais
- Eficiência do chamado cirúrgico
- Gargalos e oportunidades de melhoria

A modelagem garante que nenhum dado pessoal identificável seja exibido, operando somente com métricas agregadas e seguras para uso gerencial.


# 📦 Tecnologias Utilizadas

- Node.js
- whatsapp-web.js
- Python (bulk insert)
- SQL Server (local)
- Power BI Desktop
- XLSX para ingestão da planilha
