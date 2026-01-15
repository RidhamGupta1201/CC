const openBtn = document.getElementById("openEventForm");
const modal = document.getElementById("eventModal");
const closeBtn = document.getElementById("closeEventForm");
const saveBtn = document.getElementById("saveEvent");
const upcomingContainer = document.getElementById("upcomingEvents");

openBtn.onclick = () => modal.classList.remove("hidden");
closeBtn.onclick = () => modal.classList.add("hidden");

function saveEvent(event) {
  let events = JSON.parse(localStorage.getItem("events")) || [];
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));
}

function loadEvents() {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  upcomingContainer.innerHTML = "";

  events.forEach((e, index) => {
    upcomingContainer.innerHTML += `
      <div class="event-card">
        <span class="tag category ${e.category}">
          ${e.category.charAt(0).toUpperCase() + e.category.slice(1)}
        </span>

        <button class="delete-btn" onclick="deleteEvent(${index})">🗑️</button>

        <h3>${e.name}</h3>
        <p class="date">📅 ${e.date}</p>
        <p class="college">🏫 ${e.college}</p>
        <p class="coordinator">👤 ${e.coordinator}</p>
        <p class="description">${e.desc}</p>
      </div>
    `;
  });
}
function deleteEvent(index) {
  if (!confirm("Delete this event?")) return;

  let events = JSON.parse(localStorage.getItem("events")) || [];
  events.splice(index, 1);
  localStorage.setItem("events", JSON.stringify(events));
  loadEvents();
}


saveBtn.onclick = () => {
  const event = {
    name: eventName.value,
    date: eventDate.value,
    college: eventCollege.value,
    coordinator: eventCoordinator.value,
    category: eventCategory.value,
    desc: eventDesc.value
  };

  if (!event.name || !event.date) {
    alert("Please fill required fields");
    return;
  }

  saveEvent(event);
  modal.classList.add("hidden");
  loadEvents();
};

loadEvents();
