// --- Tab Switching ---
const roundTripBtn = document.getElementById('roundTripBtn');
const oneWayBtn = document.getElementById('oneWayBtn');
const multiCityBtn = document.getElementById('multiCityBtn');
const returnGroup = document.getElementById('returnGroup');
const tripSection = document.getElementById('tripSection');
const multiCitySection = document.getElementById('multiCitySection');
const cityContainer = document.getElementById('cityContainer');
const addDestinationBtn = document.getElementById('addDestinationBtn');


let currentTab = 'round';

function switchTab(tab) {
  currentTab = tab;
  [roundTripBtn, oneWayBtn, multiCityBtn].forEach(b => b.classList.remove('active'));

  if (tab === 'round') {
    roundTripBtn.classList.add('active');
    tripSection.classList.remove('hidden');
    multiCitySection.classList.add('hidden');
    returnGroup.classList.remove('hidden');
  } else if (tab === 'oneway') {
    oneWayBtn.classList.add('active');
    tripSection.classList.remove('hidden');
    multiCitySection.classList.add('hidden');
    returnGroup.classList.add('hidden');
  } else {
    multiCityBtn.classList.add('active');
    tripSection.classList.add('hidden');
    multiCitySection.classList.remove('hidden');
    if (cityContainer.childElementCount === 0) addDestination();
  }
}

roundTripBtn.onclick = () => switchTab('round');
oneWayBtn.onclick = () => switchTab('oneway');
multiCityBtn.onclick = () => switchTab('multi');


// --- Flexible Date ---
const departDate = document.getElementById('departDate');
const returnDate = document.getElementById('returnDate');
const flexDate = document.getElementById('flexDate');

flexDate.addEventListener('change', () => {
  const today = new Date().toISOString().split('T')[0];
  if (flexDate.checked) {
    departDate.value = today;
    if (!returnGroup.classList.contains('hidden')) returnDate.value = today;
  } else {
    departDate.value = '';
    returnDate.value = '';
  }
});

// --- Counters ---
const adultCount = document.getElementById('adultCount');
const childCount = document.getElementById('childCount');
document.querySelectorAll('.plus').forEach(btn => {
  btn.onclick = () => {
    if (btn.dataset.type === 'adult')
      adultCount.textContent = parseInt(adultCount.textContent) + 1;
    else
      childCount.textContent = parseInt(childCount.textContent) + 1;
  };
});
document.querySelectorAll('.minus').forEach(btn => {
  btn.onclick = () => {
    if (btn.dataset.type === 'adult' && adultCount.textContent > 1)
      adultCount.textContent = parseInt(adultCount.textContent) - 1;
    else if (btn.dataset.type === 'child' && childCount.textContent > 0)
      childCount.textContent = parseInt(childCount.textContent) - 1;
  };
});

// --- Multi-city ---
function addDestination() {
  const div = document.createElement('div');
  div.classList.add('form-row');
  div.innerHTML = `
    <div class="form-group">
      <label>Departure City</label>
      <input type="text" placeholder="Type Departure City">
    </div>
    <div class="form-group">
      <label>Destination City</label>
      <input type="text" placeholder="Type Destination City">
    </div>
    <div class="form-group">
      <label>Date</label>
      <input type="date">
    </div>
    <button type="button" class="add-destination remove-btn" style="border-color:red; color:red;">Remove</button>
  `;
  cityContainer.appendChild(div);
  div.querySelector('.remove-btn').onclick = () => div.remove();
}
addDestinationBtn.onclick = addDestination;

// --- Save Data and Redirect ---
document.getElementById('bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const bookingData = {
    type: currentTab,
    departure: document.getElementById('departureCity')?.value || '',
    destination: document.getElementById('destinationCity')?.value || '',
    departDate: departDate.value,
    returnDate: returnDate.value,
    flightClass: document.getElementById('travelClass').value,
    adults: adultCount.textContent,
    children: childCount.textContent,
    flexible: flexDate.checked,
    multiCities: [],
  };

  if (currentTab === 'multi') {
    cityContainer.querySelectorAll('.form-row').forEach(row => {
      const inputs = row.querySelectorAll('input');
      bookingData.multiCities.push({
        from: inputs[0].value,
        to: inputs[1].value,
        date: inputs[2].value
      });
    });
  }

  localStorage.setItem('flightBooking', JSON.stringify(bookingData));
  window.location.href = 'results.html';
});



  function goBack() {
    if (document.referrer && document.referrer !== window.location.href) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  }

const savedTrip = JSON.parse(localStorage.getItem("tripDetails"));

  if (savedTrip) {
    document.getElementById("departureCity").value = savedTrip.fromCity || "";
    document.getElementById("destinationCity").value = savedTrip.toCity || "";
    document.getElementById("departDate").value = savedTrip.departDate || "";
    document.getElementById("returnDate").value = savedTrip.arrivalDate || "";
  } else {
    console.warn("No trip data found in localStorage.");
  }
