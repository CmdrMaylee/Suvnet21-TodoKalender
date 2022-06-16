const jokeBtn = document.getElementById("jokeBtn");
const chuckText = document.getElementById("chuckText");

addEventListener("click", () => {
  console.log("clicked the button");
  const url = "https://api.chucknorris.io/jokes/random?category=dev";
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.value);
      chuckText.innerText = data.value;
    });
});

// Select modal
var mpopup = document.getElementById("mpopupBox");

// Select trigger link
var mpLink = document.getElementById("mpopupLink");

// Select close action element
var close = document.getElementsByClassName("close")[0];

// Open modal once the link is clicked
mpLink.onclick = function () {
  mpopup.style.display = "block";
};

// Close modal once close element is clicked
close.onclick = function () {
  mpopup.style.display = "none";
};

// Close modal when user clicks outside of the modal box
window.onclick = function (event) {
  if (event.target == mpopup) {
    mpopup.style.display = "none";
  }
};