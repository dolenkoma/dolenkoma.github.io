document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeButton = modal.querySelector(".modal-close");

  function openModal(button) {
    const imagePath = button.getAttribute("data-full-image");
    const image = button.querySelector("img");

    modalImage.src = imagePath;
    modalImage.alt = image ? image.alt : "Portfolio image preview";
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.hidden = true;
    modalImage.src = "";
    document.body.classList.remove("modal-open");
  }

  const imageButtons = document.querySelectorAll("[data-full-image]");

  imageButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(button));
  });

  const agromegaSlides = document.querySelectorAll(".agromega-slide");
  const agromegaControls = document.querySelectorAll("[data-slider-direction]");
  const slideCounter = document.querySelector(".slide-counter");
  let agromegaIndex = 0;

  function showAgromegaSlide(nextIndex) {
    if (!agromegaSlides.length) {
      return;
    }

    agromegaIndex = (nextIndex + agromegaSlides.length) % agromegaSlides.length;

    agromegaSlides.forEach((slide, index) => {
      slide.classList.toggle("active", index === agromegaIndex);
    });

    if (slideCounter) {
      slideCounter.textContent = `${agromegaIndex + 1} / ${agromegaSlides.length}`;
    }
  }

  agromegaControls.forEach((control) => {
    control.addEventListener("click", () => {
      const direction = control.getAttribute("data-slider-direction");
      showAgromegaSlide(direction === "next" ? agromegaIndex + 1 : agromegaIndex - 1);
    });
  });

  showAgromegaSlide(0);

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
});
