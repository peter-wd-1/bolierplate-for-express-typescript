FROM node:16
WORKDIR /app
#cache pakcage.json
COPY package.json
RUN npm install

EXPOSE 3000
#copy current files
COPY . ./
CMD ["node", "./dist/app.js"]
