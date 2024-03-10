function init() {
  const MINIMUM_ITEM_COUNT = 1;
  const MAXIMUM_ITEM_COUNT = 10;

  // HEADER
  const elHeader = document.querySelector(".header");
  const elHeaderToggler = document.querySelectorAll(".header__toggler");

  // Click outside
  // Esc keyup

  elHeaderToggler.forEach(function(elHeaderToggler) {
    elHeaderToggler.addEventListener("click", function() {
      const target = elHeaderToggler.dataset.target;
      
      if(target === "menu") {
        elHeader.classList.remove("header--cart-open");
        elHeader.classList.toggle("header--menu-open");
      }
      
      if(target === "cart") {
        elHeader.classList.remove("header--menu-open");
        elHeader.classList.toggle("header--cart-open");
      }
      const isHeaderMenuOrCartOpen = elHeader.classList.contains("header--menu-open") || elHeader.classList.contains("header--cart-open");
      function showOverlay() {
        const elOverlay = document.querySelector(".overlay")
        elOverlay.classList.add("overlay--shown")
      }
      function hideOverlay() {
      const elOverlay = document.querySelector(".overlay")
        elOverlay.classList.remove("overlay--shown")
      }
      if(isHeaderMenuOrCartOpen) {
        showOverlay()
      } else {
        hideOverlay()
      }
      elHeader.addEventListener("keydown" , function() {
        if("Esc") {
          elHeader.classList.remove("header--menu-open");
          elHeader.classList.remove("header--cart-open");
        }
      })
    })
  })
  // NUMBER CONTROLS
  const elNumbersConstrolsDecrementButton = document.querySelectorAll(".number-controls__button--decrement");
  const elNumbersConstrolsIncrementButton = document.querySelectorAll(".number-controls__button--increment");

  elNumbersConstrolsDecrementButton.forEach(function(elButton) {
    elButton.addEventListener("click", function(evt) {
      changeItemCount(evt, "decrement")
    });
  })
  elNumbersConstrolsIncrementButton.forEach(function (elButton) {
    elButton.addEventListener("click", function(evt) {
      changeItemCount(evt, "increment")
    });
  })

  function changeItemCount(numberControlsButtonClickEvt, action) {
    const parentNumberControls = numberControlsButtonClickEvt.target.closest(".number-controls")
    let currentItemCount = parseInt(parentNumberControls.dataset.itemCount, 10);

    if (action == "increment" && currentItemCount === MAXIMUM_ITEM_COUNT) {
      return;
    }
    if (action == "decrement" && currentItemCount === MINIMUM_ITEM_COUNT) {
      return;
    }
    if (action == "increment") {
      currentItemCount++
    }
    if (action == "decrement") {
      currentItemCount--
    }

    parentNumberControls.dataset.itemCount = currentItemCount;
    parentNumberControls.querySelector(".number-controls__count-value").textContent = currentItemCount;
  }


}

document.addEventListener('DOMContentLoaded', init);