
function iniciarCorazones() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.classList.add("floating");

        heart.style.left = Math.random() * 100 + "vw";

        const size = 20 + Math.random() * 40;
        heart.style.fontSize = size + "px";

        const duration = 3 + Math.random() * 3;
        heart.style.animationDuration = duration + "s";

        const rotate = Math.random() * 360;
        heart.style.transform = `rotate(${rotate}deg)`;

        const colors = ["#ff4d4d", "#ff66b2", "#cc66ff", "#ff99cc"];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        heart.style.opacity = 0.3 + Math.random() * 0.5;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }, 300); 
}