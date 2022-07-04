const socket = io();
const players = document.querySelector(".players")
const animateClass = "animate-[pulse_500ms_ease-in-out_normal]"

socket.on("user", (user) => {
  const element = document.createElement("div")
  element.style.backgroundColor = user.color;
  element.innerHTML = user.user;
  players.appendChild(element);
  element.classList.add(animateClass);
})

socket.on("flash", (item) => {
  const pixel = document.querySelector("[data-x='" + item.x + "'][data-y='" + item.y + "']");
  pixel.classList.remove(animateClass);
  pixel.style.backgroundColor = item.color;
  pixel.classList.add(animateClass);
  setTimeout(() => {
    pixel.style = "";
  }, 500)
})

socket.on("pixel", (item) => {
  const pixel = document.querySelector("[data-x='" + item.x + "'][data-y='" + item.y + "']");
  pixel.classList.remove(animateClass);
  pixel.style.backgroundColor = item.color;
  pixel.classList.add(animateClass);
})
