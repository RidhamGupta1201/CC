const stars = document.querySelectorAll(".stars i");
const form = document.getElementById("feedbackForm");
const thankYou = document.getElementById("thankYou");
const submitBtn = document.getElementById("submitFeedback");

let rating = 0;

stars.forEach(star => {
  star.addEventListener("click", () => {
    rating = star.dataset.value;
    highlightStars(rating);

    if (rating <= 3) {
      form.classList.remove("hidden");
      thankYou.classList.add("hidden");
    } else {
      form.classList.add("hidden");
      thankYou.classList.remove("hidden");
    }
  });
});

function highlightStars(count) {
  stars.forEach(s => {
    s.classList.remove("active");
    if (s.dataset.value <= count) {
      s.classList.add("active");
    }
  });
}

submitBtn.addEventListener("click", () => {
  form.classList.add("hidden");
  thankYou.classList.remove("hidden");
});
