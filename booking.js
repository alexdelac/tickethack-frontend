fetch('http://localhost:3000/bookings')
    .then(response=>response.json())
    .then(data=>{
        console.log(data.trips)
        
        if(data.trips.length != 0){
            document.querySelector('#booking-container').innerHTML = `<h1 id="booking-title">My booking</h1>`
           
            for (let i =0; i<data.trips.length; i++){
                const date = new Date(data.trips[i].book.date)
                const minutes = date.getMinutes()<10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
                console.log(minutes)
                console.log(data.trips[i])
                document.querySelector('#booking-container').innerHTML +=
                `
                <div class="trip">
                    <p>${data.trips[i].book.departure}>${data.trips[i].book.arrival}</p>
                    <p>${date.getHours()}h${minutes}</p>
                    <p>${data.trips[i].book.price}€</p>
                    <p>Departure in hours</p>
                </div>
                `
            }
            document.querySelector('#booking-container').innerHTML += `<p id="enjoy-travel">Enjoy your travels with TicketHack!</p>`
        }

    })