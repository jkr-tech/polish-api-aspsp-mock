FROM node:lts as builder
ADD src /src
WORKDIR /src/web
RUN npm install
RUN npm run build
WORKDIR /src
RUN npm install
RUN npm run build
RUN mkdir data && npm run generate-data

FROM node:lts 
COPY --from=builder /src /src
ADD crypto /crypto
WORKDIR /src
EXPOSE 3000
ARG debug_names=aspsp-mock
ENV DEBUG=$debug_names
CMD npm start