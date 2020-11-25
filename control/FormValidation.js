var mydate = new Date();
mydate.setDate(mydate.getDate() + 3);

var day = mydate.getDate();
var month = ("0" + (mydate.getMonth() + 1)).slice(-2);
var year = mydate.getFullYear();

var fullDate = year + "-" + month + "-" + day;

var myDatePicker = document.getElementById("myDate");
myDatePicker.setAttribute("min", fullDate);

var formValid = false;

(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      var forms = document.getElementsByClassName("needs-validation");
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
              formValid = false;
              showResult();
            } else if (form.checkValidity() == true) {
              event.preventDefault();
              $("#success").modal("show");
              formValid = true;
              showResult();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

function showResult() {
  const priceResult = document.getElementById("price-result");
  if (formValid == true) {
    calculate();
    priceResult.classList.remove("display-none");
  } else {
    priceResult.classList.add("display-none");
  }
}

function calculate() {
  let priceElement = document.getElementById("price-value");
  let taxElement = document.getElementById("taxes-value");
  let totalElement = document.getElementById("total-value");
  let shippingMehod = document.getElementsByName("paymentMethod");
  let planNumber = document.getElementById("myPlanNumber").value;
  let orderCount = document.getElementById("myCount").value;
  let shippingChoice;

  let mealCost = 7;
  let planCount = 0;

  for (var i = 0; i < shippingMehod.length; i++) {
    if (shippingMehod[i].checked) {
      shippingChoice = shippingMehod[i];
      break;
    }
  }

  if (planNumber == 1) {
    planCount = 28;
  } else if (planNumber == 2) {
    planCount = 84;
  } else {
    planCount = 7;
  }

  if (shippingChoice.value == "2") {
    mealCost = 8;
  }

  let cost = mealCost * planCount * orderCount;
  priceElement.innerHTML = "$" + cost.toFixed(2);
  taxElement.innerHTML = "$" + (cost * 0.06).toFixed(2);
  totalElement.innerHTML = "$" + (cost * 1.06).toFixed(2);
}
