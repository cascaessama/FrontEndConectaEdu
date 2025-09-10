# Use a imagem oficial do Node 20
FROM node:20-alpine

# Crie diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json package-lock.json* ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Exponha a porta padrão do Vite
EXPOSE 5173

# Comando para iniciar o Vite
CMD ["npm", "run", "dev", "--", "--host"]