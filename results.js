const booking = JSON.parse(localStorage.getItem('flightBooking'));
const summaryDiv = document.getElementById('flightSummary');
const optionsDiv = document.getElementById('ticketOptions');

if (!booking) {
  summaryDiv.innerHTML = '<p>No booking data found. Please return and book again.</p>';
} else {
  // --- Display Summary ---
  let summaryHTML = `
    <h3>Trip Summary</h3>
    <p><strong>Trip Type:</strong> ${booking.type.toUpperCase()}</p>
    <p><strong>From:</strong> ${booking.departure}</p>
    <p><strong>To:</strong> ${booking.destination}</p>
    <p><strong>Departure Date:</strong> ${booking.departDate || '-'}</p>
  `;

  if (booking.type === 'round')
    summaryHTML += `<p><strong>Return Date:</strong> ${booking.returnDate || '-'}</p>`;

  if (booking.type === 'multi') {
    summaryHTML += `<h4>Additional Destinations:</h4>`;
    booking.multiCities.forEach((city, i) => {
      summaryHTML += `<p>${i + 1}. ${city.from} → ${city.to} (${city.date || '-'})</p>`;
    });
  }

  summaryHTML += `
    <p><strong>Class:</strong> ${booking.flightClass}</p>
    <p><strong>Adults:</strong> ${booking.adults}, <strong>Children:</strong> ${booking.children}</p>
  `;

  summaryDiv.innerHTML = summaryHTML;

  // --- Ticket Options ---
  const basePrice = 150;
  const options = [
    { type: 'Economy', price: basePrice },
    { type: 'Business', price: basePrice * 2 },
    { type: 'First Class', price: basePrice * 3 },
  ];

  optionsDiv.innerHTML = options
    .map(
      (o, idx) => `
        <div class="ticket" data-index="${idx}">
          <h4>${o.type}</h4>
          <p>Price: $${o.price}</p>
          <button class="book-now" data-type="${o.type}" data-price="${o.price}">Book Now</button>
        </div>
      `
    )
    .join('');
}

// === Confirmation Modal ===
const modalHTML = `
  <div id="confirmModal" class="modal hidden">
    <div class="modal-content">
      <h3>Confirm Your Booking</h3>
      <p>Please review your details before proceeding:</p>
      <div id="modalDetails"></div>
      <div class="modal-actions">
        <button id="cancelBtn">Cancel</button>
        <button id="confirmBtn">Confirm & Download Ticket</button>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

// --- Modal Logic ---
const modal = document.getElementById('confirmModal');
const modalDetails = document.getElementById('modalDetails');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

optionsDiv.addEventListener('click', (e) => {
  const btn = e.target.closest('.book-now');
  if (!btn) return;

  const type = btn.dataset.type;
  const price = btn.dataset.price;

  modalDetails.innerHTML = `
    <p><strong>From:</strong> ${booking.departure}</p>
    <p><strong>To:</strong> ${booking.destination}</p>
    <p><strong>Departure:</strong> ${booking.departDate}</p>
    ${booking.returnDate ? `<p><strong>Return:</strong> ${booking.returnDate}</p>` : ''}
    <p><strong>Class:</strong> ${type}</p>
    <p><strong>Total Price:</strong> $${price}</p>
  `;

  modal.classList.remove('hidden');

  confirmBtn.onclick = () => {
    const confirmation = {
      bookedAt: new Date().toISOString(),
      class: type,
      price: price,
      bookingSummary: booking,
    };
    localStorage.setItem('bookedTicket', JSON.stringify(confirmation));
    modal.classList.add('hidden');
    window.location.href = 'ticket.html'; // redirect to ticket page
  };

  cancelBtn.onclick = () => modal.classList.add('hidden');
});

  function goBack() {
    if (document.referrer && document.referrer !== window.location.href) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  }


