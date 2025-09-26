# App de Noticias em React

Este é um projeto [Expo](https://expo.dev) criado com [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Como instalar ?

1. Instale as dependências do projeto

   ```bash
   npm install
   ```

2. Inicie o App

   ```bash
   npm run start
   ```

No terminal aparecerá algumas opções para abrir o app

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), um app de preview do projeto, o qual pode ser acessado por meio de um QRcode no terminal (opção recomendada para testar em mobile)

## Tecnologias usadas

Para este projeto, foram escolhidas as seguintes tecnologias: React/React-Native, Zustand, Fetch API, Expo CLI

- React/React-Native: Permite criar aplicações multiplataforma com um único código, funcionando tanto em Android quanto iOS. O React traz a componentização e a facilidade de manutenção, enquanto o React Native aproveita essas mesmas bases para gerar interfaces nativas, garantindo desempenho e melhor experiência do usuário.
- Zustand: Uma biblioteca de gerenciamento de estado leve e simples de implementar. Foi escolhida por sua baixa curva de aprendizado, desempenho superior em relação a alternativas mais complexas (como Redux) e facilidade em organizar os dados do app, como notícias salvas, preferências do usuário e status de carregamento.
- Fetch API: Ferramenta nativa do JavaScript para realizar requisições HTTP. No contexto do app, ela é usada para consumir APIs de notícias em tempo real, sem a necessidade de bibliotecas externas, tornando o projeto mais enxuto e direto.
- Expo CLI: Facilita a configuração e o desenvolvimento do app, eliminando a complexidade inicial do React Native puro. O Expo oferece ferramentas prontas para build, acesso simplificado a APIs nativas (como câmera e notificações) e um fluxo de testes ágil por meio do aplicativo Expo Go, ideal para desenvolvimento rápido e prototipagem.
