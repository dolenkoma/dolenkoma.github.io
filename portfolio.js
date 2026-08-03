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

  const sliders = document.querySelectorAll("[data-slider]");

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll("[data-slider-slide]");
    const controls = slider.querySelectorAll("[data-slider-direction]");
    const counter = slider.querySelector("[data-slider-counter]");
    let currentIndex = 0;

    function showSlide(nextIndex) {
      if (!slides.length) {
        return;
      }

      currentIndex = (nextIndex + slides.length) % slides.length;

      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentIndex);
      });

      if (counter) {
        counter.textContent = `${currentIndex + 1} / ${slides.length}`;
      }
    }

    controls.forEach((control) => {
      control.addEventListener("click", () => {
        const direction = control.getAttribute("data-slider-direction");
        showSlide(direction === "next" ? currentIndex + 1 : currentIndex - 1);
      });
    });

    showSlide(0);
  });

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
