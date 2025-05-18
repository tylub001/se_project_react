const baseUrl = 'http://localhost:3001';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`)
    .then(data => {
      return data.map(item => ({
        ...item,
        imageUrl: item.imageUrl,
      }));
    });
}


function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
     body: JSON.stringify({ name, imageUrl, weather }),
  }).then((item) => {
    return item;
  });
}

function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  });
}

export { getItems, addItem, deleteItem, checkResponse };


