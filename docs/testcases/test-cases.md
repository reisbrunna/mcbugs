# Test Case Document - McBugs System

**System:** McBugs - Self-Service Kiosk  
**Creation Date:** 2026-09-23  
**Version:** 1.0

---

## Table of Contents

1. [Test Cases - Navigation and Home Page](#casos-de-teste---navegação-e-página-inicial)
2. [Test Cases - Menu and Products](#casos-de-teste---menu-e-produtos)
3. [Test Cases - Product Details](#casos-de-teste---detalhes-do-produto)
4. [Test Cases - Shopping Cart](#casos-de-teste---carrinho-de-compras)
5. [Test Cases - Order Completion](#casos-de-teste---finalização-de-pedido)
6. [Test Cases - Payment](#casos-de-teste---pagamento)
7. [Test Cases - Payment Confirmation](#casos-de-teste---confirmação-de-pagamento)
8. [Test Cases - Data Persistence](#casos-de-teste---persistência-de-dados)
9. [Test Cases - Error Handling](#casos-de-teste---tratamento-de-erros)

---

## Test Cases - Navigation and Home Page

### **CT001 - Acessar a Página Inicial do Sistema**

#### **Objective**

Validate that the McBugs home page loads correctly and displays the order type options (Dine in / Takeaway).

#### **Preconditions**

- The McBugs system must be online and accessible.
- The browser must be properly configured to access the system.
- The internet connection must be active.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access the system root URL (/) | The home page should load correctly. |
| 2      | Verify the logo display       | The McBugs logo should be displayed on the screen. |
| 3      | Verify the welcome message | The "Welcome!" message should be displayed. |
| 4      | Verify the order options      | Two options should be displayed: "Dine in" and "Takeaway". |

#### **Expected Results**

- The home page should load without errors.
- The system logo should be displayed correctly.
- Both order type options should be visible and clickable.
- The interface should be responsive and properly formatted.

#### **Acceptance Criteria**

- The home page loads in less than 3 seconds.
- All visual elements are displayed correctly.
- There are no errors in the browser console.

---

### **CT002 - Select Order Type "Para Comer Aqui"**

#### **Objective**

Validate that ao selecionar a opção "Dine in", o sistema define o tipo de pedido como "dine-in" e redireciona para a página do menu.

#### **Preconditions**

- The system must be accessible.
- The user must be on the home page (/).

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access the home page           | The home page should be displayed. |
| 2      | Click the "Dine in" button  | The system should definir o tipo de pedido como "dine-in". |
| 3      | Verify the redirect       | The user must ser redirecionado para a página /menu. |
| 4      | Verify order type persistence   | O tipo de pedido "dine-in" should be saved no localStorage. |

#### **Expected Results**

- O tipo de pedido "dine-in" é definido correctly.
- The redirect para /menu ocorre immediately após o clique.
- O tipo de pedido é persistido no localStorage.

#### **Acceptance Criteria**

- The redirect occurs without errors.
- O tipo de pedido é salvo correctly no localStorage com a chave "mcbugs-order-type".
- The menu page loads correctly.

---

### **CT003 - Select Order Type "Para Levar"**

#### **Objective**

Validate that ao selecionar a opção "Takeaway", o sistema define o tipo de pedido como "takeaway" e redireciona para a página do menu.

#### **Preconditions**

- The system must be accessible.
- The user must be on the home page (/).

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access the home page           | The home page should be displayed. |
| 2      | Click the "Takeaway" button       | The system should definir o tipo de pedido como "takeaway". |
| 3      | Verify the redirect       | The user must ser redirecionado para a página /menu. |
| 4      | Verify order type persistence   | O tipo de pedido "takeaway" should be saved no localStorage. |

#### **Expected Results**

- O tipo de pedido "takeaway" é definido correctly.
- The redirect para /menu ocorre immediately após o clique.
- O tipo de pedido é persistido no localStorage.

#### **Acceptance Criteria**

- The redirect occurs without errors.
- O tipo de pedido é salvo correctly no localStorage com a chave "mcbugs-order-type".
- The menu page loads correctly.

---

## Test Cases - Menu and Products

### **CT004 - View Menu with Categories**

#### **Objective**

Validate that a página do menu exibe correctly todas as categorias de produtos (Lanches, Fritas, Bebidas, Sobremesas) e permite a navegação entre elas.

#### **Preconditions**

- The system must be accessible.
- The user must ter selecionado um tipo de pedido (dine-in ou takeaway).
- The user must be on the /menu page.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access the menu page            | The menu page should load. |
| 2      | Verify category display | As abas de categorias (Lanches, Fritas, Bebidas, Sobremesas) should be displayed. |
| 3      | Verify the active category         | A categoria "Burgers" deve estar selecionada por padrão. |
| 4      | Verify the displayed products     | Os produtos da categoria "Burgers" should be displayed em formato de grid. |

#### **Expected Results**

- Todas as categorias são exibidas correctly.
- A categoria padrão (Lanches) está selecionada.
- Os produtos da categoria selecionada são exibidos em formato de cards.

#### **Acceptance Criteria**

- As categorias são clicáveis e funcionais.
- Os produtos são exibidos com imagem, nome e preço.
- The interface está responsiva e bem formatada.

---

### **CT005 - Filter Products by Category "Fries"**

#### **Objective**

Validate that ao clicar na categoria "Fries", apenas os produtos dessa categoria são exibidos.

#### **Preconditions**

- The user must be on the /menu page.
- The menu must be loaded with products.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access the menu page            | The menu page should be displayed. |
| 2      | Click na aba "Fries"              | A categoria "Fries" deve ser selecionada. |
| 3      | Verify the displayed products      | Apenas produtos da categoria "Fries" should be displayed. |
| 4      | Verify the number of products  | Deve haver 3 produtos de fritas (Batatas Full Stack, Batatas Refatoradas, Batatas Minificadas). |

#### **Expected Results**

- A categoria "Fries" é selecionada correctly.
- Apenas produtos da categoria "Fries" são exibidos.
- Os produtos são exibidos correctly com suas informações.

#### **Acceptance Criteria**

- A filtragem ocorre instantaneamente.
- Não há produtos de outras categorias sendo exibidos.
- Todos os produtos da categoria "Fries" são exibidos.

---

### **CT006 - Filter Products by Category "Drinks"**

#### **Objective**

Validate that ao clicar na categoria "Drinks", apenas os produtos dessa categoria são exibidos.

#### **Preconditions**

- The user must be on the /menu page.
- The menu must be loaded with products.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access the menu page            | The menu page should be displayed. |
| 2      | Click na aba "Drinks"             | A categoria "Drinks" deve ser selecionada. |
| 3      | Verify the displayed products     | Apenas produtos da categoria "Drinks" should be displayed. |
| 4      | Verify the number of products  | Deve haver 3 produtos de bebidas (Coca-Crash, Fanta Warning, Água Localhost). |

#### **Expected Results**

- A categoria "Drinks" é selecionada correctly.
- Apenas produtos da categoria "Drinks" são exibidos.
- Os produtos são exibidos correctly com suas informações.

#### **Acceptance Criteria**

- A filtragem ocorre instantaneamente.
- Não há produtos de outras categorias sendo exibidos.
- Todos os produtos da categoria "Drinks" são exibidos.

---

### **CT007 - Filter Products by Category "Desserts"**

#### **Objective**

Validate that ao clicar na categoria "Desserts", apenas os produtos dessa categoria são exibidos.

#### **Preconditions**

- The user must be on the /menu page.
- The menu must be loaded with products.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access the menu page            | The menu page should be displayed. |
| 2      | Click na aba "Desserts"          | A categoria "Desserts" deve ser selecionada. |
| 3      | Verify the displayed products      | Apenas produtos da categoria "Desserts" should be displayed. |
| 4      | Verify the number of products  | Deve haver 3 produtos de sobremesas (Casquinha Vanilla JS, Casquinha Dark Mode, Casquinha Pull Request). |

#### **Expected Results**

- A categoria "Desserts" é selecionada correctly.
- Apenas produtos da categoria "Desserts" são exibidos.
- Os produtos são exibidos correctly com suas informações.

#### **Acceptance Criteria**

- A filtragem ocorre instantaneamente.
- Não há produtos de outras categorias sendo exibidos.
- Todos os produtos da categoria "Desserts" são exibidos.

---

### **CT008 - Navigate Back to the Home Page from the Menu**

#### **Objective**

Validate that o botão de voltar na página do menu redireciona correctly para a página inicial.

#### **Preconditions**

- The user must be on the /menu page.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access the menu page            | The menu page should be displayed. |
| 2      | Locate the back button (arrow)  | The button de voltar should be visible no canto superior esquerdo. |
| 3      | Click the back button           | The user must ser redirecionado para a página inicial (/). |

#### **Expected Results**

- The button de voltar está visível e funcional.
- The redirect para a página inicial ocorre correctly.
- The page inicial é carregada without errors.

#### **Acceptance Criteria**

- The redirect ocorre immediately após o clique.
- Não há erros durante a navegação.
- The page inicial é exibida correctly.

---

## Test Cases - Product Details

### **CT009 - View Product Details**

#### **Objective**

Validate that ao clicar em um produto no menu, a página de detalhes do produto é exibida com todas as informações corretas.

#### **Preconditions**

- The user must be on the /menu page.
- Deve haver produtos disponíveis no menu.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access the menu page            | The menu page should be displayed. |
| 2      | Click em um produto (ex: Big Mock) | The user must ser redirecionado para /product/big-mock. |
| 3      | Verify the product image       | A imagem do produto should be displayed correctly. |
| 4      | Verify the product name         | O nome do produto should be displayed. |
| 5      | Verify the price                   | O preço do produto should be displayed formatado. |
| 6      | Verify the description               | A descrição do produto should be displayed. |
| 7      | Verify the ingredients           | A lista de ingredientes should be displayed (se disponível). |

#### **Expected Results**

- The page de detalhes do produto é carregada correctly.
- Todas as informações do produto são exibidas.
- A imagem do produto é carregada without errors.
- Os ingredientes são listados correctly.

#### **Acceptance Criteria**

- The page é carregada em menos de 2 segundos.
- Todas as informações são exibidas correctly.
- There are no errors in the browser console.

---

### **CT010 - Increase Product Quantity**

#### **Objective**

Validate that o controle de quantidade permite aumentar a quantidade do produto antes de adicionar ao carrinho.

#### **Preconditions**

- The user must estar na página de detalhes de um produto.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access a product details page | The details page should be displayed. |
| 2      | Verify the initial quantity      | The quantity inicial deve ser 1. |
| 3      | Click the increase (+) button    | The quantity deve ser incrementada para 2. |
| 4      | Click novamente no botão de aumentar | The quantity deve ser incrementada para 3. |
| 5      | Verify the price total            | O preço total exibido no botão should be updated (preço × quantidade). |

#### **Expected Results**

- The quantity é incrementada correctly.
- O preço total é atualizado dinamicamente.
- Não há limite máximo de quantidade (ou o limite é respeitado se existir).

#### **Acceptance Criteria**

- The quantity pode ser aumentada múltiplas vezes.
- O preço total é calculado correctly.
- The interface responde immediately às ações do usuário.

---

### **CT011 - Decrease Product Quantity**

#### **Objective**

Validate that o controle de quantidade permite diminuir a quantidade do produto, mas não permite valores menores que 1.

#### **Preconditions**

- The user must estar na página de detalhes de um produto.
- The quantity deve ser maior que 1.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access a product details page | The details page should be displayed. |
| 2      | Aumentar a quantidade para 3        | The quantity deve ser 3. |
| 3      | Click the decrease (-) button    | The quantity deve ser decrementada para 2. |
| 4      | Click novamente no botão de diminuir | The quantity deve ser decrementada para 1. |
| 5      | Tentar diminuir quando a quantidade é 1 | The quantity should remain em 1 (não pode ser menor que 1). |
| 6      | Verify the price total            | O preço total should be updated correctly. |

#### **Expected Results**

- The quantity é decrementada correctly.
- The quantity não pode ser menor que 1.
- O preço total é atualizado dinamicamente.

#### **Acceptance Criteria**

- The quantity mínima é respeitada (valor 1).
- O preço total é calculado correctly.
- The interface responde immediately às ações do usuário.

---

### **CT012 - Add Product to Cart from the Details Page**

#### **Objective**

Validate that ao clicar no botão "I Want" na página de detalhes, o produto é adicionado ao carrinho e o usuário é redirecionado para o menu.

#### **Preconditions**

- The user must estar na página de detalhes de um produto.
- The cart pode estar vazio ou conter outros produtos.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Access a product details page | The details page should be displayed. |
| 2      | Set the desired quantity (e.g., 2) | The quantity deve ser definida. |
| 3      | Click no botão "I Want • [preço]"  | O produto deve ser adicionado ao carrinho com a quantidade especificada. |
| 4      | Verify the redirect       | The user must ser redirecionado para /menu. |
| 5      | Verify the cart               | O produto deve estar no carrinho com a quantidade correta. |

#### **Expected Results**

- O produto é adicionado ao carrinho com sucesso.
- The quantity especificada é respeitada.
- The redirect para o menu ocorre correctly.
- The cart é atualizado e exibido na barra inferior.

#### **Acceptance Criteria**

- O produto é adicionado ao carrinho immediately.
- Se o produto já existir no carrinho, a quantidade é somada.
- The cart é persistido no localStorage.

---

### **CT013 - Access the Cart from the Product Details Page**

#### **Objective**

Validate that o ícone do carrinho na página de detalhes permite navegar para a página do carrinho.

#### **Preconditions**

- The user must estar na página de detalhes de um produto.
- The cart must conter pelo menos um item.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Add a product to the cart   | O produto deve ser adicionado ao carrinho. |
| 2      | Acessar a página de detalhes de outro produto | The details page should be displayed. |
| 3      | Verify the cart icon       | O ícone do carrinho should be visible no canto superior direito. |
| 4      | Verify the item counter       | O contador deve exibir a quantidade de itens no carrinho. |
| 5      | Click the cart icon         | The user must ser redirecionado para /cart. |

#### **Expected Results**

- O ícone do carrinho está visível quando há itens no carrinho.
- O contador exibe a quantidade correta de itens.
- The redirect para o carrinho ocorre correctly.

#### **Acceptance Criteria**

- O ícone do carrinho só aparece quando há itens no carrinho.
- O contador é atualizado em tempo real.
- The redirect occurs without errors.

---

### **CT014 - Access a Nonexistent Product Page**

#### **Objective**

Validate that ao acessar uma URL de produto que não existe, o sistema exibe uma mensagem apropriada.

#### **Preconditions**

- The system must be accessible.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar uma URL de produto inexistente (ex: /product/produto-inexistente) | The page should ser carregada. |
| 2      | Verify a mensagem exibida       | Uma mensagem "Product not found" should be displayed. |

#### **Expected Results**

- The system não apresenta erros críticos.
- Uma mensagem apropriada é exibida ao usuário.
- The system permanece funcional.

#### **Acceptance Criteria**

- There are no errors in the browser console.
- The message é clara e informativa.
- O usuário pode navegar para outras páginas normalmente.

---

## Test Cases - Shopping Cart

### **CT015 - View Empty Cart**

#### **Objective**

Validate that quando o carrinho está vazio, a página do carrinho exibe uma mensagem apropriada e um botão para voltar ao menu.

#### **Preconditions**

- The cart must estar vazio.
- The user must acessar a página /cart.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /cart com o carrinho vazio | The page do carrinho should load. |
| 2      | Verify a mensagem exibida       | The message "Nothing Found Here" should be displayed. |
| 3      | Verify the description              | A descrição "Your cart is empty. Add some delicious items!" should be displayed. |
| 4      | Verify o botão "View Menu"   | The button should be visible e funcional. |
| 5      | Click no botão "View Menu"     | The user must ser redirecionado para /menu. |

#### **Expected Results**

- The message de carrinho vazio é exibida correctly.
- The button para voltar ao menu está funcional.
- The interface está bem formatada e clara.

#### **Acceptance Criteria**

- The message é clara e informativa.
- The button de navegação funciona correctly.
- Não há erros na página.

---

### **CT016 - View Items in the Cart**

#### **Objective**

Validate that a página do carrinho exibe correctly todos os itens adicionados, com suas informações e quantidades.

#### **Preconditions**

- The cart must conter pelo menos um produto.
- The user must acessar a página /cart.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Adicionar produtos ao carrinho     | Os produtos devem ser adicionados ao carrinho. |
| 2      | Acessar a página /cart             | The page do carrinho should load. |
| 3      | Verify a listagem de itens      | Todos os produtos adicionados should be displayed. |
| 4      | Verify as informações de cada item | Cada item deve exibir: nome, preço unitário, quantidade e subtotal. |
| 5      | Verify o total do pedido        | The total do pedido should be displayed e calculado correctly. |

#### **Expected Results**

- Todos os itens do carrinho são exibidos correctly.
- The information de cada item estão completas e corretas.
- The total do pedido é calculado e exibido correctly.

#### **Acceptance Criteria**

- A listagem de itens está bem formatada.
- O cálculo do total está correto.
- Não há itens duplicados incorrectly.

---

### **CT017 - Increase Item Quantity in the Cart**

#### **Objective**

Validate that é possível aumentar a quantidade de um item diretamente no carrinho.

#### **Preconditions**

- The cart must conter pelo menos um produto.
- The user must estar na página /cart.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /cart             | The page do carrinho should be displayed. |
| 2      | Locate um item no carrinho      | O item should be visible na listagem. |
| 3      | Verify a quantidade atual       | The quantity atual should be displayed. |
| 4      | Click the increase (+) button    | The quantity deve ser incrementada. |
| 5      | Verify o subtotal do item       | O subtotal do item should be updated (preço × nova quantidade). |
| 6      | Verify o total do pedido        | The total do pedido should be updated. |

#### **Expected Results**

- The quantity do item é incrementada correctly.
- O subtotal do item é recalculado.
- The total do pedido é atualizado.

#### **Acceptance Criteria**

- A atualização ocorre immediately.
- Os cálculos estão corretos.
- As alterações são persistidas no localStorage.

---

### **CT018 - Decrease Item Quantity in the Cart**

#### **Objective**

Validate that é possível diminuir a quantidade de um item no carrinho, e que ao chegar a zero, o item é removido.

#### **Preconditions**

- The cart must conter pelo menos um produto com quantidade maior que 1.
- The user must estar na página /cart.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /cart             | The page do carrinho should be displayed. |
| 2      | Locate um item com quantidade > 1 | O item should be visible na listagem. |
| 3      | Verify a quantidade atual       | The quantity atual should be displayed. |
| 4      | Click the decrease (-) button    | The quantity deve ser decrementada. |
| 5      | Verify o subtotal do item       | O subtotal do item should be updated. |
| 6      | Diminuir até quantidade 1          | The quantity deve ser 1. |
| 7      | Diminuir novamente                 | O item should be removed do carrinho. |
| 8      | Verify o total do pedido        | The total do pedido should be updated. |

#### **Expected Results**

- The quantity do item é decrementada correctly.
- Quando a quantidade chega a zero, o item é removido.
- The total do pedido é atualizado correctly.

#### **Acceptance Criteria**

- A remoção ocorre quando a quantidade chega a zero.
- Os cálculos estão corretos.
- As alterações são persistidas no localStorage.

---

### **CT019 - Remove Item from the Cart**

#### **Objective**

Validate that é possível remover um item do carrinho usando o botão de remoção.

#### **Preconditions**

- The cart must conter pelo menos um produto.
- The user must estar na página /cart.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /cart             | The page do carrinho should be displayed. |
| 2      | Locate um item no carrinho      | O item should be visible na listagem. |
| 3      | Verify o botão de remoção       | The button de remover (ícone X ou lixeira) should be visible. |
| 4      | Click no botão de remoção         | O item should be removed do carrinho. |
| 5      | Verify a listagem atualizada    | O item removido não deve mais aparecer na listagem. |
| 6      | Verify o total do pedido        | The total do pedido should be updated (sem incluir o item removido). |

#### **Expected Results**

- O item é removido immediately do carrinho.
- A listagem é atualizada sem o item removido.
- The total do pedido é recalculado correctly.

#### **Acceptance Criteria**

- A remoção ocorre instantaneamente.
- The total é recalculado correctly.
- As alterações são persistidas no localStorage.

---

### **CT020 - Continue Shopping from the Cart**

#### **Objective**

Validate that o botão "Continue Shopping" redireciona o usuário de volta para o menu.

#### **Preconditions**

- The cart must conter pelo menos um produto.
- The user must estar na página /cart.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /cart             | The page do carrinho should be displayed. |
| 2      | Locate o botão "Continue Shopping" | The button should be visible na parte inferior da página. |
| 3      | Click no botão "Continue Shopping" | The user must ser redirecionado para /menu. |
| 4      | Verify que o carrinho foi mantido | The items do carrinho devem permanecer no carrinho. |

#### **Expected Results**

- The redirect para o menu ocorre correctly.
- The items do carrinho são mantidos.
- O usuário pode continuar adicionando produtos.

#### **Acceptance Criteria**

- The redirect occurs without errors.
- The cart é preservado.
- The menu page loads correctly.

---

### **CT021 - Verify the Cart Bar on the Menu Page**

#### **Objective**

Validate that quando há itens no carrinho, uma barra inferior é exibida na página do menu com o total e um botão para ver o pedido.

#### **Preconditions**

- The cart must conter pelo menos um produto.
- The user must be on the /menu page.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Adicionar produtos ao carrinho     | Os produtos devem ser adicionados ao carrinho. |
| 2      | Acessar a página /menu             | The menu page should load. |
| 3      | Verify a barra de carrinho      | Uma barra fixa na parte inferior should be displayed. |
| 4      | Verify o total exibido           | The total do pedido should be displayed na barra. |
| 5      | Verify a quantidade de itens    | The quantity de itens should be displayed. |
| 6      | Verify o botão "View Order"     | The button should be visible e funcional. |
| 7      | Click no botão "View Order"        | The user must ser redirecionado para /cart. |

#### **Expected Results**

- A barra de carrinho é exibida quando há itens no carrinho.
- The total e a quantidade de itens são exibidos correctly.
- The button de navegação funciona correctly.

#### **Acceptance Criteria**

- A barra só aparece quando há itens no carrinho.
- Os valores exibidos estão corretos.
- The button de navegação funciona without errors.

---

## Test Cases - Order Completion

### **CT022 - Complete Order with a Valid Name**

#### **Objective**

Validate that é possível finalizar um pedido fornecendo um nome válido e que o pedido é criado no banco de dados.

#### **Preconditions**

- The cart must conter pelo menos um produto.
- The user must estar na página /cart.
- The system should estar conectado ao Supabase.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /cart             | The page do carrinho should be displayed. |
| 2      | Click no botão "Complete Order" | Um drawer deve ser aberto solicitando o nome do cliente. |
| 3      | Verify o campo de nome          | The field de nome should be visible e editável. |
| 4      | Enter um nome válido (ex: "João Silva") | O nome deve ser inserido no campo. |
| 5      | Click no botão "Complete"        | The system should criar o pedido no banco de dados. |
| 6      | Verify o estado de carregamento | Uma mensagem "sending to the kitchen...." should be displayed. |
| 7      | Verify the redirect       | The user must ser redirecionado para /payment. |
| 8      | Verify que o carrinho foi limpo | The cart must estar vazio após a criação do pedido. |

#### **Expected Results**

- The order é criado no banco de dados com sucesso.
- The order recebe um ID único.
- The cart é limpo após a criação do pedido.
- The redirect para a página de pagamento ocorre correctly.

#### **Acceptance Criteria**

- The order é salvo no banco de dados com status "pending".
- Todos os dados do pedido são salvos correctly (itens, total, tipo de pedido, nome do cliente).
- The cart é limpo do localStorage.

---

### **CT023 - Attempt to Complete Order Without Entering a Name**

#### **Objective**

Validate that o sistema não permite finalizar um pedido sem inserir um nome.

#### **Preconditions**

- The cart must conter pelo menos um produto.
- The user must estar na página /cart.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /cart             | The page do carrinho should be displayed. |
| 2      | Click no botão "Complete Order" | Um drawer deve ser aberto solicitando o nome do cliente. |
| 3      | Verify que o campo está vazio   | The field de nome should be empty ou com valor padrão. |
| 4      | Limpar o campo de nome (se houver valor padrão) | The field should be empty. |
| 5      | Tentar clicar no botão "Complete" | The button deve estar desabilitado ou o formulário deve impedir o envio. |
| 6      | Verify a validação              | The system should exigir que o nome seja preenchido (validação HTML5 ou customizada). |

#### **Expected Results**

- The system não permite finalizar o pedido sem nome.
- Uma validação é exibida (mensagem de erro ou campo destacado).
- O drawer permanece aberto.

#### **Acceptance Criteria**

- A validação funciona correctly.
- O usuário recebe feedback claro sobre o erro.
- The order não é criado sem nome.

---

### **CT024 - Cancel Order Completion**

#### **Objective**

Validate that é possível cancelar a finalização do pedido e fechar o drawer sem criar o pedido.

#### **Preconditions**

- The cart must conter pelo menos um produto.
- The user must estar na página /cart.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /cart             | The page do carrinho should be displayed. |
| 2      | Click no botão "Complete Order" | Um drawer deve ser aberto solicitando o nome do cliente. |
| 3      | Click no botão "Cancel"         | O drawer deve ser fechado. |
| 4      | Verify que o pedido não foi criado | Nenhum pedido should be created no banco de dados. |
| 5      | Verify que o carrinho foi mantido | The items do carrinho devem permanecer intactos. |

#### **Expected Results**

- O drawer é fechado correctly.
- Nenhum pedido é criado.
- The cart permanece com os itens.

#### **Acceptance Criteria**

- O cancelamento funciona without errors.
- O estado do carrinho é preservado.
- O usuário pode tentar novamente posteriormente.

---

## Test Cases - Payment

### **CT025 - View Payment Page**

#### **Objective**

Validate that a página de pagamento exibe correctly as informações do pedido e as opções de pagamento disponíveis.

#### **Preconditions**

- Deve existir um pedido criado (currentOrder).
- The user must ser redirecionado para /payment após criar o pedido.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Create an order                    | Um pedido should be created com sucesso. |
| 2      | Ser redirecionado para /payment    | The page de pagamento should load. |
| 3      | Verify as informações do pedido | O número do pedido e o total should be displayed. |
| 4      | Verify as opções de pagamento   | Três opções should be displayed: PIX, Cartão de Débito, Cartão de Crédito. |
| 5      | Verify the description de cada método | Cada método deve exibir uma descrição. |
| 6      | Verify o botão de cancelar      | The button "Cancel Order" should be visible. |

#### **Expected Results**

- The information do pedido são exibidas correctly.
- Todas as opções de pagamento estão disponíveis.
- The interface está bem formatada e clara.

#### **Acceptance Criteria**

- The page é carregada without errors.
- Todas as informações estão corretas.
- As opções de pagamento são clicáveis.

---

### **CT026 - Access Payment Page Without an Order**

#### **Objective**

Validate that ao acessar a página de pagamento sem ter um pedido criado, o sistema redireciona para a página inicial.

#### **Preconditions**

- Não deve existir um pedido ativo (currentOrder = null).
- O usuário tenta acessar /payment diretamente.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Clear localStorage (remover pedido) | localStorage deve estar sem pedido ativo. |
| 2      | Acessar diretamente /payment        | The system should detectar que não há pedido. |
| 3      | Verify the redirect       | The user must ser redirecionado para a página inicial (/). |

#### **Expected Results**

- The system detecta a ausência de pedido.
- The redirect para a página inicial ocorre automaticamente.
- Não há erros no console.

#### **Acceptance Criteria**

- The redirect ocorre immediately.
- Não há erros críticos.
- The page inicial é carregada correctly.

---

### **CT027 - Select PIX Payment Method**

#### **Objective**

Validate that ao selecionar o método de pagamento PIX, o sistema atualiza o pedido e redireciona para a página de confirmação.

#### **Preconditions**

- Deve existir um pedido criado.
- The user must estar na página /payment.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /payment          | The page de pagamento should be displayed. |
| 2      | Click na opção "PIX"              | The payment method deve ser selecionado. |
| 3      | Verify a atualização no banco   | The payment method do pedido should be updated para "pix" no banco de dados. |
| 4      | Verify the redirect       | The user must ser redirecionado para /payment/pix/confirm. |

#### **Expected Results**

- The payment method é atualizado no banco de dados.
- The redirect para a página de confirmação ocorre correctly.
- The order mantém todas as outras informações.

#### **Acceptance Criteria**

- A atualização no banco de dados é bem-sucedida.
- The redirect occurs without errors.
- The payment method é salvo correctly.

---

### **CT028 - Select Debit Card Payment Method**

#### **Objective**

Validate that ao selecionar o método de pagamento Cartão de Débito, o sistema atualiza o pedido e redireciona para a página de confirmação.

#### **Preconditions**

- Deve existir um pedido criado.
- The user must estar na página /payment.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /payment          | The page de pagamento should be displayed. |
| 2      | Click na opção "Debit Card" | The payment method deve ser selecionado. |
| 3      | Verify a atualização no banco   | The payment method do pedido should be updated para "debit" no banco de dados. |
| 4      | Verify the redirect       | The user must ser redirecionado para /payment/debit/confirm. |

#### **Expected Results**

- The payment method é atualizado no banco de dados.
- The redirect para a página de confirmação ocorre correctly.
- The order mantém todas as outras informações.

#### **Acceptance Criteria**

- A atualização no banco de dados é bem-sucedida.
- The redirect occurs without errors.
- The payment method é salvo correctly.

---

### **CT029 - Select Credit Card Payment Method**

#### **Objective**

Validate that ao selecionar o método de pagamento Cartão de Crédito, o sistema atualiza o pedido e redireciona para a página de confirmação.

#### **Preconditions**

- Deve existir um pedido criado.
- The user must estar na página /payment.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /payment          | The page de pagamento should be displayed. |
| 2      | Click na opção "Credit Card" | The payment method deve ser selecionado. |
| 3      | Verify a atualização no banco   | The payment method do pedido should be updated para "credit" no banco de dados. |
| 4      | Verify the redirect       | The user must ser redirecionado para /payment/credit/confirm. |

#### **Expected Results**

- The payment method é atualizado no banco de dados.
- The redirect para a página de confirmação ocorre correctly.
- The order mantém todas as outras informações.

#### **Acceptance Criteria**

- A atualização no banco de dados é bem-sucedida.
- The redirect occurs without errors.
- The payment method é salvo correctly.

---

### **CT030 - Cancel Order on the Payment Page**

#### **Objective**

Validate that é possível cancelar um pedido na página de pagamento e que o pedido é atualizado no banco de dados com status "cancelled".

#### **Preconditions**

- Deve existir um pedido criado.
- The user must estar na página /payment.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /payment          | The page de pagamento should be displayed. |
| 2      | Locate o botão "Cancel Order" | The button should be visible na parte inferior da página. |
| 3      | Click no botão "Cancel Order"  | The order must ser atualizado no banco de dados com status "cancelled". |
| 4      | Verify the redirect       | The user must ser redirecionado para a página inicial (/). |
| 5      | Verify a limpeza do estado      | The cart e o pedido atual devem ser limpos do localStorage. |

#### **Expected Results**

- The order é atualizado no banco de dados com status "cancelled".
- O estado do sistema é limpo (carrinho e pedido atual).
- The redirect para a página inicial ocorre correctly.

#### **Acceptance Criteria**

- A atualização no banco de dados é bem-sucedida.
- localStorage é limpo correctly.
- O usuário pode iniciar um novo pedido.

---

## Test Cases - Payment Confirmation

### **CT031 - View PIX Payment Confirmation Page**

#### **Objective**

Validate that a página de confirmação de pagamento PIX exibe correctly todas as informações do pedido e as instruções de pagamento.

#### **Preconditions**

- Deve existir um pedido criado com método de pagamento PIX.
- The user must ser redirecionado para /payment/pix/confirm.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Selecionar método de pagamento PIX | The user must ser redirecionado para /payment/pix/confirm. |
| 2      | Verify o cabeçalho             | O ícone e nome "PIX" should be displayed. |
| 3      | Verify as informações do pedido  | O número do pedido e o total should be displayed. |
| 4      | Verify as instruções de pagamento | As instruções "Payment at the Counter" should be displayed. |
| 5      | Verify os detalhes do pedido    | Cliente, tipo, forma de pagamento e data should be displayed. |
| 6      | Verify a listagem de itens      | Todos os itens do pedido devem ser listados com quantidade e preço. |
| 7      | Verify mensagem para dine-in    | Se o tipo for "dine-in", uma mensagem sobre aguardar ser chamado should be displayed. |

#### **Expected Results**

- Todas as informações do pedido são exibidas correctly.
- As instruções de pagamento são claras.
- The interface está bem formatada.

#### **Acceptance Criteria**

- The page é carregada without errors.
- Todas as informações estão corretas e atualizadas.
- The interface está responsiva e clara.

---

### **CT032 - View Card Payment Confirmation Page**

#### **Objective**

Validate that a página de confirmação de pagamento para cartão (débito ou crédito) exibe correctly todas as informações do pedido.

#### **Preconditions**

- Deve existir um pedido criado com método de pagamento cartão (débito ou crédito).
- The user must ser redirecionado para /payment/debit/confirm ou /payment/credit/confirm.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Selecionar método de pagamento cartão | The user must ser redirecionado para a página de confirmação correspondente. |
| 2      | Verify o cabeçalho             | O ícone e nome do método (Cartão de Débito ou Cartão de Crédito) should be displayed. |
| 3      | Verify as informações do pedido  | O número do pedido e o total should be displayed. |
| 4      | Verify as instruções de pagamento | As instruções "Payment at the Counter" should be displayed. |
| 5      | Verify os detalhes do pedido    | Cliente, tipo, forma de pagamento e data should be displayed. |
| 6      | Verify a listagem de itens      | Todos os itens do pedido devem ser listados. |

#### **Expected Results**

- Todas as informações do pedido são exibidas correctly.
- The payment method correto é exibido.
- As instruções são claras.

#### **Acceptance Criteria**

- The page é carregada without errors.
- Todas as informações estão corretas.
- The payment method é exibido correctly.

---

### **CT033 - Access Confirmation Page Without an Order**

#### **Objective**

Validate that ao acessar a página de confirmação sem ter um pedido criado, o sistema redireciona para a página de pagamento.

#### **Preconditions**

- Não deve existir um pedido ativo (currentOrder = null).
- O usuário tenta acessar /payment/pix/confirm diretamente.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Clear localStorage (remover pedido) | localStorage deve estar sem pedido ativo. |
| 2      | Acessar diretamente /payment/pix/confirm | The system should detectar que não há pedido. |
| 3      | Verify the redirect       | The user must ser redirecionado para /payment. |

#### **Expected Results**

- The system detecta a ausência de pedido.
- The redirect para a página de pagamento ocorre automaticamente.
- Não há erros no console.

#### **Acceptance Criteria**

- The redirect ocorre immediately.
- Não há erros críticos.
- The page de pagamento é carregada correctly.

---

### **CT034 - Start a New Order After Confirmation**

#### **Objective**

Validate that ao clicar no botão "Start New Order" na página de confirmação, o sistema limpa o estado e redireciona para a página inicial.

#### **Preconditions**

- The user must estar na página de confirmação de pagamento.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página de confirmação    | The page de confirmação should be displayed. |
| 2      | Locate o botão "Start New Order" | The button should be visible na parte inferior da página. |
| 3      | Click no botão "Start New Order" | O estado do sistema should be cleared (carrinho e pedido atual). |
| 4      | Verify the redirect       | The user must ser redirecionado para a página inicial (/). |
| 5      | Verify a limpeza do localStorage | localStorage deve estar limpo (sem carrinho e sem pedido). |

#### **Expected Results**

- O estado do sistema é limpo correctly.
- The redirect para a página inicial ocorre.
- O usuário pode iniciar um novo pedido do zero.

#### **Acceptance Criteria**

- localStorage é limpo correctly.
- The redirect occurs without errors.
- The page inicial é carregada correctly.

---

### **CT035 - Return to the Payment Page from Confirmation**

#### **Objective**

Validate that o botão de voltar na página de confirmação redireciona de volta para a página de pagamento.

#### **Preconditions**

- The user must estar na página de confirmação de pagamento.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página de confirmação    | The page de confirmação should be displayed. |
| 2      | Locate the back button (arrow) | The button de voltar should be visible no canto superior esquerdo. |
| 3      | Click the back button           | The user must ser redirecionado para /payment. |
| 4      | Verify que o pedido foi mantido | The order atual should remain no estado do sistema. |

#### **Expected Results**

- The redirect para a página de pagamento ocorre correctly.
- The order atual é mantido.
- O usuário pode selecionar outro método de pagamento.

#### **Acceptance Criteria**

- The redirect occurs without errors.
- The order é preservado.
- The page de pagamento é carregada correctly.

---

## Test Cases - Data Persistence

### **CT036 - Cart Persistence in localStorage**

#### **Objective**

Validate that os itens do carrinho são persistidos no localStorage e mantidos após recarregar a página.

#### **Preconditions**

- The system must be accessible.
- O navegador deve suportar localStorage.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Adicionar produtos ao carrinho     | Os produtos devem ser adicionados ao carrinho. |
| 2      | Verify o localStorage           | The items devem ser salvos no localStorage com a chave "mcbugs-cart-items". |
| 3      | Reload the page (F5)           | The page should ser recarregada. |
| 4      | Verify the cart após recarregar | The items do carrinho devem ser restaurados do localStorage. |
| 5      | Verify a quantidade de itens    | The quantity de itens deve ser a mesma antes e depois do recarregamento. |
| 6      | Verify o total do pedido        | The total do pedido deve ser o mesmo antes e depois do recarregamento. |

#### **Expected Results**

- The items do carrinho são salvos no localStorage.
- The items são restaurados correctly após recarregar a página.
- As quantidades e totais são mantidos correctly.

#### **Acceptance Criteria**

- localStorage é atualizado immediately após adicionar itens.
- A restauração ocorre automaticamente ao carregar a página.
- Não há perda de dados durante o recarregamento.

---

### **CT037 - Order Type Persistence in localStorage**

#### **Objective**

Validate that o tipo de pedido (dine-in ou takeaway) é persistido no localStorage e mantido após recarregar a página.

#### **Preconditions**

- The system must be accessible.
- O navegador deve suportar localStorage.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Selecionar tipo de pedido "Dine in" | O tipo "dine-in" deve ser definido. |
| 2      | Verify o localStorage           | O tipo should be saved no localStorage com a chave "mcbugs-order-type". |
| 3      | Reload the page (F5)           | The page should ser recarregada. |
| 4      | Verify o tipo após recarregar   | O tipo de pedido "dine-in" should be restored do localStorage. |
| 5      | Selecionar tipo "Takeaway"      | O tipo "takeaway" deve ser definido. |
| 6      | Reload the page novamente      | O tipo "takeaway" should be restored. |

#### **Expected Results**

- O tipo de pedido é salvo no localStorage.
- O tipo é restaurado correctly após recarregar a página.
- O tipo é mantido durante toda a sessão.

#### **Acceptance Criteria**

- localStorage é atualizado immediately após selecionar o tipo.
- A restauração ocorre automaticamente ao carregar a página.
- O tipo é usado correctly ao criar o pedido.

---

### **CT038 - Current Order Persistence in localStorage**

#### **Objective**

Validate that o pedido atual (currentOrder) é persistido no localStorage e mantido após recarregar a página.

#### **Preconditions**

- Deve existir um pedido criado.
- O navegador deve suportar localStorage.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Create an order                    | Um pedido should be created com sucesso. |
| 2      | Verify o localStorage           | The order must ser salvo no localStorage com a chave "mcbugs-current-order". |
| 3      | Reload the page (F5)           | The page should ser recarregada. |
| 4      | Verify o pedido após recarregar | The order atual should be restored do localStorage. |
| 5      | Verify as informações do pedido  | Todas as informações do pedido (ID, itens, total, etc.) devem estar corretas. |

#### **Expected Results**

- The order atual é salvo no localStorage.
- The order é restaurado correctly após recarregar a página.
- Todas as informações do pedido são preservadas.

#### **Acceptance Criteria**

- localStorage é atualizado immediately após criar o pedido.
- A restauração ocorre automaticamente ao carregar a página.
- The order pode ser acessado nas páginas de pagamento e confirmação.

---

## Test Cases - Error Handling

### **CT039 - Handle Error When Creating an Order Without Connection**

#### **Objective**

Validate that o sistema trata adequadamente erros de conexão ao tentar criar um pedido quando não há conexão com o Supabase.

#### **Preconditions**

- The cart must conter pelo menos um produto.
- A conexão com o Supabase deve estar indisponível (simular desconexão).

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Disconnect the internet or disable Supabase | A conexão com o banco de dados deve estar indisponível. |
| 2      | Acessar a página /cart             | The page do carrinho should be displayed. |
| 3      | Click no botão "Complete Order" | O drawer deve ser aberto. |
| 4      | Enter um nome válido             | O nome deve ser inserido. |
| 5      | Click no botão "Complete"        | The system should tentar criar o pedido. |
| 6      | Verify o tratamento de erro    | Uma mensagem de erro should be displayed ao usuário. |
| 7      | Verify que o carrinho foi mantido | The items do carrinho devem permanecer intactos. |
| 8      | Verify que o drawer permanece aberto | O drawer should remain aberto para nova tentativa. |

#### **Expected Results**

- The system detecta o erro de conexão.
- Uma mensagem de erro apropriada é exibida ao usuário.
- The cart é preservado.
- O usuário pode tentar novamente após restaurar a conexão.

#### **Acceptance Criteria**

- O erro é tratado sem quebrar a aplicação.
- The message de erro é clara e informativa.
- O estado do sistema é preservado.

---

### **CT040 - Handle Error When Updating the Payment Method**

#### **Objective**

Validate that o sistema trata adequadamente erros ao tentar atualizar o método de pagamento quando não há conexão com o Supabase.

#### **Preconditions**

- Deve existir um pedido criado.
- The user must estar na página /payment.
- A conexão com o Supabase deve estar indisponível (simular desconexão).

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Disconnect the internet or disable Supabase | A conexão com o banco de dados deve estar indisponível. |
| 2      | Acessar a página /payment          | The page de pagamento should be displayed. |
| 3      | Click em um método de pagamento   | The system should tentar atualizar o método de pagamento. |
| 4      | Verify o tratamento de erro    | O erro deve ser tratado e registrado no console. |
| 5      | Verify que o usuário permanece na página | The user must permanecer na página de pagamento. |

#### **Expected Results**

- O erro é detectado e tratado.
- O erro é registrado no console para debug.
- O usuário permanece na página de pagamento.
- O usuário pode tentar novamente após restaurar a conexão.

#### **Acceptance Criteria**

- O erro não quebra a aplicação.
- O erro é registrado para análise.
- A experiência do usuário não é comprometida gravemente.

---

### **CT041 - Handle Product Image Loading Error**

#### **Objective**

Validate that quando uma imagem de produto não pode ser carregada, o sistema exibe uma imagem placeholder ou trata o erro adequadamente.

#### **Preconditions**

- The system must be accessible.
- Uma imagem de produto deve estar indisponível ou com URL inválida.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar a página /menu             | The menu page should load. |
| 2      | Verify o carregamento de imagens | As imagens dos produtos devem ser carregadas. |
| 3      | Simular erro em uma imagem (URL inválida) | Uma imagem deve falhar ao carregar. |
| 4      | Verify o tratamento de erro    | The system should exibir uma imagem placeholder ou tratar o erro sem quebrar a página. |
| 5      | Verify que a página continua funcional | The page should continuar funcionando normalmente. |

#### **Expected Results**

- O erro de carregamento de imagem é tratado.
- Uma imagem placeholder é exibida ou o erro é tratado silenciosamente.
- A funcionalidade da página não é comprometida.

#### **Acceptance Criteria**

- Não há erros visíveis na interface.
- The page continua funcional.
- O usuário pode interagir com os produtos normalmente.

---

### **CT042 - Access a Nonexistent Route (404)**

#### **Objective**

Validate that ao acessar uma rota que não existe, o sistema exibe uma página 404 apropriada.

#### **Preconditions**

- The system must be accessible.

#### **Steps**

| **Id** | **Action**                          | **Expected Result**                            |
|--------|------------------------------------|---------------------------------------------------|
| 1      | Acessar uma rota inexistente (ex: /rota-inexistente) | The system should detectar que a rota não existe. |
| 2      | Verify a página 404             | The page NotFound should be displayed. |
| 3      | Verify a mensagem               | Uma mensagem apropriada should be displayed. |
| 4      | Verify a navegação              | Deve haver uma opção para voltar ou navegar para a página inicial. |

#### **Expected Results**

- The page 404 é exibida correctly.
- The message é clara e informativa.
- O usuário pode navegar para outras páginas.

#### **Acceptance Criteria**

- Não há erros no console.
- The page 404 está bem formatada.
- A navegação funciona correctly.

---

## Test Case Summary

**Total Test Cases:** 42

### Distribution by Category:

- **Navigation and Home Page:** 3 test cases
- **Menu and Products:** 5 test cases
- **Product Details:** 6 test cases
- **Shopping Cart:** 7 test cases
- **Order Completion:** 3 test cases
- **Payment:** 6 test cases
- **Payment Confirmation:** 5 test cases
- **Data Persistence:** 3 test cases
- **Error Handling:** 4 test cases

---

## Final Notes

This test case document covers the main functional flows of the McBugs system. The test cases were created following the traditional format and focus on:

- **Positive flows (happy paths):** Validation of the system's ideal usage scenarios.
- **Negative flows:** Validation of error handling and input validations.
- **Data persistence:** Validation of local storage and state restoration.
- **Navigation:** Validation of navigation flows between system pages.

**Note:** This document does not cover performance testing, test automation, or advanced integration testing, as specified in the instructions.

---

**Document created by:** Senior Quality Analyst  
**Date:** 2025-01-27  
**System Version:** 1.0
