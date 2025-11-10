document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const passengers = parseInt(document.getElementById('passengers').value);
    const departDateInput = document.getElementById('depart').value;

    if (!departDateInput) {
        alert("Please select a departure date!");
        return;
    }

    // Departure date
    const departDate = new Date(departDateInput);

    // Auto-generate return date (3 days later)
    const returnDate = new Date(departDate);
    returnDate.setDate(returnDate.getDate() + 3);

    // Format dates nicely
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const departDateFormatted = departDate.toLocaleDateString('en-GB', options);
    const returnDateFormatted = returnDate.toLocaleDateString('en-GB', options);

    // Update ticket prices based on passengers
    const prices = document.querySelectorAll('.ticket-price');
    prices.forEach(priceEl => {
        const basePrice = parseInt(priceEl.getAttribute('data-price'));
        const total = basePrice * passengers;
        priceEl.textContent = `KES ${total.toLocaleString()}`;
    });

    // Update return date in each card
    const returnEls = document.querySelectorAll('.return-date');
    returnEls.forEach(el => {
        el.textContent = `Return Date: ${returnDateFormatted}`;
    });

    // Show results
    document.getElementById('results').style.display = 'block';
});


  // Load search data from homepage
  const savedTrip = JSON.parse(localStorage.getItem("tripDetails"));
  if (savedTrip) {
    document.getElementById("departureCity").value = savedTrip.fromCity;
    document.getElementById("destinationCity").value = savedTrip.toCity;
    document.getElementById("departDate").value = savedTrip.departDate;
    document.getElementById("returnDate").value = savedTrip.arrivalDate;
  }




