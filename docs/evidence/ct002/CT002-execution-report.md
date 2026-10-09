# CT002 — Relatório de execução

**Cenário:** Complete Journey: "Takeaway" Order  
**Sistema:** McBugs - Self-Service Kiosk  
**Data/hora:** 2026-09-23 ~12:46–12:50 (America/Sao_Paulo)  
**Ambiente:** `http://localhost:3000/`  
**Pedido criado:** `#3`

## Scenario Status

**Passed** — a jornada takeaway foi concluída do início ao fim. Categorias, quantidade no carrinho, criação do pedido e pagamento com cartão de crédito se comportaram conforme o caso. A confirmação **não** exibiu a mensagem de espera pelo número (diferença esperada em relação ao dine-in).

## Pré-condições

- App acessível em localhost:3000
- `localStorage` limpo antes do passo 1

## Executed Steps

| Id | Ação | Resultado | Evidência |
|----|------|-----------|-----------|
| 1 | Acessar `/` | **Passed.** Home com **Para comer aqui** e **Para levar**. | [step-01-home.png](./step-01-home.png) |
| 2 | Clicar em Takeaway | **Passed.** Redirect `/menu`. `mcbugs-order-type` = `takeaway`. | [step-02-03-menu.png](./step-02-03-menu.png) |
| 3 | Verificar o menu | **Passed.** Abas Lanches, Fritas, Bebidas, Sobremesas e produtos. | mesma evidência |
| 4 | Clicar na aba Fritas | **Passed.** Só produtos de fritas: Full Stack, Refatoradas, Minificadas. | [step-04-fritas.png](./step-04-fritas.png) |
| 5 | Clicar em Batatas Full Stack | **Passed.** URL `/product/batatas-fullstack`. | [step-05-06-07-fritas-detail.png](./step-05-06-07-fritas-detail.png) |
| 6 | Verificar detalhes | **Passed.** Imagem, nome, R$ 10,90, descrição e ingredientes. | mesma evidência |
| 7 | Manter quantidade 1 | **Passed.** Qty 1; botão de diminuir desabilitado. | mesma evidência |
| 8 | Clicar em Quero | **Passed.** Item no carrinho qty 1. Redirect `/menu`. Barra: R$ 10,90 / 1 item. | [step-08-menu-after-fritas.png](./step-08-menu-after-fritas.png) |
| 9 | Clicar na aba Bebidas | **Passed.** Coca-Crash, Fanta Warning, Água Localhost. | [step-09-bebidas.png](./step-09-bebidas.png) |
| 10 | Clicar em Fanta Warning | **Passed.** URL `/product/fanta-warning`. | [step-10-fanta.png](./step-10-fanta.png) |
| 11 | Aumentar quantidade para 3 | **Passed.** Qty 3; botão **Quero • R$ 17,70**. | [step-11-fanta-qty-3.png](./step-11-fanta-qty-3.png) |
| 12 | Clicar em Quero | **Passed.** Carrinho: fritas x1 + Fanta x3. Redirect `/menu`. | [step-12-13-cart-bar.png](./step-12-13-cart-bar.png) |
| 13 | Verificar barra do carrinho | **Passed.** R$ 28,60 / **4 itens**. | validado no snapshot da barra |
| 14 | Clicar em Ver pedido | **Passed.** Redirect `/cart`. | [step-14-15-cart.png](./step-14-15-cart.png) |
| 15 | Verificar itens | **Passed.** Batatas Full Stack qty 1 (R$ 10,90); Fanta Warning qty 3 (R$ 17,70). | mesma evidência |
| 16 | Aumentar quantidade de um item | **Passed.** Batatas Full Stack → qty 2; subtotal R$ 21,80. | [step-16-17-cart-updated.png](./step-16-17-cart-updated.png) |
| 17 | Verificar total | **Passed.** Total R$ 39,50 (21,80 + 17,70). | mesma evidência |
| 18 | Clicar em Finalizar pedido | **Passed.** Drawer **Finalizar Pedido** pedindo o nome. | [step-18-drawer.png](./step-18-drawer.png) |
| 19 | Informar "Maria Santos" | **Passed.** Campo preenchido. | [step-19-name-maria.png](./step-19-name-maria.png) |
| 20 | Clicar em Finalizar | **Passed (com observação).** Pedido `#3` criado (`pending`, `takeaway`). Mensagem "enviando a cozinha...." **não capturada** (redirect imediato). | — |
| 21 | Verificar redirect | **Passed.** URL `/payment`. Carrinho `[]`. | [step-21-22-payment.png](./step-21-22-payment.png) |
| 22 | Verificar pagamento | **Passed.** Pedido `#3`, total R$ 39,50. PIX, Débito e Crédito. | mesma evidência |
| 23 | Clicar em Cartão de Crédito | **Passed.** URL `/payment/credit/confirm`. Banco: `payment_method=credit`. | [step-23-24-25-credit-confirm.png](./step-23-24-25-credit-confirm.png) |
| 24 | Verificar confirmação | **Passed.** Número, total, Cartão de Crédito, instrução no balcão, cliente Maria Santos, tipo **Para levar**, data, itens. | mesma evidência |
| 25 | Sem mensagem de espera | **Passed.** Texto "aguarde ser chamado" **ausente** (`hasWaitMessage: false`). | mesma evidência |
| 26 | Verificar pedido no banco | **Passed.** Ver JSON abaixo. | consulta REST |
| 27 | Clicar em Start New Order | **Passed.** **Fazer Novo Pedido** → `/`. `orderType` e `currentOrder` nulos. | [step-27-home-reset.png](./step-27-home-reset.png) |

## Evidence

Pasta: `docs/evidence/ct002/`

### Pedido no banco (passo 26)

```json
{
  "id": 3,
  "customer_name": "Maria Santos",
  "order_type": "takeaway",
  "payment_method": "credit",
  "status": "pending",
  "total": 39.50,
  "items": [
    { "name": "Batatas Full Stack", "price": 10.9, "quantity": 2, "productId": "batatas-fullstack" },
    { "name": "Fanta Warning", "price": 5.9, "quantity": 3, "productId": "fanta-warning" }
  ]
}
```

`orderType=takeaway` foi mantido do passo 2 até o reset.

## Issues Found

1. **Rótulos do caso em inglês vs UI em português** (Takeaway → Para levar, Fries → Fritas, I Want → Quero, Complete Order → Finalizar pedido, Start New Order → Fazer Novo Pedido).
2. **Passo 20:** feedback "enviando a cozinha...." não foi visível; redirect para `/payment` foi imediato.
3. **Pedido nasce com `payment_method=pix`** e só depois da escolha vira `credit` (comportamento interno, resultado final no banco está correto).
4. Após reset, `mcbugs-cart-items` permanece `"[]"` em vez de ser removido.
5. Print do passo 11 ficou grande demais (provável corrida com o redirect do passo 12); a quantidade 3 e o preço R$ 17,70 foram confirmados no snapshot antes do clique em Quero.

## Improvement Suggestions

- Alinhar o documento de teste aos rótulos reais da UI.
- Exibir o estado "enviando a cozinha" por tempo perceptível.
- Só gravar `payment_method` quando o cliente escolher o método.
