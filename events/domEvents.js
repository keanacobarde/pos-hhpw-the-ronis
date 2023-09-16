import addOrderForm from '../components/forms/addOrderForm';
/* eslint-disable no-alert */
import { getOrders, deleteOrders } from '../api/ordersData';
import { showOrders } from '../pages/orders';
import { getItems } from '../api/itemsData';
import addItemsToOrder from '../components/forms/addItems';
import { createOrderItem, updateOrderItems } from '../api/orderItems';
import orderDetails from '../pages/showItems';
import { getOrderDetails } from '../api/mergedData';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('home-view-orders-btn')) {
      getOrders(user).then((array) => showOrders(array));
    }

    if (e.target.id.includes('order-delete')) {
      if (window.confirm('Do you want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteOrders(firebaseKey).then(() => {
          getOrders(user).then((array) => showOrders(array));
        });
      }
    }

    if (e.target.id.includes('home-create-orders-btn')) {
      addOrderForm();
    }
    if (e.target.id.includes('add-item-btn')) {
      const [, orderId] = e.target.id.split('--');
      getItems().then((array) => {
        addItemsToOrder(array, orderId);
      });
    }

    if (e.target.id.includes('order-details')) {
      const [, firebaseKey] = e.target.id.split('--');
      getOrderDetails(firebaseKey).then((details) => {
        orderDetails(details);
      });
    }
    if (e.target.id.includes('add-item-order-btn')) {
      const [, itemId, orderId] = e.target.id.split('--');

      const payload = {
        orderId,
        itemId,
        uid: user.uid
      };

      createOrderItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateOrderItems(patchPayload).then(() => {
          getOrderDetails(orderId).then((res) => orderDetails(res));
        });
        // getOrderItems(orderId).then((array) => {
        // console.warn(array);
        // orderDetails(array);
      });
    }
  });
};

export default domEvents;
