Chat App Socket Training

Este repositório contém um projeto de treinamento focado no desenvolvimento de um sistema de chat em tempo real utilizando tecnologias modernas: Socket.IO, NestJS, Ionic e integração com iOS.

O objetivo principal deste projeto é praticar a comunicação em tempo real, gerenciamento de status de usuários, e exibição avançada de mensagens em um aplicativo híbrido.

Funcionalidades Principais
Indicação de usuário digitando

Notificações visuais quando um usuário está digitando tanto nos cards de conversa quanto na caixa de mensagem.

Status online

Exibição do status “usuário online” na caixa de conversa em tempo real.

Mensagens com data formatada

Cada mensagem exibe a data formatada de forma legível e intuitiva.

Cards com datas formatadas no estilo WhatsApp

Diferenciação da data exibida nos cards de conversa, formatada no padrão de apps populares como WhatsApp.

Ordenação dos cards

Cards de conversa são ordenados automaticamente com base na mensagem mais recente.

Indicador de mensagem lida ou não

Tanto nos cards quanto na caixa de mensagem, há visualização clara do status de leitura das mensagens.

Tecnologias Utilizadas
NestJS – Backend escalável e modular para gerenciamento da lógica do servidor e comunicação via WebSocket.

Socket.IO – Comunicação em tempo real bidirecional entre cliente e servidor.

Ionic Framework – Desenvolvimento híbrido para interface móvel, suportando iOS.

TypeScript – Tipagem estática para maior robustez do código.

Date-fns / Moment.js (ou outra lib que usar) – Para formatação das datas nas mensagens e cards.

Estrutura do Projeto
backend/ – Código NestJS responsável pela API, gerenciamento de conexões WebSocket e lógica do chat.

frontend/ – Aplicativo Ionic que consome a API e gerencia interface e estados dos chats.

mobile-ios/ – Configurações específicas e ajustes para o build iOS.

Como Rodar o Projeto
Backend (NestJS)
bash
Copiar
Editar
cd backend
npm install
npm run start:dev
Frontend (Ionic)
bash
Copiar
Editar
cd frontend
npm install
ionic serve
Para iOS (Ionic + Capacitor)
bash
Copiar
Editar
cd frontend
ionic build
npx cap sync ios
npx cap open ios
Possíveis Melhorias
Implementar autenticação JWT para usuários.

Histórico de mensagens paginado.

Notificações push para novas mensagens.

Suporte a envio de arquivos e imagens.

Contato
Para dúvidas ou contribuições, entre em contato:

Seu nome: Antonio Rodrigo Souza

Email: seu.email@exemplo.com

LinkedIn/GitHub: Seu perfil GitHub
