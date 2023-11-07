FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM node:alpine as production

ARG PORT=5000
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=5000
ENV BASE_URL=http://localhost:5000
ENV CLIENT_URL=https://inex-shop.vercel.app
ENV MONGO_DATABASE_URL=mongodb+srv://nghiakydiem:nghiaky146@cluster0.04wdjfg.mongodb.net/IN_EX-SHOP?retryWrites=true&w=majority
ENV STRIPE_SECRET_KEY=sk_test_51NBdd7H49Gwp74XhSy69gEzpLn5sRLyRTfnPpL4RWHtDLXaw3Fargs1Cm95A43CP6ZCPH0jOHq8GyFlKoBaW9kVw00djypmFa8
ENV JWT_SECRET=DVzjZAKaSzYYRoBgGzqJ8AVnGkmB3mml  
ENV SESSION_SECRET=sTHwnGUimFkZWNbS2N1npictHYypmAA0
ENV GOOGLE_CLIENT_ID=32605608777-vnvcl3pe1lu2enp1t06uvjmg63lcffg8.apps.googleusercontent.com
ENV GOOGLE_SECRET_KEY=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

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]