# vinyl-webapp

## O que é?
Esse repositório contém os assets da aplicação front-end proposta por um trabalho escolar focado em acessibilidade digital

## Arquitetura

```
vinyl-webapp
├─ /assets    # Recursos estáticos do projeto
|  |
│  ├─ /script # Toda parte de interatividade e regra de negócio via JavaScript
|  |  |
│  │  ├─ /controller # ───+
│  │  ├─ /model           |
│  │  ├─ /repository/api  |
│  │  └─ /view       # ───+── MVC clássico + Repository com clients da api do projeto
|  |
│  └─ /style # Toda parte de estilização com css
|
├─ /pages # Demais páginas do projeto
|  
└─ index.html # Página inicial e entry-point da aplicação

```

## Veja também

- [A api que essa aplicação consome](https://github.com/Vinyl-Figures/vinyl-api)
- [A modelagem do banco de dados do projeto](https://github.com/Vinyl-Figures/vinyl-banco)
