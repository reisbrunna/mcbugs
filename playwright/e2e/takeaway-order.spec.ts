import { fetchOrder } from '../fixtures/orders';
import { test, expect } from '../fixtures/pages.fixture';
import { readCartItems, readCurrentOrder, readOrderType } from '../fixtures/storage';
import {
  categories,
  copy,
  drinksCategory,
  drinksMenu,
  friesCategory,
  friesMenu,
  paymentMethods,
  products,
  routes,
  takeawayCustomer,
  takeawayOrder,
} from '../fixtures/test-data';

test.describe('CT002 - Complete Journey: "Takeaway" Order', () => {
  test('should complete a takeaway order paid with credit card', async ({
    home,
    menu,
    product,
    cart,
    payment,
    confirmation,
    db,
  }) => {
    await test.step('Open the home page', async () => {
      await home.goto();
      await expect(home.heading).toBeVisible();
      await expect(home.dineIn).toBeVisible();
      await expect(home.takeaway).toBeVisible();
      expect(await readOrderType(home.page)).toBeNull();
      expect(await readCurrentOrder(home.page)).toBeNull();
    });

    await test.step('Choose takeaway', async () => {
      await home.chooseTakeaway();
      await expect(menu.page).toHaveURL(routes.menu);
      await expect.poll(() => readOrderType(menu.page)).toBe(takeawayOrder.type);
    });

    await test.step('Review menu categories and products', async () => {
      for (const category of categories) {
        await expect(menu.category(category)).toBeVisible();
      }
      await expect(menu.productCard(products.bigMock.name)).toBeVisible();
    });

    await test.step('Show only fries', async () => {
      await menu.selectCategory(friesCategory);
      for (const name of friesMenu) {
        await expect(menu.productCard(name)).toBeVisible();
      }
      await expect(menu.productCard(products.bigMock.name)).toHaveCount(0);
    });

    await test.step('Open Batatas Full Stack', async () => {
      await menu.openProduct(products.batatasFullStack.name);
      await expect(product.page).toHaveURL(routes.product(products.batatasFullStack.id));
    });

    await test.step('Review Batatas Full Stack details', async () => {
      await expect(product.image(products.batatasFullStack.name)).toBeVisible();
      await expect(product.title(products.batatasFullStack.name)).toBeVisible();
      await expect(product.price(products.batatasFullStack.unitPrice)).toBeVisible();
      await expect(product.about).toBeVisible();
      await expect(product.description(products.batatasFullStack.descriptionExcerpt)).toBeVisible();
      await expect(product.ingredientsHeading).toBeVisible();
      await expect(product.ingredients).toHaveCount(products.batatasFullStack.ingredientCount);
    });

    await test.step('Keep the quantity at 1', async () => {
      await expect(product.quantity).toHaveText(String(products.batatasFullStack.quantity));
      await expect(product.addButton(products.batatasFullStack.unitPrice)).toBeVisible();
    });

    await test.step('Add Batatas Full Stack to the cart', async () => {
      await product.addToCart(products.batatasFullStack.lineTotal);
      await expect(menu.page).toHaveURL(routes.menu);
      await expect.poll(() => readCartItems(menu.page)).toEqual([
        { id: products.batatasFullStack.id, quantity: products.batatasFullStack.quantity },
      ]);
      await expect(menu.total(products.batatasFullStack.lineTotal)).toBeVisible();
      await expect(menu.itemCount(takeawayOrder.itemCountAfterFries)).toBeVisible();
    });

    await test.step('Show only drinks', async () => {
      await menu.selectCategory(drinksCategory);
      for (const name of drinksMenu) {
        await expect(menu.productCard(name)).toBeVisible();
      }
      await expect(menu.productCard(products.batatasFullStack.name)).toHaveCount(0);
    });

    await test.step('Open Fanta Warning', async () => {
      await menu.openProduct(products.fantaWarning.name);
      await expect(product.page).toHaveURL(routes.product(products.fantaWarning.id));
      await expect(product.title(products.fantaWarning.name)).toBeVisible();
    });

    await test.step('Increase the quantity to 3', async () => {
      await product.increaseQuantity(products.fantaWarning.quantity - 1);
      await expect(product.quantity).toHaveText(String(products.fantaWarning.quantity));
      await expect(product.addButton(products.fantaWarning.lineTotal)).toBeVisible();
    });

    await test.step('Add Fanta Warning to the cart', async () => {
      await product.addToCart(products.fantaWarning.lineTotal);
      await expect(menu.page).toHaveURL(routes.menu);
      await expect.poll(() => readCartItems(menu.page)).toEqual([
        { id: products.batatasFullStack.id, quantity: products.batatasFullStack.quantity },
        { id: products.fantaWarning.id, quantity: products.fantaWarning.quantity },
      ]);
    });

    await test.step('Review the cart bar', async () => {
      await expect(menu.cartTotalLabel).toBeVisible();
      await expect(menu.total(takeawayOrder.cartBarTotal)).toBeVisible();
      await expect(menu.itemCount(takeawayOrder.cartBarItemCount)).toBeVisible();
    });

    await test.step('Open the cart', async () => {
      await menu.openCart();
      await expect(cart.page).toHaveURL(routes.cart);
      await expect(cart.heading).toBeVisible();
    });

    await test.step('Review cart items', async () => {
      await expect(cart.itemHeading(products.batatasFullStack.name)).toBeVisible();
      await expect(cart.itemQuantity(products.batatasFullStack.name)).toHaveText(
        String(products.batatasFullStack.quantity),
      );
      await expect(cart.lineTotal(products.batatasFullStack.name, products.batatasFullStack.lineTotal)).toBeVisible();
      await expect(cart.itemHeading(products.fantaWarning.name)).toBeVisible();
      await expect(cart.itemQuantity(products.fantaWarning.name)).toHaveText(String(products.fantaWarning.quantity));
      await expect(cart.lineTotal(products.fantaWarning.name, products.fantaWarning.lineTotal)).toBeVisible();
    });

    await test.step('Increase Batatas Full Stack in the cart', async () => {
      await cart.increaseItemQuantity(products.batatasFullStack.name);
      await expect(cart.itemQuantity(products.batatasFullStack.name)).toHaveText(
        String(products.batatasFullStack.updatedQuantity),
      );
      await expect(
        cart.lineTotal(products.batatasFullStack.name, products.batatasFullStack.updatedLineTotal),
      ).toBeVisible();
      await expect.poll(() => readCartItems(cart.page)).toEqual([
        { id: products.batatasFullStack.id, quantity: products.batatasFullStack.updatedQuantity },
        { id: products.fantaWarning.id, quantity: products.fantaWarning.quantity },
      ]);
    });

    await test.step('Review the order total', async () => {
      await expect(cart.orderTotalLabel).toBeVisible();
      await expect(cart.orderTotal(takeawayOrder.totalLabel)).toBeVisible();
    });

    await test.step('Open checkout and enter the customer name', async () => {
      await cart.startCheckout();
      await expect(cart.drawerTitle).toBeVisible();
      await cart.enterCustomerName(takeawayCustomer.name);
      await expect(cart.customerName).toHaveValue(takeawayCustomer.name);
    });

    await test.step('Submit the order', async () => {
      await cart.confirmOrder();
      await expect(cart.sendingToKitchen).toBeVisible();
    });

    await test.step('Land on payment with an empty cart', async () => {
      await expect(payment.page).toHaveURL(routes.payment);
      await expect.poll(() => readCartItems(payment.page)).toEqual([]);
    });

    const orderId = await test.step('Review the payment page', async () => {
      await expect(payment.orderNumber).toBeVisible();
      await expect(payment.total(takeawayOrder.totalLabel)).toBeVisible();
      await expect(payment.heading).toBeVisible();
      await expect(payment.method(paymentMethods.pix.label)).toBeVisible();
      await expect(payment.method(paymentMethods.debit.label)).toBeVisible();
      await expect(payment.method(paymentMethods.credit.label)).toBeVisible();
      return payment.readOrderId();
    });

    await test.step('Pay with credit card', async () => {
      await payment.payWith(paymentMethods.credit.label);
      await expect(confirmation.page).toHaveURL(routes.paymentConfirm(takeawayOrder.paymentMethod));
    });

    await test.step('Review the credit card confirmation', async () => {
      await expect(confirmation.orderNumber(orderId)).toBeVisible();
      await expect(confirmation.total(takeawayOrder.totalLabel)).toBeVisible();
      await expect(confirmation.counterPayment).toBeVisible();
      await expect(confirmation.instructions(takeawayOrder.instructions)).toBeVisible();
      await expect(confirmation.orderDetails).toBeVisible();
      await expect(confirmation.customer(takeawayCustomer.name)).toBeVisible();
      await expect(confirmation.orderType(takeawayOrder.typeLabel)).toBeVisible();
      await expect(confirmation.paymentMethodLabel).toBeVisible();
      await expect(confirmation.createdAt).toBeVisible();
      await expect(confirmation.lineItem(products.batatasFullStack.updatedLineLabel)).toBeVisible();
      await expect(confirmation.lineItem(products.fantaWarning.lineLabel)).toBeVisible();
      await expect(confirmation.waitMessage(copy.waitMessage)).toHaveCount(0);
    });

    await test.step('Confirm the order was persisted', async () => {
      await expect
        .poll(async () => (await fetchOrder(db, orderId)).payment_method)
        .toBe(takeawayOrder.paymentMethod);
      const persisted = await fetchOrder(db, orderId);
      expect(persisted).toMatchObject({
        customer_name: takeawayCustomer.name,
        order_type: takeawayOrder.type,
        payment_method: takeawayOrder.paymentMethod,
        status: takeawayOrder.status,
        total: takeawayOrder.total,
      });
      expect(persisted.items).toEqual([
        {
          name: products.batatasFullStack.name,
          price: products.batatasFullStack.price,
          quantity: products.batatasFullStack.updatedQuantity,
          productId: products.batatasFullStack.id,
        },
        {
          name: products.fantaWarning.name,
          price: products.fantaWarning.price,
          quantity: products.fantaWarning.quantity,
          productId: products.fantaWarning.id,
        },
      ]);
    });

    await test.step('Start a new order', async () => {
      await confirmation.startNewOrder();
      await expect(home.page).toHaveURL(routes.home);
      await expect(home.takeaway).toBeVisible();
      await expect.poll(() => readCurrentOrder(home.page)).toBeNull();
      await expect.poll(() => readOrderType(home.page)).toBeNull();
      await expect.poll(() => readCartItems(home.page)).toEqual([]);
    });
  });
});
