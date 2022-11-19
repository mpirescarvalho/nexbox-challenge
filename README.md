# Projeto

O projeto foi feito com TypeScript, Express, TypeORM com sqlite. Jest e Supertest foram usados para os testes unitários, de integração e end-to-end.

# Rotas:

## Cadastra um ponto de interesse

`POST /pois/`

### Body

    {
      "name": "example",
      "x_coordinate": 1,
      "y_coordinate": 2
    }

## Lista todos os pontos de interesse

`GET /pois/`

## Lista pontos de interesse por proximidade

`POST /pois/nearby`

### Body

    {
      "x_coordinate": 1,
      "y_coordinate": 2,
      "max_distance": 10
    }

# Como rodar o projeto

Você vai precisar ter o [Node](https://nodejs.org/en/) e o [Yarn](https://yarnpkg.com/getting-started/install) instalados.

1\. Entre na pasta do projeto e altere as informações dos arquivos `.env.dev` e `.env.test` se necessário:

Exemplo:

```
DB_TYPE=sqlite
DB_DATABASE=./src/database/dev.database.sqlite
```

2\. Instale as depedências e execute o projeto:

```bash
$ yarn
$ yarn dev
```

3\. Para rodar os testes, execute:

```bash
$ yarn test
```

<br>
<br>
<br>

# Desafio Fullstack Nexbox

## Pontos de Interesse por GPS

A XY Inc. é uma empresa especializada na produção de excelentes receptores GPS (Global Positioning System).
A diretoria está empenhada em lançar um dispositivo inovador que promete auxiliar pessoas na localização de pontos de interesse (POIs), e precisa muito de sua ajuda.
Você foi contratado para desenvolver a plataforma que fornecerá toda a inteligência ao dispositivo! Esta plataforma deve ser baseada em serviços REST, de forma a flexibilizar a integração.

1. Construa um serviço para cadastrar pontos de interesse, com 3 atributos: Nome do POI, coordenada X (inteiro não negativo) e coordenada Y (inteiro não negativo). Os POIs devem ser armazenados em uma base de dados.

2. Construa um serviço para listar todos os POIs cadastrados.

3. Construa um serviço para listar POIs por proximidade. Este serviço receberá uma coordenada X e uma coordenada Y, especificando um ponto de referência, bem como uma distância máxima (d-max) em metros. O serviço deverá retornar todos os POIs da base de dados que estejam a uma distância menor ou igual a d-max a partir do ponto de referência.

4. Lembre-se que é um problema simplificado, para o calculo de distância use distância entre dois pontos em R^2.

#### Exemplo de Base de Dados:

- 'Lanchonete' (x=27, y=12)
- 'Posto' (x=31, y=18)
- 'Joalheria' (x=15, y=12)
- 'Floricultura' (x=19, y=21)
- 'Pub' (x=12, y=8)
- 'Supermercado' (x=23, y=6)
- 'Churrascaria' (x=28, y=2)

#### Exemplo de Uso:

Dado o ponto de referência (x=20, y=10) indicado pelo receptor GPS, e uma distância máxima de 10 metros, o serviço deve retornar os seguintes POIs:

- Lanchonete
- Joalheria
- Pub
- Supermercado

### O que vamos avaliar

#### Produtividade

Tente escrever o código pensando da forma mais produtiva possível. Um dos nossos pilares técnicos é a produtividade, não se importe com performance.

#### Qualidade

Outro pilar importante da Nexbox, é a qualidade de seus sitemas. Para isso, trabalhamos com testes automatizados. Esperamos que sejam feitos testes automatizados para o backend.

### Tecnologias

Esperamos que seja usada a linguagem javascript/node utilizando o framework express.

Fonte: https://github.com/backend-br/desafios/tree/master/3%20-%20Hard/Pontos%20de%20Interesse
