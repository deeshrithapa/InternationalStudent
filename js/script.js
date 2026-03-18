// Load navbar

fetch("components/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;

    // Menu toggle after header loads
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navLinks");

    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  });

// Load Footer

fetch("components/footer.html")
.then(response => response.text())
.then(data => {
document.getElementById("footer").innerHTML = data;
});
