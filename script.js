
function addTripToCart(){
    for (let j = 0;j<document.querySelectorAll('.addTrip').length; j++){
        document.querySelectorAll('.addTrip')[j].addEventListener('click', function(){

            console.log(this.value)
            fetch('http://localhost:3000/carts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: this.value})
            }).then(response=>response.json())
                .then(data=>console.log(data))
        })
    }
    
}

document.querySelector('#searchButton').addEventListener('click', function(){
    const departCity = document.querySelector('#searchDepart').value
    const arrivalCity = document.querySelector('#searchArrival').value
    const date = document.querySelector('#dateDepart').value
    
    const searchTrips = {
        departure: departCity,
        arrival: arrivalCity,
        date: date,
    }

    fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchTrips)
    }).then(response=>response.json())
        .then(data=>{
            console.log(data)
            const trips = data.trips
            if(trips.length != 0){
                document.querySelector('#resultCard').innerHTML =[]
                for(let i =0; i<trips.length; i++){
                    const date = new Date(trips[i].date)
                    document.querySelector('#resultCard').innerHTML +=
                    `
                    <div class="trip">
                        <p>${trips[i].departure}>${trips[i].arrival}</p>
                        <p>${date.getHours()}h${date.getMinutes()}</p>
                        <p>${trips[i].price}€<p/>
                        <button type="submit" class="addTrip" value="${trips[i]._id}">Book</button>
                    </div>
                    
                    `
                } 
                addTripToCart()
            } else {
                console.log('rien')
                document.querySelector('#resultCard').innerHTML = 
                `
                <img src="./image/notfound.png" alt="Logo train" />
                <div id="border"></div>
                <p>No trip found.</p>
                `
            }
            
            
        })

})

