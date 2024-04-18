// darkmode.js
document.addEventListener("DOMContentLoaded", function() {
    var darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkModeEnabled", document.body.classList.contains("dark-mode"));
        });

        if (localStorage.getItem("darkModeEnabled") === "true") {
            document.body.classList.add("dark-mode");
        }
    } else {
        console.error("Element with ID 'dark-mode-toggle' not found.");
    }
});
