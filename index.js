import { menuArray } from './data.js'
const menu = document.getElementById('menu')
let billPriceArray = [];

document.addEventListener('click', function (e){
   if(e.target.dataset.id) {
       updateBill(e.target.dataset.id)
   } else if(e.target.id === "btn-complete") {
       document.getElementById('modal').classList.remove('hidden')
   } else if(e.target.id === "pay-btn") {
       document.getElementById('alert').classList.remove('hidden')
       document.getElementById('orders').classList.add('hidden')
       document.getElementById('modal').classList.add('hidden')
   } else if(e.target.dataset.food) {
       removeFood(e.target.dataset.food)
   }
})

function updateBill(id){
    const bill = document.getElementById('bill')
    let billHTML = ''; 
       
    document.getElementById('orders').classList.remove('hidden')
         
    const selectedFood = menuArray.filter(function(food){
        return food.id == id
    })[0]
 
 billPriceArray.push(selectedFood.price)
 
  billHTML += `
    <div class="order-items">
        <div id="item-${selectedFood.id}" class="order-item">
            <p class="order-item-name">${selectedFood.name}
            <span data-food="${selectedFood.id}" class="order-item-remove">remove</span>
            </P>
            <p id="price-${selectedFood.id}" class="order-item-price">${selectedFood.price}</p>
        </div>
    </div>
    `  
             
    bill.innerHTML += billHTML
    updateTotal(0)
}

function updateTotal(number){
    const total = document.getElementById('total')
    let totalPrice = 0;
    
    billPriceArray.forEach(function(number){
        totalPrice += Number(number);
    })
    
    
    totalPrice += number
    billPriceArray = [];
    billPriceArray.push(totalPrice)
    
    const totalHTML= `
        <p class="total-price">Total price:</p>
        <p class="total-digits">${totalPrice}</p>
        `
        total.innerHTML = totalHTML
}

function removeFood(id) {
    let foodOrder = `item-${id}`
    let priceId = `price-${id}`
    let orderPrice = document.getElementById(priceId).textContent
    orderPrice = Number(orderPrice)
    
    updateTotal(-orderPrice) 
   document.getElementById(foodOrder).remove()
}

function renderMenuHtml() {
    const bill = document.getElementById('bill')    
    let menuHTML = ''
    
    menuArray.forEach(function(food){
        let foodIngredientArray = []
        
        food.ingredients.forEach(function(ingredient) {
            foodIngredientArray.push(ingredient)
        })
        
        menuHTML += `
        <div class="menu-item">
            <div class="food-item">
                <div class="food-emoji">
                    ${food.emoji}
                </div>
                <div class="food-details">
                    <h3 class="food-name"> ${food.name}</h3>
                    <p class="food-ingredients">${foodIngredientArray}</p>
                    <p class="food-price"> ${food.price}</p>
                </div>                    
            </div><!-- food item -->
            <div class="food-btn" data-id="${food.id}">
                <svg data-id="${food.id}" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.8395 32.8068V19.0114H26.169V32.8068H24.8395ZM18.6122 26.5795V25.2386H32.3963V26.5795H18.6122Z" fill="#3C3C3C"/>
                <circle cx="25" cy="25" r="24.25" stroke="#DEDEDE" stroke-width="1.5"/>
                </svg>
            </div>                
        </div>
		<hr>
        `
    })
    
    return menuHTML
}


function render(){
    menu.innerHTML = renderMenuHtml();
    
}
render()
