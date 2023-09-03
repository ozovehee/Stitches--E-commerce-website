var addToCartBtns = document.getElementsByClassName('add-to-cart')

// listen for the add button being clicked.
for ( var i = 0 ; i < addToCartBtns.length; i++){
  var button = addToCartBtns[i]
  button.addEventListener('click', addToCartClicked)
}

// handle the clicking event
function addToCartClicked(event){
  // get product info
  var button = event.target
  var shopItem = button.parentElement.parentElement.parentElement
  var productName = shopItem.getElementsByClassName('product-name')[0].innerText
  var price = shopItem.getElementsByClassName ('price')[0].innerText
  var imageSrc= shopItem.getElementsByClassName('product-image')[0].src
  // pass the info to the relevant function.
  addItemToCart(productName,price,imageSrc)
}

function addItemToCart2 (productName,price,imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.innerText = productName
  var cartItems = document.getElementsByClassName('cart-items')
  cartItems.append(cartRow)

}

function addItemToCart(productName, price, imageSrc) {
  // first, update cart counter at the top of the page
  var cartCounter = document.getElementById("cart-counter")
  var count = Number(cartCounter.innerHTML)
  cartCounter.innerHTML = count + 1

  // second, update the cart items count in session storage
  // 1. check if the item is already in cart
  var productInCart = localStorage.getItem(productName)

  // if product exists in cart, increase the count
  if (productInCart) {
    const productCountString = `${productName}-count`
    const productCount = Number(localStorage.getItem(productCountString)) + 1
    localStorage.setItem(productCountString, productCount)
    console.log(`${productName} has been added to cart. Current count: ${productCount}`)
  } 
  else { // else add product info to storage
    console.log(`${productName} is being added to cart`)
    localStorage.setItem(productName, true)
    localStorage.setItem(`${productName}-count`, 1)
    localStorage.setItem(`${productName}-price`, Number(price))
    localStorage.setItem(`${productName}-image-src`, imageSrc)
  }
}

function showCartItems() {
  const allProducts = [
    "White baseball hat",
    "Blue shorts",
    "white top",
    "Nude long sleeve top",
    "Baseball cap",
    "White T-shirt"
  ]
  for (let i = 0; i < allProducts.length; i++) {
    const product = allProducts[i]
    if (localStorage.getItem(product)) {
      const count = localStorage.getItem(`${product}-count`)
      console.log(`Product <${product}> has ${count} items in cart`)
    } else {
      console.log(`Product <${product}> is not in cart`)

    }
  }

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

