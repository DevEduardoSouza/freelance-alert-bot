# Monitorando Freelancers

Este projeto é um bot de Telegram que monitora sites de freelancers, como Workana e 99freelas, e envia notificações sobre novos projetos disponíveis diretamente para um chat do Telegram.

## Estrutura do Projeto

```bash

src/
├── bot/
│ ├── bot.js
│ ├── commands/
│ │ ├── start.js
│ │ └── stop.js
├── scrapers/
│ ├── fetchProjects.js
│ ├── getHtmlPage.js
│ ├── sites/
│ │ ├── workana.js
│ │ └── 99freelas.js
├── config/
│ ├── sitesConfig.js
└── utils/
├── messageFormat.js
└── sendTelegramMessage.js

```


## Requisitos

- Node.js v20.12.2 ou superior
- NPM (Node Package Manager)

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/DevEduardoSouza/freelance-alert-bot.git
    cd freelance-alert-bot
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```


### Como Criar um Bot no Telegram

1. Abra o Telegram e pesquise por **BotFather**.
2. Clique em **BotFather** nos resultados da pesquisa e inicie uma conversa com o BotFather.
3. Use o comando `/newbot` para criar um novo bot. O BotFather solicitará um nome para o seu bot. Escolha um nome para o seu bot.
4. Em seguida, o BotFather solicitará um nome de usuário para o seu bot. O nome de usuário deve terminar com a palavra "bot" e ser único. Por exemplo, `meu_bot_telegram_bot`.
5. Depois de escolher um nome de usuário, o BotFather fornecerá um token de acesso para o seu bot. Esse token é o que você usará para autenticar seu bot ao enviar e receber mensagens via API do Telegram.
6. Guarde com segurança o token do bot. Este token será usado para configurar o bot em seu projeto Node.js, como mostrado nas instruções anteriores.


### Configuração do Token do Bot do Telegram

1. No arquivo `.env` na raiz do seu projeto, adicione a seguinte linha:
    ```
    TELEGRAM_BOT_TOKEN=seu_token_aqui
    ```
   Certifique-se de substituir `"seu_token_aqui"` pelo token do seu bot do Telegram.

2. O arquivo `.env` será automaticamente carregado pelo seu código Node.js para acessar o token do bot.


## Uso

Para iniciar o bot, use o comando:
```sh
npm start
```

## Comandos do Bot

- `/start`: Inicia o monitoramento e envia notificações de novos projetos para o chat.
- `/stop`: Para o monitoramento e desativa as notificações para o chat.

## Funcionalidades

- **Monitoramento de Sites**: O bot monitora os sites Workana e 99freelas em busca de novos projetos e envia uma mensagem no Telegram quando um novo projeto é encontrado.
- **Formatação de Mensagem**: As mensagens enviadas são formatadas para incluir informações como título do projeto, descrição, orçamento, data de postagem e link para o projeto.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para a sua feature (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

