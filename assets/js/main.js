document.addEventListener("DOMContentLoaded", function() {
    !function e() {
    let t=document.querySelector(".hamburger"), n=document.querySelector(".nav-links");
    t.addEventListener("click", () => {
        n.classList.toggle("active"), t.textContent=n.classList.contains("active")?"✕": "☰"}
    );
    let c=document.querySelectorAll(".nav-links a");
    c.forEach(e => {
        e.addEventListener("click", () => {
            n.classList.remove("active"), t.textContent="☰"}
        );
    });

}()
});
    