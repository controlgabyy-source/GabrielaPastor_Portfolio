
// LOADER

window.onload = () => {

  setTimeout(() => {

    document.getElementById("loader").style.display = "none";

  }, 2000);

};

// BALLS

const balls = document.querySelectorAll(".ball");

balls.forEach(ball => {

  // random positions

  ball.style.left = Math.random() * window.innerWidth + "px";
  ball.style.top = Math.random() * window.innerHeight + "px";

  // floating

  let dx = Math.random() * 2;
  let dy = Math.random() * 2;

  function move(){

    let x = parseFloat(ball.style.left);
    let y = parseFloat(ball.style.top);

    if(x > window.innerWidth - 100 || x < 0){
      dx *= -1;
    }

    if(y > window.innerHeight - 100 || y < 0){
      dy *= -1;
    }

    ball.style.left = x + dx + "px";
    ball.style.top = y + dy + "px";

    requestAnimationFrame(move);

  }

  move();

  // grow on scroll

  window.addEventListener("scroll", () => {

    let scale = 1 + window.scrollY / 2000;

    ball.style.transform = `scale(${scale})`;

  });

  // explode

  ball.addEventListener("click", e => {

    for(let i = 0; i < 20; i++){

      let particle = document.createElement("div");

      particle.classList.add("particle");

      particle.style.left = e.pageX + "px";
      particle.style.top = e.pageY + "px";

      particle.style.setProperty("--x",
        (Math.random() - 0.5) * 400 + "px"
      );

      particle.style.setProperty("--y",
        (Math.random() - 0.5) * 400 + "px"
      );

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);

    }

    ball.remove();

  });

});
// MAIN BALL SCROLL EFFECT

const mainBall = document.getElementById("mainBall");

window.addEventListener("scroll", () => {

  let scroll = window.scrollY;

  let scale = 1 + scroll / 700;

  mainBall.style.transform =
    `translate(-50%, -50%) scale(${scale})`;

});