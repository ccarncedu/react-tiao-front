# Use a imagem base do Node.js
FROM node:16-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install

# Copie todo o código-fonte para o diretório de trabalho
COPY . .

# Compile o projeto para produção
RUN yarn build

# Exponha a porta que o aplicativo irá rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["yarn", "start"]