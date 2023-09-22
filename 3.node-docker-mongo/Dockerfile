FROM node:latest

#le decimos que cree una carpeta 
RUN mkdir -p /usr/src/app

#nos movemos a la carpeta creada
WORKDIR /usr/src/app

#copiamos el package.json y package-lock.json
# el ./ es para decirle que lo copie al directorio actual
COPY package*.json ./

#instalamos todas las dependencias
RUN npm install

#copiamos la carpeta src dentro del directorio actual
#COPY src ./
#con esto le decimos que copie el directorio actual dentro del contenedor actual
COPY . .

#el puerto que expone el contenedor
EXPOSE 3000

#comando de ejecución
#CMD ["npm", "start"]
CMD ["npm", "run", "dev"]
#docker build -t hellonode .

#una vez creado la imagen corremos
#docker run -p 4000:3000 hellonode