var addToCartBtns = document.getElementsByClassName('add-to-cart')

 for ( var i = 0 ; i < addToCartBtns.length; i++){
 var button = addToCartBtns[i]
 button.addEventListener('click',addToCartClicked )
 }

function addToCartClicked(event){
  var button = event.target
  var shopItem = button.parentElement.parentElement.parentElement
  var productName = shopItem.getElementsByClassName('product-name')[0].innerText
  var price = shopItem.getElementsByClassName ('price')[0].innerText
  var imageSrc= shopItem.getElementsByClassName('product-image')[0].src

  addItemToCart(productName,price,imageSrc)
}

function addItemToCart (productName,price,imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.innerText = productName
  var cartItems = document.getElementsByClassName('cart-items')
  cartItems.append(cartRow)

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

