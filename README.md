### Desafio GlobalThings
Simples aplicativo com o objetivo de listar os heróis disponibilizado em um end-point e promover o cadastro, exibição e exclusão de heróis. 

No aplicativo é possível gerenciar a conexão com a internet e salvar os dados em um banco de dados local (SQLite) no caso de está offline.

#### OBSERVAÇÕES:
O aplicativo traz demonstrações de como é possível transacionar com dados offline armazenando-os em banco local e posteriormente, quando o dispositivo estiver conectado, enviar os dados por via remota.

Neste caso o app não implementa uma biblioteca para gerenciar a conexão tudo foi desenvolvido através e serviços (providers) locais.

### Requesitos

 - Node V 8.17.0
 - Cordova V 9.0.0
 - Ionic V 3.20.0
 - Java 8

### Rodar o projeto
Necessário Node, Cordova e Ionic nas versões acima.

No diretório do projeto rodar:

    npm i

    npm run start
