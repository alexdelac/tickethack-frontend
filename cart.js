
function getTotal(){
    let total = 0
    for (let i = 0; i<document.querySelectorAll('.price').length; i++){
        total += Number(document.querySelectorAll('.price')[i].textContent)
    }
    document.querySelector('#total').textContent = `Total: ${total}€`
}

function deleteCart(){
    for (let i=0; i<document.querySelectorAll('.deleteTrip').length; i++){
        document.querySelectorAll('.deleteTrip')[i].addEventListener('click', function(){
            fetch(`http://localhost:3000/carts/${this.value}`,{
                method: 'DELETE'})
                .then(response =>response.json())
                .then()
                this.parentNode.remove()
                getTotal()
        })
    }
    
}


function purchase(){
    document.querySelector('#purchase').addEventListener('click', function(){
        fetch('http://localhost:3000/carts/purchase')
            .then(response=>response.json())
            .then(data=>{
                window.location.assign('booking.html')
            })
    })   


}


fetch('http://localhost:3000/carts')
.then(response => response.json())
.then(data => {


const newCart = data.cart
if(newCart.length != 0){
    document.querySelector('#cart-container').innerHTML = `<h1 class="cart-title">My cart</h1>`
    for(let i =0; i<newCart.length; i++){
        const date = new Date(newCart[i].trip.date)
        const minutes = date.getMinutes()<10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        document.querySelector('#cart-container').innerHTML +=
        `
        <div class="trip">
            <p>${newCart[i].trip.departure}>${newCart[i].trip.arrival}</p>
            <p>${date.getHours()}h${minutes}</p>
            <p><span class="price">${newCart[i].trip.price}</span>€</p>
            <button type="submit" class="deleteTrip" value="${newCart[i]._id}">X</button>
        </div>
        `
    
    }

    document.querySelector('#cart-container').innerHTML +=
    `
    <div>
        <p id="total"></p>
        <button type="submit" class="purchaseTrips" id="purchase">Purchase</button>
    </div>
    `
    getTotal()
    deleteCart()
    purchase()
}
}) 






