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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(global values)
let buttonTip = 0;
let billMoney = 0;
let customTip = 0;
let peopleCount = 0;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function btnState() {
  let billAmount = parseFloat(bill_amount_input.value);
  if (billAmount > 0) {
    billMoney = billAmount;
    custom_tip_input.disabled = false;

    default_tip_btns.forEach((btn) => {
      btn.classList.add("active_input_btn");
      btn.disabled = false;
      btn.style.cursor = "pointer";
    });
  } else if (billAmount == "") {
    default_tip_btns.forEach((btn) => {
      btn.classList.remove("active_input_btn");
      btn.classList.remove("default_btns_box_shadow");
      btn.disabled = true;
      btn.style.cursor = "not-allowed";
    });
  } else if (billAmount !== "") {
    default_tip_btns.forEach((btn) => {
      btn.classList.remove("active_input_btn");
      btn.disabled = true;
      btn.style.cursor = "not-allowed";
    });
  }
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
    people_count.disabled = false;
    people_count.focus();
  });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(managing custom tip)

//is function ka purpose hai
//ek time par ek tip
//ya toh default tip me se koi select karlo
//ya phir apni custom tip enter kardo
function customTipFn() {
  let custom_Tip = parseFloat(custom_tip_input.value);
  if (custom_Tip > 0) {
    default_tip_btns.forEach((btn) => {
      btn.classList.remove("active_input_btn");
      btn.classList.remove("default_btns_box_shadow");
      btn.disabled = true;
      customTip = custom_Tip;
    });
  } else {
    default_tip_btns.forEach((btn) => {
      btn.disabled = false;
      btn.classList.add("active_input_btn");
    });
  }
}

custom_tip_input.addEventListener("input", customTipFn);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(number of people)
function peopleCountFn() {
  let people_count = parseInt(people_count_input.value);
  if (people_count > 0) {
    peopleCount = people_count;
    generate_bill_btn.classList.add("active_input_btn");
    generate_bill_btn.disabled = false;
    generate_bill_btn.style.cursor = "pointer";
  } else {
    generate_bill_btn.classList.remove("active_input_btn");
    generate_bill_btn.disabled = true;
    generate_bill_btn.style.cursor = "not-allowed";
  }
}

people_count_input.addEventListener("input", peopleCountFn);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(bill generating function)
generate_bill_btn.addEventListener("click", () => {
  console.log(billMoney);
  console.log(buttonTip);
  console.log(customTip);
  console.log(peopleCount);
});

//check custom tip input and output functionality
