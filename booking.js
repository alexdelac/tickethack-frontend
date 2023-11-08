fetch('http://localhost:3000/bookings')
    .then(response=>response.json())
    .then(data=>{

        
        if(data.trips.length != 0){
            document.querySelector('#booking-container').innerHTML = `<h1 id="booking-title">My bookings</h1>`
           
            for (let i =0; i<data.trips.length; i++){
                const date = new Date(data.trips[i].book.date)
                const minutes = date.getMinutes()<10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
                const date2 = new Date()
                const diffheure = ((date2-date)/1000)/3600
                const diffnumber = Math.round(diffheure).toString().split('').slice(1).join('')
                document.querySelector('#booking-container').innerHTML +=
                `
                <div class="trip">
                    <p>${data.trips[i].book.departure}>${data.trips[i].book.arrival}</p>
                    <p>${date.getHours()}h${minutes}</p>
                    <p>${data.trips[i].book.price}€</p>
                    <p>Departure in ${diffnumber} hours</p>
                </div>
                `
               
            }
            document.querySelector('#booking-container').innerHTML += `<p id="enjoy-travel">Enjoy your travels with TicketHack!</p>`
        }

        
    })