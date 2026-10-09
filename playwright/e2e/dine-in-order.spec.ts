import { fetchOrder } from '../fixtures/orders';
import { test, expect } from '../fixtures/pages.fixture';
import { readCartItems, readCurrentOrder, readOrderType } from '../fixtures/storage';
import {
  categories,
  copy,
  customer,
  dineInOrder,
  drinksCategory,
  paymentMethods,
  products,
  routes,
} from '../fixtures/test-data';

test.describe('CT001 - Complete Journey: "Dine In" Order', () => {
  test('should complete a dine-in order paid with PIX', async ({
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

    await test.step('Choose dine in', async () => {
      await home.chooseDineIn();
      await expect(menu.page).toHaveURL(routes.menu);
      await expect.poll(() => readOrderType(menu.page)).toBe(dineInOrder.type);
    });

    await test.step('Review menu categories and products', async () => {
      for (const category of categories) {
        await expect(menu.category(category)).toBeVisible();
      }
      await expect(menu.productCard(products.bigMock.name)).toBeVisible();
    });

    await test.step('Open Big Mock', async () => {
      await menu.openProduct(products.bigMock.name);
      await expect(product.page).toHaveURL(routes.product(products.bigMock.id));
    });

    await test.step('Review Big Mock details', async () => {
      await expect(product.image(products.bigMock.name)).toBeVisible();
      await expect(product.title(products.bigMock.name)).toBeVisible();
      await expect(product.price(products.bigMock.unitPrice)).toBeVisible();
      await expect(product.about).toBeVisible();
      await expect(product.description(products.bigMock.descriptionExcerpt)).toBeVisible();
      await expect(product.ingredientsHeading).toBeVisible();
      await expect(product.ingredients).toHaveCount(products.bigMock.ingredientCount);
    });

    await test.step('Increase the quantity to 2', async () => {
      await product.increaseQuantity(1);
      await expect(product.quantity).toHaveText(String(products.bigMock.quantity));
      await expect(product.addButton(products.bigMock.lineTotal)).toBeVisible();
    });

    await test.step('Add Big Mock to the cart', async () => {
      await product.addToCart(products.bigMock.lineTotal);
      await expect(menu.page).toHaveURL(routes.menu);
      await expect.poll(() => readCartItems(menu.page)).toEqual([
        { id: products.bigMock.id, quantity: products.bigMock.quantity },
      ]);
    });

    await test.step('Review the cart bar', async () => {
      await expect(menu.cartTotalLabel).toBeVisible();
      await expect(menu.total(products.bigMock.lineTotal)).toBeVisible();
      await expect(menu.itemCount(dineInOrder.itemCountAfterBurger)).toBeVisible();
    });

    await test.step('Open Coca-Crash from Drinks', async () => {
      await menu.selectCategory(drinksCategory);
      await expect(menu.productCard(products.cocaCrash.name)).toBeVisible();
      await menu.openProduct(products.cocaCrash.name);
      await expect(product.page).toHaveURL(routes.product(products.cocaCrash.id));
      await expect(product.title(products.cocaCrash.name)).toBeVisible();
    });

    await test.step('Add Coca-Crash to the cart', async () => {
      await product.addToCart(products.cocaCrash.unitPrice);
      await expect(menu.page).toHaveURL(routes.menu);
      await expect.poll(() => readCartItems(menu.page)).toEqual([
        { id: products.bigMock.id, quantity: products.bigMock.quantity },
        { id: products.cocaCrash.id, quantity: products.cocaCrash.quantity },
      ]);
      await expect(menu.total(dineInOrder.totalLabel)).toBeVisible();
      await expect(menu.itemCount(dineInOrder.itemCountAfterDrink)).toBeVisible();
    });

    await test.step('Open the cart', async () => {
      await menu.openCart();
      await expect(cart.page).toHaveURL(routes.cart);
      await expect(cart.heading).toBeVisible();
    });

    await test.step('Review cart items and total', async () => {
      await expect(cart.itemHeading(products.bigMock.name)).toBeVisible();
      await expect(cart.lineTotal(products.bigMock.name, products.bigMock.lineTotal)).toBeVisible();
      await expect(cart.itemHeading(products.cocaCrash.name)).toBeVisible();
      await expect(cart.lineTotal(products.cocaCrash.name, products.cocaCrash.lineTotal)).toBeVisible();
      await expect(cart.orderTotalLabel).toBeVisible();
      await expect(cart.orderTotal(dineInOrder.totalLabel)).toBeVisible();
    });

    await test.step('Open checkout and enter the customer name', async () => {
      await cart.startCheckout();
      await expect(cart.drawerTitle).toBeVisible();
      await cart.enterCustomerName(customer.name);
      await expect(cart.customerName).toHaveValue(customer.name);
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
      await expect(payment.total(dineInOrder.totalLabel)).toBeVisible();
      await expect(payment.heading).toBeVisible();
      await expect(payment.method(paymentMethods.pix.label)).toBeVisible();
      await expect(payment.method(paymentMethods.debit.label)).toBeVisible();
      await expect(payment.method(paymentMethods.credit.label)).toBeVisible();
      return payment.readOrderId();
    });

    await test.step('Pay with PIX', async () => {
      await payment.payWith(paymentMethods.pix.label);
      await expect(confirmation.page).toHaveURL(routes.paymentConfirm(dineInOrder.paymentMethod));
    });

    await test.step('Review the PIX confirmation', async () => {
      await expect(confirmation.orderNumber(orderId)).toBeVisible();
      await expect(confirmation.total(dineInOrder.totalLabel)).toBeVisible();
      await expect(confirmation.counterPayment).toBeVisible();
      await expect(confirmation.instructions(dineInOrder.instructions)).toBeVisible();
      await expect(confirmation.orderDetails).toBeVisible();
      await expect(confirmation.customer(customer.name)).toBeVisible();
      await expect(confirmation.orderType(dineInOrder.typeLabel)).toBeVisible();
      await expect(confirmation.paymentMethodLabel).toBeVisible();
      await expect(confirmation.createdAt).toBeVisible();
      await expect(confirmation.lineItem(products.bigMock.lineLabel)).toBeVisible();
      await expect(confirmation.lineItem(products.cocaCrash.lineLabel)).toBeVisible();
      await expect(confirmation.waitMessage(copy.waitMessage)).toBeVisible();
    });

    await test.step('Confirm the order was persisted', async () => {
      await expect.poll(async () => (await fetchOrder(db, orderId)).payment_method).toBe(dineInOrder.paymentMethod);
      const persisted = await fetchOrder(db, orderId);
      expect(persisted).toMatchObject({
        customer_name: customer.name,
        order_type: dineInOrder.type,
        payment_method: dineInOrder.paymentMethod,
        status: dineInOrder.status,
        total: dineInOrder.total,
      });
      expect(persisted.items).toEqual([
        {
          name: products.bigMock.name,
          price: products.bigMock.price,
          quantity: products.bigMock.quantity,
          productId: products.bigMock.id,
        },
        {
          name: products.cocaCrash.name,
          price: products.cocaCrash.price,
          quantity: products.cocaCrash.quantity,
          productId: products.cocaCrash.id,
        },
      ]);
    });

    await test.step('Start a new order', async () => {
      await confirmation.startNewOrder();
      await expect(home.page).toHaveURL(routes.home);
      await expect(home.dineIn).toBeVisible();
      await expect.poll(() => readCurrentOrder(home.page)).toBeNull();
      await expect.poll(() => readOrderType(home.page)).toBeNull();
      await expect.poll(() => readCartItems(home.page)).toEqual([]);
    });
  });
});
