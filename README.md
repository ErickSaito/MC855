# Universidade Estadual de Campinas
# Instituto da Computação

## Disciplina: MC855-2s2022

### Professor e Assistente

| Nome                     | Email                   |
| ------------------------ | ------------------------|
| Professora Juliana Borin | jufborin@unicamp.br     |
| Assistente Paulo Kussler | paulo.kussler@gmail.com |


### Equipe

| Nome               | RA               | Email                  | ID Git                |
| ------------------ | ---------------- | ---------------------- | --------------------- |
| Erick Saito        | 170578           | e170578@dac.unicamp.br | ErickSaito            |
| Fábio Ricci        | 170781           | f170781@dac.unicamp.br | Fabio-Ricci           |
| Paulo Pacitti      | 185447           | p185447@dac.unicamp.br | paulopacitti          |

### Descrição do projeto:
Link do board: https://github.com/users/ErickSaito/projects/2

### Prints das telas com descrição das funcionalidades. 
<img src="[https://user-images.githubusercontent.com/16319829/81180309-2b51f000-8fee-11ea-8a78-ddfe8c3412a7.png](https://user-images.githubusercontent.com/8814010/204150212-322da337-f572-4791-a9ba-cc78cf57991c.png)" width="50%" height="50%">

### Tecnologias, ferramentas, dependências, versões. etc. 

Ferramentas de desenvolvimento:
- Node v16
- React Native
- Tailwind
- NestJS
- Docker

APIs:
- Open Weather

Cloud:
- Firebase
- AWS
### Variáveis de ambiente para o backend

```
OPEN_WEATHER_API=
OPEN_WEATHER_URL="https://api.openweathermap.org/data/3.0/onecall"
GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY=
GOOGLE_APPLICATION_CREDENTIALS_PRJECT_ID=
GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL=
```

Para conseguir a váriavel `OPEN_WEATHER_API` acesse o [open weather](https://openweathermap.org/api), cadastre-se e crie uma chave de API. 

Para conseguir as credenciais do Google, que são referentes ao firebase, acesse

### Variáveis de ambiente para o frontend

### Para testar localmente
Tanto o frontend quando o backend encontram-se nesse repositório. Abra 2 terminais para acessar cada uma das pastas individualmente.

Antes de mais nada, para ambas as pastas, rode o comando `npm install`.

Com todas as variáveis de ambiente configuradas, para o backend, rode o comando `npm run start:dev` e para o frontend rode o comando `npm run start:development`. Dessa forma será possível ver o aplicactivo funcionando.

### Build da imagem
Neste projeto utilizou-se a AWS ECR para armazenar as imagens do backend geradas. Para subir as imagens, utilizou-se de duas abordagens, bash script e github actions

**Para o bash script:**

Crie uma conta na AWS e crie uma repositório privado no Elastic Container Registry. Tenha instalado e configurado o AWS CLI. Acesse o arquivo `server/ci/build_image.sh` e substitua a URLs referentes ao 
ECR pela URL do repositório criado recentemente. Acesse a pasta `server` e rode os comandos `npm run build` e `./ci/build_image.sh`, uma nova imagem será gerada e armazenada na AWS. Tal imagem possui 2 tags, a tag `dev` e a tag com a data e horário que foi gerada.

Existe um bash script que pode alterar a tag da imagem gerada, no arquivo `server/ci/retag.sh`. Para trocar a tag da imagem acesse a pasta `server` e rode o comando `./ci./retag.sh latest dev`, o primeiro argumento é a tag que será colocada, já o segundo argumento é tag atual da imagem.

**Para o github actions:**

O Github actions está configurado para subir a imagem no ECR quando há alguma alteração na pasta `server` e houve um push na branch `main`. A imagem irá para um ECR configurado pleo time, caso deseja trocar o local da imagem, é preciso trocar as variáveis de ambiente do github actions, `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY`, que são as variáveis geradas pelo AWS IAM ao criar um usuário. Além disso no arquivo `docker-image.yml` é preciso trocar o nome do repositório no `ECR_REPOSITORY`.

Caso queira criar a imagem apenas localmente, rode o comando `docker build -f Dockerfile`

