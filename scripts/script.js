const addButton = () => {
  document.getElementById("modal").classList.add("active");
};

const addOtherProduct = () => {
  document.getElementById("modal").classList.add("active");
  removeChild();
};

const removeChild = () => {
  const parent = document.querySelector(".feed");
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
};

const oneMoreProduct = () => {
  document.querySelector("#one-more-product").classList.add("active");
};

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? [];
const setLocalStorage = (key, item) =>
  localStorage.setItem(key, JSON.stringify(item));

const createProduct = (database) => {
  const dbProduct = getLocalStorage("database");
  setLocalStorage("database", [...dbProduct, database]);
};

const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
  document.getElementById("title").dataset.index = "new";
};

const saveProduct = () => {
  const database = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    urlimage: document.getElementById("urlimage").value,
    quantity: 1,
  };
  console.log(database);
  createProduct(database);
  updateProducts();
  closeModal();
};

const addProduct = (database, index) => {
  const newProduct = document.createElement("div");
  newProduct.classList.add("teste");
  newProduct.innerHTML = `
  <img src="${database.urlimage}" class="size" />
  <h3 id="title-${index}"class="title-product">${database.title}</h3>
  <p id="text-feed">R$ ${database.price}</p>
  <button id="add-cart-${index}" class="add-cart" onclick="saveCartAdd(${index})">Adicionar ao carrinho</button>
  `;
  document.querySelector(".feed").appendChild(newProduct);
  oneMoreProduct();
};
const updateProducts = () => {
  const dbPost = getLocalStorage("database");
  dbPost.forEach(addProduct);
};

// Cart Geral

const printCart = (database, index) => {
  const price = getLocalStorage("cartadd")[index].price * database.quantity;
  const post = document.getElementById("content-product");
  post.innerHTML += `
  <div id="item" class="item">
    <div id="image" class="image">
      <img src="${database.urlimage}">
      </div>
    <h3 class="title-product-cart">${database.title}</h3>
    <button id="add-product-button" onclick="handleQuantity('minus',${index})">
      <div id="button-more" class="button-less">
        <img src="../icons/ellipse-icon.png" class="ellipse-product"/>
        <img src="../icons/less-icon.png" class="less-icon"/>
        </div>
    </button>
    <h3 id="quantity-products" class="quantity-products">
    <div id="number-${index}" class="number">
      <span id="badge-${index}" class="badge" data-value="">${database.quantity}</span>
      </div>
    </h3>
    <button id="add-product-button" onclick="handleQuantity('plus',${index})">
      <div id="button-more" class="button-less">
        <img src="../icons/ellipse-icon.png" class="ellipse-product"/>
        <img src="../icons/more-icon.png" class="more-icon"/>
      </div>
    </button>
    
    
    <div id= "price${index}" class="price">
    R$ ${price}
    </div>
    <span id="delete" onclick= "deleteProduct(${index})">Deletar Produto</span>
    </div>
    `;
};

const openCartStorage = () => {
  const index = getLocalStorage("index");
  const database = getLocalStorage("cartadd")[index];
  printCart(database);
};

document.addEventListener("DOMContentLoaded", openCartStorage);

const setCartAdd = (database) => {
  const dataBaseProductAdd = getLocalStorage("cartadd");
  setLocalStorage("cartadd", [database, ...dataBaseProductAdd]);
  const url = "cart.html";
  window.open(url);
};

const updateCart = () => {
  const dbPost = getLocalStorage("cartadd");
  dbPost.forEach(printCart);
};
document.addEventListener("DOMContentLoaded", updateCart);

const saveCartAdd = (index) => {
  const database = getLocalStorage("database")[index];
  setCartAdd(database);
  openCartStorage(database);
  updateCart(database);
};

//pesquisar terceiro parametro em diante no map
// const handleQuantity = (operationType, index) => {
//   const products = getLocalStorage('cartadd')
//   const newProducts = products.map((product, i) => {
//     if (i == index) {
//       const quantity =
//         operationType === 'minus' ? product.quantity - 1 : product.quantity + 1
//       product.quantity = quantity
//       const price = product.price * quantity
//       const tprice = document.getElementById(`price${index}`)
//       tprice.innerText = `R$ ${price}`
//       const quantityRefresh = document.getElementById(`badge-${index}`)
//       quantityRefresh.innerText = quantity
//     }
//     return product
//   })
//   setLocalStorage('cartadd', newProducts)
// }

const handleQuantity = (operationType, index) => {
  const products = getLocalStorage("cartadd");
  const newProducts = products.map((product, i) => {
    if (i == index) {
      const quantity =
        operationType === "minus" ? product.quantity - 1 : product.quantity + 1;
      product.quantity = quantity;
      const price = product.price;
      const priceTotal = price * quantity;
      const priceRefresh = document.getElementById(`price${index}`);
      priceRefresh.innerText = `R$ ${priceTotal}`;
      // product.price = priceTotal
      const quantityRefresh = document.getElementById(`badge-${index}`);
      quantityRefresh.innerText = quantity;
    }
    return product;
  });
  setLocalStorage("cartadd", newProducts);
  calculateTotal();
};

// const deleteProduct = (index) => {
//   const dbProduct = getLocalStorage('cartadd')[index]
//   dbProduct.splice(index, 1)
//   setLocalStorage('cartadd', dbProduct)
//   return location.reload()
// }

function deleteProduct(index) {
  const upProducts = getLocalStorage("cartadd");
  upProducts.splice(index, 1);
  setLocalStorage("cartadd", upProducts);
  return location.reload();
}

const calculateTotal = () => {
  const products = getLocalStorage("cartadd");
  let totalQuantity = 0;
  let totalPrice = 0;
  products.forEach((data) => {
    totalQuantity += Number(data.quantity);
    totalPrice += Number(data.price) * Number(data.quantity);
  });

  document.getElementById(`results-final`).innerHTML = `
  <div id="priceinfo" class="priceinfo">
    <div id ="total-infos">
      <p id="subtotal-title"> SubTotal </p><br>
      <p id="total-quantity">${totalQuantity} itens</p>
      <p>
        <span id="total-price" class="total-price"> R$ ${totalPrice}</span>
      </p>
    </div>
  </div>`;
  return setLocalStorage("totalResults", [
    {
      totalQuantity,
      totalPrice,
    },
  ]);
};

document.addEventListener("DOMContentLoaded", calculateTotal);

document.getElementById("modalClose").addEventListener("click", closeModal);
