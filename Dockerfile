# Use uma imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o contêiner
COPY . .

# Construa o projeto para produção
RUN npm run build

# Use uma imagem do Nginx para servir o aplicativo React
FROM nginx:alpine

# Copie os arquivos de build do React para o diretório do Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exponha a porta que o Nginx está ouvindo
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
