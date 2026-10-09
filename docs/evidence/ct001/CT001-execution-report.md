# CT001 — Relatório de execução

**Cenário:** Complete Journey: "Dine In" Order  
**Sistema:** McBugs - Self-Service Kiosk  
**Data/hora:** 2026-09-23 ~12:01–12:23 (America/Sao_Paulo)  
**Ambiente:** `http://localhost:3000/`  
**Pedido criado:** `#2`

## Scenario Status

**Passed** — a jornada dine-in foi concluída do início ao fim. O pedido foi gravado no Supabase com os dados esperados e o estado local foi limpo ao iniciar um novo pedido.

Há observações de UX/rótulos e um comportamento extra na tela PIX (confirmação visual automática) que não quebram o critério de aceite principal.

## Pré-condições

- App acessível em localhost:3000
- `localStorage` limpo antes do passo 1 (`{}`)

## Executed Steps

| Id | Ação | Resultado | Evidência |
|----|------|-----------|-----------|
| 1 | Acessar `/` | **Passed.** Home carregou com as opções de tipo de pedido. Rótulos na UI: **Para comer aqui** e **Para levar** (equivalentes a Dine In / Takeaway). | [step-01-home.png](./step-01-home.png) |
| 2 | Clicar em Dine In | **Passed.** Redirect para `/menu`. `localStorage.mcbugs-order-type` = `dine-in`. | [step-02-dine-in-menu.png](./step-02-dine-in-menu.png) |
| 3 | Verificar o menu | **Passed.** Categorias visíveis: Lanches, Fritas, Bebidas, Sobremesas. Produtos listados (ex.: Big Mock R$ 39,90). | [step-03-menu-categories.png](./step-03-menu-categories.png) |
| 4 | Clicar em Big Mock | **Passed.** Redirect para `/product/big-mock`. | [step-04-product-big-mock.png](./step-04-product-big-mock.png) |
| 5 | Verificar detalhes | **Passed.** Imagem, nome, preço R$ 39,90, descrição (Sobre) e ingredientes. | [step-05-product-details.png](./step-05-product-details.png) |
| 6 | Aumentar quantidade para 2 | **Passed.** Quantidade = 2. Botão **Quero • R$ 79,80**. | [step-06-qty-2.png](./step-06-qty-2.png) |
| 7 | Clicar em Quero | **Passed.** Item no carrinho com qty 2. Redirect para `/menu`. | [step-07-added-big-mock.png](./step-07-added-big-mock.png) |
| 8 | Verificar barra do carrinho | **Passed.** Total R$ 79,80 / 2 itens. Botão **Ver pedido**. | [step-08-cart-bar.png](./step-08-cart-bar.png) |
| 9 | Clicar em Coca-Crash | **Passed.** Foi necessário abrir a aba **Bebidas**. Redirect para `/product/coca-crash`. | [step-09-coca-crash.png](./step-09-coca-crash.png) |
| 10 | Clicar em Quero | **Passed.** Carrinho: Big Mock x2 + Coca-Crash x1. Redirect `/menu`. Barra: R$ 85,70 / 3 itens. | [step-10-coca-added.png](./step-10-coca-added.png) |
| 11 | Clicar em Ver pedido | **Passed.** Redirect para `/cart`. | [step-11-before-view-order.png](./step-11-before-view-order.png) |
| 12 | Verificar itens | **Passed.** Big Mock qty 2 (R$ 79,80) e Coca-Crash qty 1 (R$ 5,90). | [step-11-12-13-cart.png](./step-11-12-13-cart.png) |
| 13 | Verificar total | **Passed.** Total do pedido = R$ 85,70 (39,90×2 + 5,90). | mesma evidência |
| 14 | Clicar em Finalizar pedido | **Passed.** Drawer **Finalizar Pedido** pedindo o nome. | [step-14-checkout-drawer.png](./step-14-checkout-drawer.png) |
| 15 | Informar "João Silva" | **Passed.** Campo **Seu nome** com o texto. | [step-15-name-joao-silva.png](./step-15-name-joao-silva.png) |
| 16 | Clicar em Finalizar | **Passed (com observação).** Pedido criado (`#2`, `pending`, `dine-in`). A mensagem "enviando a cozinha...." **não foi capturada visualmente** — o redirect para `/payment` foi imediato. | — |
| 17 | Verificar redirect | **Passed.** URL `/payment`. Carrinho em localStorage: `[]`. | [step-17-18-payment.png](./step-17-18-payment.png) |
| 18 | Verificar pagamento | **Passed.** Pedido `#2`, total R$ 85,70. Opções: PIX, Cartão de Débito, Cartão de Crédito. | mesma evidência |
| 19 | Clicar em PIX | **Passed.** URL `/payment/pix/confirm`. `payment_method` = `pix` no banco. | [step-19-20-pix-confirm.png](./step-19-20-pix-confirm.png) |
| 20 | Verificar confirmação | **Passed.** Número, total, PIX, instrução de pagamento no balcão, cliente João Silva, tipo **Comer no local**, data, itens e mensagem: *Após o pagamento, aguarde ser chamado pelo número do seu pedido.* | mesma evidência |
| 21 | Verificar pedido no banco | **Passed.** Registro `orders.id=2`: `customer_name=João Silva`, `order_type=dine-in`, `payment_method=pix`, `status=pending`, `total=85.70`, `items` em JSON. | consulta REST no passo 21 |
| 22 | Clicar em Start New Order | **Passed.** Botão na UI: **Fazer Novo Pedido**. Redirect `/`. `orderType` e `currentOrder` nulos. Carrinho vazio. | [step-22-home-reset.png](./step-22-home-reset.png) |

## Evidence

Pasta: `docs/evidence/ct001/`

Na primeira sessão os PNGs dos passos 1–10 foram gravados em `/home/brunna/docs/evidence/ct001/` (cwd do Playwright MCP) e copiados para o repositório. A partir do passo 11 os arquivos foram salvos direto em `docs/evidence/ct001/`.

### Pedido no banco (passo 21)

```json
{
  "id": 2,
  "customer_name": "João Silva",
  "order_type": "dine-in",
  "payment_method": "pix",
  "status": "pending",
  "total": 85.70,
  "items": [
    { "name": "Big Mock", "price": 39.9, "quantity": 2, "productId": "big-mock" },
    { "name": "Coca-Crash", "price": 5.9, "quantity": 1, "productId": "coca-crash" }
  ]
}
```

## Issues Found

1. **Tela PIX confirma visualmente o pagamento após ~5s, mas o status no banco permanece `pending`.** A UI mostrou "Pagamento no Balcão" / pedido pago, enquanto `status` no Supabase e no `localStorage` continuou `pending`.
2. **Pedido já nasce com `payment_method=pix`** no `createOrder` (método temporário), antes da escolha na tela de pagamento.
3. **Rótulos do caso de teste estão em inglês; a UI está em português** (Dine In → Para comer aqui, I Want → Quero, View Order → Ver pedido, Complete Order → Finalizar pedido, Start New Order → Fazer Novo Pedido). O fluxo corresponde ao caso, mas o documento de teste não reflete a UI real.
4. **Mensagem de envio à cozinha** prevista no passo 16 não foi observada na execução (transição muito rápida). No código o texto é `enviando a cozinha....`, não `sending to the kitchen....`.
5. Após reset, `mcbugs-cart-items` ficou `"[]"` em vez de ser removido (efeito colateral de persistência do estado vazio). Funcionalmente o carrinho está vazio.

## Improvement Suggestions

- Alinhar o documento de teste aos rótulos reais da UI, ou internacionalizar a aplicação.
- Capturar/estender o estado "enviando a cozinha" o suficiente para o usuário perceber o feedback.
- Não marcar o PIX como pago na UI se o update de `status` no banco não confirmar.
- Só persistir `payment_method` quando o cliente escolher o método (não defaultar `pix` na criação).
