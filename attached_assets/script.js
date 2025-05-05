document.addEventListener("DOMContentLoaded", () => {
  // real time counters, need to implement later
  const counters = document.querySelectorAll(".count");
  counters.forEach(counter => {
    counter.innerText = "0";
    const update = () => {
      const target = +counter.parentElement.getAttribute("data-target");
      const current = +counter.innerText;
      const inc = Math.ceil(target / 100);
      if (current < target) {
        counter.innerText = `${current + inc}`;
        setTimeout(update, 30);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });

  // card click highlight for counter
  const cards = document.querySelectorAll(".card");
  const tables = document.querySelectorAll(".data-table");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      tables.forEach(table => table.classList.remove("active"));
      const targetTable = document.getElementById(card.dataset.table);
      if (targetTable) targetTable.classList.add("active");

      const modalId = card.getAttribute("data-modal");
      if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("show");
      }
    });
  });

  // if i click modal section, it show the tables

  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").classList.remove("show");
    });
  });


  // clicking functionality

  window.addEventListener("click", (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  });
});
