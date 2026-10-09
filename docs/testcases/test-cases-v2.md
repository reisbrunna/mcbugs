# Journey Test Case Document - McBugs System

**System:** McBugs - Self-Service Kiosk  
**Creation Date:** 2025-01-27  
**Version:** 1.0

---

## Test Cases - Complete Journeys

### **CT001 - Complete Journey: "Dine In" Order**

#### **Objective**

Validate the complete flow of a "Dine In" order, from the initial order type selection to the final payment confirmation, ensuring that all steps work correctly in sequence.

#### **Preconditions**

- The McBugs system must be online and accessible.
- The system must be connected to Supabase.
- The browser must be properly configured.
- The internet connection must be active.
- The localStorage must be cleared, with no data from previous orders.

#### **Steps**

| **Id** | **Action** | **Expected Result** |
|--------|------------|---------------------|
| 1 | Access the system root URL (`/`) | The home page should load correctly with the "Dine In" and "Takeaway" options. |
| 2 | Click the "Dine In" button | The `dine-in` order type should be set and saved in localStorage. The user should be redirected to `/menu`. |
| 3 | Verify the menu page | The menu page should display the categories (Burgers, Fries, Drinks, Desserts) and the available products. |
| 4 | Click a product (e.g., Big Mock) | The user should be redirected to the product details page (`/product/big-mock`). |
| 5 | Verify the product details | The page should display the product image, name, price, description, and ingredients. |
| 6 | Increase the quantity to 2 | The quantity should be updated to 2, and the total price should be recalculated. |
| 7 | Click the "I Want • [price]" button | The product should be added to the cart with quantity 2. The user should be redirected to `/menu`. |
| 8 | Verify the cart bar | The bottom bar should display the order total and the number of items. |
| 9 | Click another product (e.g., Coca-Crash) | The user should be redirected to the product details page. |
| 10 | Click the "I Want • [price]" button | The product should be added to the cart. The user should be redirected to `/menu`. |
| 11 | Click the "View Order" button on the cart bar | The user should be redirected to `/cart`. |
| 12 | Verify the items in the cart | All added products should be listed with the correct quantities and prices. |
| 13 | Verify the order total | The total should be calculated correctly as the sum of all items. |
| 14 | Click the "Complete Order" button | A drawer should open requesting the customer's name. |
| 15 | Enter the name "João Silva" | The name should be entered in the field. |
| 16 | Click the "Complete" button | The system should create the order in the database with status `pending` and type `dine-in`. A "sending to the kitchen...." message should be displayed. |
| 17 | Verify the redirect | The user should be redirected to `/payment`. The cart should be empty. |
| 18 | Verify the payment page | The order information (order number and total) should be displayed. The three payment options (PIX, Debit Card, Credit Card) should be available. |
| 19 | Click the "PIX" option | The payment method should be updated to `pix` in the database. The user should be redirected to `/payment/pix/confirm`. |
| 20 | Verify the confirmation page | The page should display the order number, total, PIX payment method, payment instructions, order details (customer, `Dine In` type, payment method, date), item list, and a message instructing the customer to wait until their order number is called. |
| 21 | Verify the order in the database | The order should be stored with `customer_name="João Silva"`, `order_type="dine-in"`, `payment_method="pix"`, `status="pending"`, the correct total, and `items` in JSON format. |
| 22 | Click the "Start New Order" button | The system state should be cleared (cart and current order). The user should be redirected to the home page (`/`). |

#### **Expected Results**

- The entire flow is completed without errors.
- The `dine-in` order type is maintained throughout the entire journey.
- All products are added to the cart correctly.
- The order is created in the database with all the correct information.
- The payment method is updated correctly.
- The confirmation page displays all the correct information, including the specific message for `dine-in` orders.
- The system state is cleared correctly after completing the journey.

#### **Acceptance Criteria**

- The order is created in the database with status `pending` and type `dine-in`.
- All order data is saved correctly (items, total, order type, customer name, and payment method).
- The cart is cleared after the order is created.
- The confirmation page displays the specific message for `dine-in` orders instructing the customer to wait until their order number is called.
- The complete flow is executed without interruptions or errors.
- The localStorage is updated correctly at each step.

---

### **CT002 - Complete Journey: "Takeaway" Order**

#### **Objective**

Validate the complete flow of a "Takeaway" order, from the initial order type selection to the final payment confirmation, ensuring that all steps work correctly in sequence.

#### **Preconditions**

- The McBugs system must be online and accessible.
- The system must be connected to Supabase.
- The browser must be properly configured.
- The internet connection must be active.
- The localStorage must be cleared, with no data from previous orders.

#### **Steps**

| **Id** | **Action** | **Expected Result** |
|--------|------------|---------------------|
| 1 | Access the system root URL (`/`) | The home page should load correctly with the "Dine In" and "Takeaway" options. |
| 2 | Click the "Takeaway" button | The `takeaway` order type should be set and saved in localStorage. The user should be redirected to `/menu`. |
| 3 | Verify the menu page | The menu page should display the categories (Burgers, Fries, Drinks, Desserts) and the available products. |
| 4 | Click the "Fries" tab | Only products from the "Fries" category should be displayed. |
| 5 | Click a fries product (e.g., Batatas Full Stack) | The user should be redirected to the product details page. |
| 6 | Verify the product details | The page should display the product image, name, price, description, and ingredients. |
| 7 | Keep the quantity at 1 | The quantity should remain 1. |
| 8 | Click the "I Want • [price]" button | The product should be added to the cart. The user should be redirected to `/menu`. |
| 9 | Click the "Drinks" tab | Only products from the "Drinks" category should be displayed. |
| 10 | Click a drink product (e.g., Fanta Warning) | The user should be redirected to the product details page. |
| 11 | Increase the quantity to 3 | The quantity should be updated to 3, and the total price should be recalculated. |
| 12 | Click the "I Want • [price]" button | The product should be added to the cart with quantity 3. The user should be redirected to `/menu`. |
| 13 | Verify the cart bar | The bottom bar should display the order total and the number of items (4 items in total). |
| 14 | Click the "View Order" button on the cart bar | The user should be redirected to `/cart`. |
| 15 | Verify the items in the cart | All added products should be listed with the correct quantities and prices. |
| 16 | Increase the quantity of an item in the cart | The quantity should be incremented, and the subtotal and total should be updated. |
| 17 | Verify the order total | The total should be calculated correctly as the sum of all items. |
| 18 | Click the "Complete Order" button | A drawer should open requesting the customer's name. |
| 19 | Enter the name "Maria Santos" | The name should be entered in the field. |
| 20 | Click the "Complete" button | The system should create the order in the database with status `pending` and type `takeaway`. A "sending to the kitchen...." message should be displayed. |
| 21 | Verify the redirect | The user should be redirected to `/payment`. The cart should be empty. |
| 22 | Verify the payment page | The order information (order number and total) should be displayed. The three payment options (PIX, Debit Card, Credit Card) should be available. |
| 23 | Click the "Credit Card" option | The payment method should be updated to `credit` in the database. The user should be redirected to `/payment/credit/confirm`. |
| 24 | Verify the confirmation page | The page should display the order number, total, Credit Card payment method, payment instructions, order details (customer, `Takeaway` type, payment method, date), and the item list. |
| 25 | Verify that there is no waiting message | No message instructing the customer to wait until their order number is called should be displayed because the order type is `takeaway`. |
| 26 | Verify the order in the database | The order should be stored with `customer_name="Maria Santos"`, `order_type="takeaway"`, `payment_method="credit"`, `status="pending"`, the correct total, and `items` in JSON format. |
| 27 | Click the "Start New Order" button | The system state should be cleared (cart and current order). The user should be redirected to the home page (`/`). |

#### **Expected Results**

- The entire flow is completed without errors.
- The `takeaway` order type is maintained throughout the entire journey.
- All products are added to the cart correctly.
- Navigation between categories works correctly.
- Item quantities can be adjusted in the cart.
- The order is created in the database with all the correct information.
- The payment method is updated correctly.
- The confirmation page displays all the correct information without a message instructing the customer to wait until their order number is called.
- The system state is cleared correctly after completing the journey.

#### **Acceptance Criteria**

- The order is created in the database with status `pending` and type `takeaway`.
- All order data is saved correctly (items, total, order type, customer name, and payment method).
- The cart is cleared after the order is created.
- The confirmation page does not display a message instructing the customer to wait until their order number is called, unlike the `dine-in` flow.
- The complete flow is executed without interruptions or errors.
- The localStorage is updated correctly at each step.
- Navigation between categories and quantity adjustments in the cart work correctly.

---

## Journey Test Case Summary

**Total Journey Test Cases:** 2

### Distribution

- **"Dine In" Journey:** 1 test case
- **"Takeaway" Journey:** 1 test case

---

## Final Notes

This document contains the complete journey test cases for the McBugs system, covering the two main order flows:

- **"Dine In" flow (`dine-in`):** Validates the entire process from selecting the order type through final confirmation, including the specific message instructing the customer to wait until their order number is called.

- **"Takeaway" flow (`takeaway`):** Validates the entire process from selecting the order type through final confirmation, including navigation between categories and quantity adjustments in the cart.

The test cases were created following the traditional test case format and focus on validating the system's complete functional flows (happy paths), ensuring that all steps work correctly in sequence.

**Note:** This document does not cover performance testing, test automation, or advanced integration testing, as specified in the instructions.

---

**Document created by:** Senior Quality Analyst  
**Date:** 2025-01-27  
**System Version:** 1.0