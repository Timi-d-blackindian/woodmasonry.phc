let menu = document.querySelector("#menu");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

//OPEN AND CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

//START WHEN THE DOCUMENT IS READY
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

//========== START ===============
function start() {
  addEvents();
}

// ========== UPDATE & RERENDER ========
function update() {
  addEvents();
  updateTotal();
}

// =========== ADD EVENTS ================
function addEvents() {
  // REMOVE ITEMS FROM CART
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // CHANGE ITEM QUANTITY
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // ADD ITEMS TO CART
  let addToCart_btns = document.querySelectorAll(".add-to-cart");
  addToCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // BUY NOW BUTTON
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyNow);
}

// ========= HANDLE EVENTS FUNCTIONS =========
let itemsAdded = [];
function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;

  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // HANDLE EXISTING CART ITEM
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("item already added to cart!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // ADD PRODUCT TO CART
  let cartBoxElement = cartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // this keeps the value as an integer

  update();
}

function handle_buyNow() {
  if (itemsAdded.lenght <= 0) {
    alert("Noting To Purchase! \nPlease add an item to the cart first.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your Order Has Been Placed Succesfully");
  itemsAdded = [];

  update();
}

// ====== UPDATE AND RERENDER FUNCTION =====
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("N", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // maintain two decimal numbers
  total = total.toFixed(3);
  // alternative way can be
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "N" + total;
}

// ========== HTML COMPONENTS ==============
function cartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
          <img src=${imgSrc} alt="" class="cart-img">
          <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
          </div>

          <!--- Remove Content --->
          <i class="fa-solid fa-trash cart-remove"></i>
    </div>`;
}
