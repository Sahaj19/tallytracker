//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(inputs div)
const bill_amount_input = document.querySelector("#bill_amount");
const default_tip_btns = document.querySelectorAll(".default_tip_btn");
const custom_tip_input = document.querySelector("#custom_tip");
const people_count_input = document.querySelector("#people_count");
const generate_bill_btn = document.querySelector("#generate_bill_btn");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(output div)
const tip_amount_output = document.querySelector("#tip_amount");
const final_bill_amount_output = document.querySelector("#final_bill_amount");
const per_head_bill_amount_output = document.querySelector(
  "#per_head_bill_amount"
);
const reset_tip_btn = document.querySelector("#reset_bill_btn");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(global values)
let buttonTip = 0;
let billMoney = 0;
let customTip = 0;
let peopleCount = 0;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function btnState() {
  let billAmount = parseFloat(bill_amount_input.value);
  if (isNaN(billAmount) || billAmount <= 0) {
    // Disable buttons
    default_tip_btns.forEach((btn) => {
      btn.classList.remove("active_input_btn");
      btn.classList.remove("default_btns_box_shadow");
      btn.disabled = true;
      btn.style.cursor = "not-allowed";
    });
  } else {
    // Enable buttons
    default_tip_btns.forEach((btn) => {
      btn.classList.add("active_input_btn");
      btn.disabled = false;
      custom_tip_input.disabled = false;
      btn.style.cursor = "pointer";
    });
  }

  billMoney = billAmount;
}

bill_amount_input.addEventListener("input", btnState);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
default_tip_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    default_tip_btns.forEach((btn) => {
      btn.classList.remove("default_btns_box_shadow");
    });

    btn.classList.add("default_btns_box_shadow");

    buttonTip = Number(btn.textContent.slice(0, -1));
    custom_tip_input.value = ""; // Reset custom tip input
    customTip = 0; // Reset customTip
    people_count_input.disabled = false;
    // people_count_input.focus();
  });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(managing custom tip)
function customTipFn() {
  let custom_Tip = parseFloat(custom_tip_input.value);
  if (isNaN(custom_Tip) || custom_Tip <= 0 || custom_Tip == "") {
    // Disable buttons
    default_tip_btns.forEach((btn) => {
      btn.classList.add("active_input_btn");
      btn.disabled = false;
      btn.style.cursor = "pointer";
    });
    buttonTip = 0;
  } else {
    // Enable buttons
    default_tip_btns.forEach((btn) => {
      btn.classList.remove("active_input_btn");
      btn.classList.remove("default_btns_box_shadow");
      btn.disabled = true;
      btn.style.cursor = "not-allowed";
      people_count_input.disabled = false;
    });
    buttonTip = custom_Tip;
  }
}

custom_tip_input.addEventListener("input", customTipFn);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(number of people)
function peopleCountFn() {
  let people_count = parseInt(people_count_input.value);
  if (people_count > 0) {
    people_count_input.value = people_count;
    generate_bill_btn.classList.add("active_input_btn");
    generate_bill_btn.disabled = false;
    generate_bill_btn.style.cursor = "pointer";
  } else {
    generate_bill_btn.classList.remove("active_input_btn");
    generate_bill_btn.disabled = true;
    generate_bill_btn.style.cursor = "not-allowed";
  }

  peopleCount = people_count;
}

people_count_input.addEventListener("input", peopleCountFn);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(bill generating function)
generate_bill_btn.addEventListener("click", () => {
  let tipAmount = (billMoney * (buttonTip || customTip)) / 100;
  let totalBill = billMoney + tipAmount;
  let perHeadBill = totalBill / peopleCount;

  tip_amount_output.innerHTML = "₹ " + tipAmount.toFixed(2, 0);
  final_bill_amount_output.innerHTML = "₹ " + totalBill.toFixed(2, 0);
  per_head_bill_amount_output.innerHTML = "₹ " + perHeadBill.toFixed(2, 0);

  reset_tip_btn.disabled = false;
  reset_tip_btn.style.cursor = "pointer";
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(reset bill button functionality)
reset_tip_btn.addEventListener("click", () => {
  //reset inputs
  bill_amount_input.value = "";
  default_tip_btns.forEach((btn) => {
    btn.classList.remove("active_input_btn");
    btn.classList.remove("default_btns_box_shadow");
    btn.disabled = true;
    btn.style.cursor = "not-allowed";
  });
  people_count_input.value = "";
  custom_tip_input.value = "";
  generate_bill_btn.disabled = true;
  generate_bill_btn.style.cursor = "not-allowed";
  generate_bill_btn.classList.remove("active_input_btn");

  //reset outputs
  tip_amount_output.innerHTML = "";
  final_bill_amount_output.innerHTML = "";
  per_head_bill_amount_output.innerHTML = "";
  reset_tip_btn.disabled = true;
  reset_tip_btn.style.cursor = "not-allowed";
});
