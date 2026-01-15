const openBtn = document.getElementById("openFormBtn");
const form = document.getElementById("complaintForm");
const quote = document.getElementById("quotePage");
const backBtn = document.getElementById("backBtn");
const submitBtn = document.getElementById("submitBtn");

const subjectInput = document.getElementById("subject");
const concernInput = document.getElementById("concern");
const problemInput = document.getElementById("problem");
const suggestionInput = document.getElementById("suggestion");

openBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
  quote.style.display = "none";
});

backBtn.addEventListener("click", () => {
  form.classList.add("hidden");
  quote.style.display = "block";
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // 🔥 IMPORTANT

  saveComplaint({
    subject: subjectInput.value,
    concern: concernInput.value,
    problem: problemInput.value,
    suggestion: suggestionInput.value
  });

  alert("Complaint submitted successfully!");

    form.classList.add("hidden");
    quote.style.display = "block";

  loadComplaints();
});

function saveComplaint(data) {
  let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints.push({ ...data, likes: 0 });
  localStorage.setItem("complaints", JSON.stringify(complaints));
}

function loadComplaints() {
  const container = document.getElementById("complaintsList");
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  container.innerHTML = "";

  complaints.forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "complaint-card";
    div.innerHTML = `
      <h4>${c.subject}</h4>
      <p><b>Concern:</b> ${c.concern}</p>
      <p>${c.problem}</p>
      <p><i>${c.suggestion}</i></p>
      <button class="like-btn" onclick="likeComplaint(${index})">
        👍 Like (${c.likes})
      </button>
    `;
    container.appendChild(div);
  });
}

function likeComplaint(index) {
  let complaints = JSON.parse(localStorage.getItem("complaints"));
  complaints[index].likes++;
  localStorage.setItem("complaints", JSON.stringify(complaints));
  loadComplaints();
}

window.onload = loadComplaints;
