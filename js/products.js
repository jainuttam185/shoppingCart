const PRODUCT_URL = "./server/products/index.get.json";

localStorage.setItem("APIDATA", JSON.stringify([]));
let APIdataArr = JSON.parse(localStorage.getItem("APIDATA"));
let currentDataArr = [];

//update array
const getUpdatedList = async function () {
  let res = await fetch(PRODUCT_URL);
  let data = await res.json();
  APIdataArr = data;
  console.log(APIdataArr);
  updateCurrentData(APIdataArr, localStorage.getItem("SHOWCATEGORY"));
  updateDOM(currentDataArr);
  localStorage.setItem("APIDATA", JSON.stringify(APIdataArr));
};

//Accessing DOM Elements

const buttonDOM = document.querySelectorAll(".category-button");
//console.log(buttonDOM);
const mainContentDOM = document.querySelector(".product-container"); // main results div

//NodeList to Array
const arrayDOM = [...buttonDOM];
//console.log(arrayDOM);

// Toggle active class on buttons
const makeButtonActive = (buttonArr, buttonValue) => {
  buttonArr.map((button) => {
    button.value === buttonValue
      ? button.classList.add("active")
      : button.classList.remove("active");
  });
};

arrayDOM.map((button) => {
  button.addEventListener("click", function () {
    updateCurrentData(APIdataArr, button.value);
    updateDOM(currentDataArr);
    localStorage.setItem("SHOWCATEGORY", button.value);
    makeButtonActive(arrayDOM, localStorage.getItem("SHOWCATEGORY"));
  });
});

//Updating DOM on click
const updateCurrentData = (apiData, category) => {
  currentDataArr = [];
  apiData.filter((product) => {
    if (product.category === category) {
      currentDataArr.push(product);
    }
  });
};

function updateDOM(contentDataArr) {
  mainContentDOM.innerHTML = ``;
  contentDataArr.map(function (item) {
    let node = document.createElement("div");
    node.classList.add("product-card");

    node.innerHTML = `
        <div>
             <img src="${item.imageURL}" alt="${item.name}" />
             <div class="product-card-content">
             <h3 class="product-category">${item.name}</h3>
             <div class="product-name">Berry Blast</div>
             <p class="product-description">${item.description}</p>
         </div>
         <div class="product-card-footer">
             <div class="product-reviews-wrapper">
                 <div class="product-rating">
                     <span>$${item.price}</span>
                 </div>
                 <div class="product-review">Stock: ${item.stock}</div>
             </div>
             <div class="button-wrapper">
                 <button type="button" class="button" onclick="addToCart('${item.id}')">Add to cart</button>
             </div>
        </div>
    `;
    mainContentDOM.appendChild(node);
  });
}

//On page Load
const initialDOM = () => {
  getUpdatedList();
  updateCurrentData(APIdataArr, "5b6899953d1a866534f516e2"); // showing the list of products
  updateDOM(currentDataArr);
};

// Loading DATA on pageload
window.onload = initialDOM;

// ---------- Cart Functionality ----------
const cartNumber = document.querySelector(".cart-items"); // buttons

if (!JSON.parse(localStorage.getItem("cart"))) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Function to update cart items
const addToCart = (product) => {
  console.log("added");
  notify("success", `&#9989; Added to cart successfully`);
  function notify(type, message) {
    (() => {
      let n = document.createElement("div");
      let id = Math.random().toString(36).substr(2, 10);
      n.setAttribute("id", id);
      n.classList.add("notification", type);
      n.innerHTML = message;
      document.getElementById("notification-area").appendChild(n);
      setTimeout(() => {
        var notifications = document
          .getElementById("notification-area")
          .getElementsByClassName("notification");
        for (let i = 0; i < notifications.length; i++) {
          if (notifications[i].getAttribute("id") == id) {
            notifications[i].remove();
            break;
          }
        }
      }, 5000);
    })();
  }

  // Toggle active class on buttons
  const makeButtonActive = (buttonArr, buttonValue) => {
    buttonArr.map((button) => {
      button.value === buttonValue
        ? button.classList.add("active")
        : button.classList.remove("active");
    });
  };

  //overlay.classList.toggle("active");
  let storageArray = JSON.parse(localStorage.getItem("cart"));

  storageArray.push(product);

  localStorage.setItem("cart", JSON.stringify(storageArray));

  console.log(localStorage.getItem("cart"));

  cartNumber.textContent = `${storageArray.length} items`;
};

var el = document.querySelector(".custom-select-wrapper");
if (el) {
  el.addEventListener("click", function () {
    this.querySelector(".custom-select").classList.toggle("open");
  });
}
for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".custom-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      this.closest(".custom-select").querySelector(
        ".custom-select__trigger span"
      ).textContent = this.textContent;
    }
  });
}

window.addEventListener("click", function (e) {
  const select = document.querySelector(".custom-select");
  if (select) {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  }
});
