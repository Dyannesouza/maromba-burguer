# Maromba Burguer

Um dashboard para gerenciamento de restaurantes que controla mesas, cardápio, estoque, pedidos e pagamento.

## Estrutura do projeto

- `index.html` - Ponto de entrada da aplicação, com marcação limpa e componentes separados por seção.
- `styles.css` - Estilos do design system, variáveis de tema e componentes reutilizáveis.
- `maromba.js` - Lógica de negócio para mesa, pedidos, estoque, cardápio e impressão.
- `maromba1.html` - Versão original do projeto mantida como backup.
- `DESIGN_SYSTEM.md` - Documentação do padrão visual e composição de componentes.

## Como usar

1. Abra `index.html` em qualquer navegador moderno.
2. Ou abra a pasta no VS Code e use a extensão Live Server.
3. O app salva dados no `localStorage` do navegador.

## Principais funcionalidades

- Navegação entre `Dashboard`, `Financeiro`, `Estoque` e `Cardápio`.
- Criação de novas mesas e controle de pedido por mesa.
- Adição de produtos ao estoque e ao cardápio.
- Cardápio segmentado por sub-abas: `Hambúrgueres`, `Bebidas`, `Sobremesas`, `Acompanhamentos`.
- Impressão de comprovante via pop-up de impressão.

## Observações

- O aplicativo permanece totalmente estático e funciona sem servidor.
- Para restaurar produtos padrão, limpe o `localStorage` do navegador e recarregue a página.
