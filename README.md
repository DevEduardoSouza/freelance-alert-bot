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
    git clone https://github.com/seu-usuario/monitorando-freelas.git
    cd monitorando-freelas
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Configure o token do bot do Telegram:
    - No arquivo `src/bot/bot.js`, substitua `"SEU_TOKEN_AQUI"` pelo token do seu bot do Telegram.

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

