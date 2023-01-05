"use strict";

const form = document.querySelector(".form-con");
const checkAll = document.querySelector(".terms-check-all input");
const checkBoxes = document.querySelectorAll(".input-check input");
const submitButton = document.querySelector("button");

const agreements = {
  termService: false,
  termPrivacy: false,
  termPromotion: false,
};

form.addEventListener("submit", (e) => e.preventDefault());

checkBoxes.forEach((item) => item.addEventListener("input", toggleCheckbox));

function toggleCheckbox(e) {
  const { checked, id } = e.target;
  agreements[id] = checked;
  checkAllStatus();
  toggleSubmitButton();
}

function checkAllStatus() {
  const { termService, termPrivacy, termPromotion } = agreements;
  if (termService && termPrivacy && termPromotion) {
    checkAll.checked = true;
  } else {
    checkAll.checked = false;
  }
}

function toggleSubmitButton() {
  const { termService, termPrivacy } = agreements;
  if (termService && termPrivacy) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

checkAll.addEventListener("click", (e) => {
  const { checked } = e.target;
  if (checked) {
    checkBoxes.forEach((item) => {
      item.checked = true;
      agreements[item.id] = true;
    });
  } else {
    checkBoxes.forEach((item) => {
      item.checked = false;
      agreements[item.id] = false;
    });
  }
  toggleSubmitButton();
});
