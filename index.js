var addToCartBtns = document.getElementsByClassName('add-to-cart')

// listen for the add button being clicked.
for ( var i = 0 ; i < addToCartBtns.length; i++){
  var button = addToCartBtns[i]
  // ---- ONE: Call the addToCartClicked function when the add button is clicked
  button.addEventListener('click', addToCartClicked)
}

// handle the clicking event
function addToCartClicked(event){
  // get product info from the html (index.html). i.e the name, price and associated image
  var button = event.target
  var shopItem = button.parentElement.parentElement.parentElement
  var productName = shopItem.getElementsByClassName('product-name')[0].innerText
  var price = shopItem.getElementsByClassName ('price')[0].innerText
  var imageSrc= shopItem.getElementsByClassName('product-image')[0].src
  // ---- TWO: Call the addItemToCart function and pass the extracted info for it to store in localStorage
  addItemToCart(productName,price,imageSrc)
}

let cart= JSON.parse(localStorage.getItem('CART')) || [];

// ---- THREE: Add items to localStorage. The key is 'CART'
function addItemToCart(productName, price, imageSrc) {
  // first, update cart counter at the top of the page. the next three lines (only) are in charge of this 
  var cartCounter = document.getElementById("cart-counter")
  var count = Number(cartCounter.innerHTML)
  cartCounter.innerHTML = count + 1
  
  // second, update the cart items count in session storage
  // 1. check if the item is already in cart
  // if product exists in cart, increase the count
  let search = cart.find((x) => x.name === productName) // search will return the product's object

  // it will be undefined if there was noobject previously stored. in this case, add it
  if (search === undefined) {
    cart.push({
      name: productName,
      count: 1,
      price: Number(price.replace("$", "")),
      imgSrc: imageSrc
    });
  // if there was already an object, update the count
  } else {
    search.count += 1;
  }

  localStorage.setItem("CART", JSON.stringify(cart));
}

// FOUR: actully render the items
function showCartItems() {
  let cartItems = document.getElementsByClassName('cart-items')[0]

  // define variable to keep track of total sum. this will update element with id = "total" (in shopping_cart.html)
  let total = 0

  // define array of all product names to use for looping
  const allProducts = [
    "White baseball hat",
    "Blue shorts",
    "white top",
    "Nude long sleeve top",
    "Baseball cap",
    "White T-shirt"
  ]
  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i]
    let item = cart.find((x) => x.name === product) // similar to what we did earlier

    // now append html to "cartItems" if and only if it has been stored in cart. i.e "item" is not undefined
    if (item) {
      cartItems.innerHTML += `<div class="item">
            <div>
                <img src="${item.imgSrc}" alt="" class="image-cart" >
            </div>

            <div class="product_name-cart">
                ${item.name}
            </div>

            <div ><input type="number" class="quantity" value="${item.count}" onchange="updateCartTotal()"></div>

            <div class="price-cart">$${item.price}</div>

            <div><button class="remove-cart">X</button></div>
        </div>`
    }
  }
    
  // update the cart total
  updateCartTotal()
  // clear the storage, optional
  localStorage.clear()
}

var removeItemButton = document.getElementsByClassName('remove-cart')
 for ( var i = 0 ; i < removeItemButton.length; i++){
    var removeButton = removeItemButton[i]
    removeButton.addEventListener('click', function(event){
       var buttonClicked = event.target
       buttonClicked.parentElement.parentElement.remove()
       updateCartTotal()
    })

}

var quantityInputs = document.getElementsByClassName('quantity')
for ( var i = 0 ; i < quantityInputs.length; i++){
  var input = quantityInputs[i]
  input.addEventListener('change', quantityChanged)
}


function quantityChanged(event){
  var input = event.target
  if(isNaN(input.value) || input.value <= 0){
      input.value = 1
  }
  updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartItems = cartItemContainer.getElementsByClassName('item')
    var total = 0
    for ( var i = 0 ; i < cartItems.length; i++){
      var  cartItem = cartItems[i]
      var priceElement = cartItem.getElementsByClassName('price-cart')[0]
      var quantityElement = cartItem.getElementsByClassName('quantity')[0]

      var price =parseFloat(priceElement.innerText.replace('$',''))

      var quantity = quantityElement.value
      total = total + (price * quantity)
} 
total = Math.round(total*100) /100
document.getElementsByClassName('total-price')[0].innerText = `\$${total}`
}


// NOTES: I added an onchange event handler to the each item (check line 83) to change the total without the listener
// I did this because the listeners were broken for some reason, I can't figure out why
// I would suggest taking them out as they are no longer necessary.
