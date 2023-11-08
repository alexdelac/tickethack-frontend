fetch('http://localhost:3000/carts')
.then(response => response.json())
.then(data => {


const newCart = data.cart
console.log(data)
if(newCart.length != 0){
    let total = 0
    document.querySelector('#cart-container').innerHTML =[]
    for(let i =0; i<newCart.length; i++){
        const date = new Date(newCart[i].trip.date)
        total += newCart[i].trip.price
        document.querySelector('#cart-container').innerHTML +=
        `
        <div class="trip">
            <p>${newCart[i].trip.departure}>${newCart[i].trip.arrival}</p>
            <p>${date.getHours()}h${date.getMinutes()}</p>
            <p>${newCart[i].trip.price}€<p/>
            <button type="submit" class="addTrip" value="${newCart[i].trip._id}">X</button>
        </div>
        `
    
    }
    document.querySelector('#cart-container').innerHTML +=
    `
    <div>
        <p>Total:${total}</p>
        <button type="submit" class="addTrip">Purchase</button>
    </div>
    `
}
}) 