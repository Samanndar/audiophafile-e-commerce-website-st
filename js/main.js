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
      function keyEsc() {
        if("Esc") {
          elHeader.classList.remove("header--menu-open");
          elHeader.classList.remove("header--cart-open");
        } 
      }
      elHeader.addEventListener("keydown" , keyEsc)
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

  // CHEKOUT FORM
  const elCheckoutForm = document.querySelector("#checkout-form");
  const elFormPaymentMethodTabs = document.querySelector(".form-payment-method__tabs");
  const elsFormPaymentMethodTab = document.querySelectorAll(".form-payment-method__tab");
  const elFormPamentMethodField = document.querySelectorAll(".form-payment-method__e-money-field");

  function hidePaymentMethodsTabs() {
    elsFormPaymentMethodTab.forEach(elsFormPaymentMethodTab => {
      elsFormPaymentMethodTab.setAttribute("hidden", "true")
    });
  }

  if(elCheckoutForm) {
    const  elsPaymentMethodRadioInputs = elCheckoutForm.querySelectorAll(".form-payment__radio-input");

    elsPaymentMethodRadioInputs.forEach(elsPaymentMethodRadioInputs => {
      elsPaymentMethodRadioInputs.addEventListener("change", function() {
        hidePaymentMethodsTabs()
        disabledEMoneyFields()
        const target = elsPaymentMethodRadioInputs.dataset.target;
        elFormPaymentMethodTabs.querySelector(`[data-tab="${target}"]`).removeAttribute("hidden");
        if(target == "e-money") {
          enableEMoneyField();
        }
      })
    })
  }
  function enableEMoneyField() {
    elFormPamentMethodField.removeAttribute("disabled");
  }
  function disabledEMoneyFields() {
    elFormPamentMethodField.forEach(elFormPamentMethodField => {
      elFormPamentMethodField.setAttribute("disabled", "false");
    })
  }
}

document.addEventListener('DOMContentLoaded', init);