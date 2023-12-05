# Case 

## Como Rodar: 

*** No backend há um arquivo .env.dev onde está configurada o local para onde ele aponta para o mongodb.  A depender da ambiente(local ou docker), será preciso inverter esse dado.

*** No Front há um arquivo  ./src/app/services/api/helper.ts  onde esta configurado onde o front está apontando para o back.  A depender da ambiente(local ou docker), será preciso inverter esse dado.

*** A rota POST  http://localhost:8002/api/feature-flags/many  insere um dados aleatorios de features flags no banco.


## 1 . Por Docker 
 1. No terminal da folder contendo o arquivo docker-compose.yaml 


    ### `docker-compose up`


 2. Entrar nos respectivos containers do front e back

      I. Na pasta do Backend   

      ### `docker-compose exec app-server`

      II. Dentro do container  
      
       ### `npm i `

      ### `npm run start:express`

      III. Na pasta do Frontend 

      ### `docker-compose exec app-front`

      IV. Dentro do container 
      
      ### `npm i ` 

      ### `npm run dev`


 

 ## 1. Localmente

1. Entrar com o terminal na pasta do front

   * *Versão do node para o front: v18.17.1
      
    I. 

      ### `npm i `

    II. Dentro do container  

      ### `npm run dev`

2. Entrar com o terminal na pasta do back

   * *Versão do node para o back: v18.17.1+ 
      
    I. 

      ### `npm i `

    II. Dentro do container  

      ### `npm run start:express`
