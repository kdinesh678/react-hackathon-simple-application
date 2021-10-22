# building the project
FROM node:14.18.1-alpine as build
WORKDIR /project
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
RUN npm run test
RUN npm run build

# creating the nginx based image for deployment
FROM nginx:stable-alpine
COPY --from=build /project/build /usr/share/nginx/html
EXPOSE 80