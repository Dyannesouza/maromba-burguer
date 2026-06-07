# Design System - Maromba Burguer

## Paleta de cores

- `--bg`: #070707
- `--bg-card`: #121212
- `--text`: #f4f4f4
- `--text-muted`: #b0b0b0
- `--brand-yellow`: #f7c94f
- `--brand-red`: #d32f2f
- `--brand-green`: #2e7d32

## Tipografia

- Fonte principal: `Inter`, sans-serif
- Tamanhos principais:
  - Título de página: 1.75rem - 2.2rem
  - Títulos de seção: 1.2rem
  - Botões: 0.85rem - 1rem

## Espaçamento

- Base: 24px
- Gaps internos: 10px, 12px, 18px
- Raio de borda padrão: 18px

## Componentes

### Botões

- `button` padrão com estilos primário, secundário, sucesso e perigo.
- Variedade de tamanhos:
  - `.button-small`
  - `.button-large`

### Cartões

- `.card` para containers de conteúdo.
- `.card-header` para título e controles do cartão.
- `.card-space-between` para header com botão à direita.

### Mesas

- `.table-card` exibe status de mesa e botões internos.
- Layout responsivo com `grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))`.

### Tabelas

- `.stock-table` com espaçamento entre linhas e células arredondadas.
- `th` com estilo uppercase e `td` com fundo escuro suave.

### Modais

- `.modal` com backdrop e `.modal-content` em fundo escuro.
- `.modal-actions` para alinhamento de botões de ação.

### Formulários

- `.field-group` com label e campo.
- `input`, `select`, `textarea` com borda suave e foco em amarelo.

### Cardápio

- Sub-abas de categoria: `Hambúrgueres`, `Bebidas`, `Sobremesas`, `Acompanhamentos`.
- `.menu-categories` para navegação interna do cardápio.

## Boas práticas

- Separe estrutura (`HTML`), estilo (`CSS`) e lógica (`JS`).
- Use classes semânticas para componentes reutilizáveis.
- Mantenha naming consistente e legível.
- Evite estilos inline para facilitar manutenção.

## Extensões futuras

- Adicionar tema escuro/claro configurável.
- Tornar o cardápio dinâmico com filtros de busca.
- Adicionar validação de formulário mais robusta.
