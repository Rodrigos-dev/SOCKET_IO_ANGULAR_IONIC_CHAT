**Chat App Socket Training**

Este repositório contém um projeto de treinamento focado no desenvolvimento de um sistema de chat em tempo real utilizando tecnologias modernas: Socket.IO, NestJS, Ionic.

O objetivo principal deste projeto é praticar a comunicação em tempo real, gerenciamento de status de usuários, e exibição avançada de mensagens em um aplicativo híbrido.

**Funcionalidades Principais**
Indicação de usuário digitando

Notificações visuais quando um usuário está digitando tanto nos cards de conversa quanto na caixa de mensagem.

**Status online**

Exibição do status “usuário online” na caixa de conversa em tempo real.

**Mensagens com data formatada**

Cada mensagem exibe a data formatada de forma legível e intuitiva.

**Cards com datas formatadas no estilo WhatsApp**

Diferenciação da data exibida nos cards de conversa, formatada no padrão de apps populares como WhatsApp.

**Ordenação dos cards**

Cards de conversa são ordenados automaticamente com base na mensagem mais recente.

**Indicador de mensagem lida ou não**

Tanto nos cards quanto na caixa de mensagem, há visualização clara do status de leitura das mensagens.


Tecnologias Utilizadas
**NestJS** – Backend escalável e modular para gerenciamento da lógica do servidor e comunicação via WebSocket.

**Socket.IO** – Comunicação em tempo real bidirecional entre cliente e servidor.

**Ionic Framework** – Desenvolvimento híbrido para interface móvel, suportando iOS.

**TypeScript** – Tipagem estática para maior robustez do código.


**Estrutura do Projeto**
**BACKEND - esta em um repositorio privado**
backend/ – Código NestJS responsável pela API, gerenciamento de conexões WebSocket e lógica do chat.

frontend/ – Aplicativo Ionic que consome a API e gerencia interface e estados dos chats.


Como Rodar o Projeto

Frontend (Ionic)
cd frontend
npm install
ionic serve

Possíveis Melhorias
Implementar autenticação JWT para usuários.

Histórico de mensagens paginado.

Notificações push para novas mensagens.

Suporte a envio de arquivos e imagens.

layout em geral que não foi o foco

## Screenshots

<h3 align="center">📸 Screenshots</h3>

<table>  
  <tr>
    <td><img src="https://github.com/user-attachments/assets/815a43f4-1d1b-4f49-9ca0-41fb1a00f53f" width="80"/></td>
    <td><img src="https://github.com/user-attachments/assets/b6106aa3-4758-4d08-b601-9c4b9480d2c1" width="80"/></td>
    <td><img src="https://github.com/user-attachments/assets/7595bd8e-7ca5-4eb9-8f30-5b01eb3a8a5a" width="80"/></td>
    <td><img src="https://github.com/user-attachments/assets/93ad396e-b1dc-4028-8cfa-7d136fc401b4" width="80"/></td>
    <td><img src="https://github.com/user-attachments/assets/cf0851fb-b8fe-456c-8450-f382ec94ca32" width="80"/></td>
    <td><img src="https://github.com/user-attachments/assets/c48413f7-b4f4-4f2a-8563-c5aee0514d12b" width="80"/></td>
    <td><img src="https://github.com/user-attachments/assets/3b6f1b58-cadd-413f-8d8b-aed04630bc7d" width="80"/></td>
  </tr>  
</table>
