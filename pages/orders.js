import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyOrders = () => {
  const domString = '<h1>No Orders Found</h1>';
  renderToDOM('#orders', domString);
};

const showOrders = (array) => {
  clearDom();
  if (array.length < 1) {
    emptyOrders();
  } else {
    let domString = '';
    array.forEach((item) => {
      domString += `
        <div class="orderCard card">
          <div class="card-body" style="height: 280px; width: 200px;">
            <h5 class="card-title">${item.name}</h5>
              <p class="card-text bold">${item.status ? 'open' : 'closed'}</p>
              <p class="card-text bold">${item.phone}</p>
              <p class="card-text bold">${item.email}</p>
              <p class="card-text bold">${item.orderType}</p>
              <a href="#" id='order-details' class="card-link">Details</a>
              <a href="#" id='order-edit' class="card-link">Edit</a>
              <a href="#" id='order-delete' class="card-link">Delete</a>
          </div>
        </div>
        `;
    });
    renderToDOM('#orders', domString);
  }
};

export { showOrders, emptyOrders };
