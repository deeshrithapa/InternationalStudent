// ================== CONSULTATION FORM ==================
const consultContainer = document.getElementById("consultation-form");

const consultForm = document.createElement("form");

consultForm.innerHTML = `
  <label>Full Name *</label>
  <input type="text" name="name" placeholder="e.g. Aryan Thapa">
  <small class="error"></small>

  <label>Email Address *</label>
  <input type="email" name="email" placeholder="e.g. aryan@email.com">
  <small class="error"></small>

  <label>Phone Number</label>
  <input type="text" name="phone" placeholder="+61 497 900XXX">
  <small class="error"></small>

  <label>Country of Origin</label>
  <select name="country">
    <option value="">Select your country</option>
    <option>India</option>
    <option>Nepal</option>
    <option>UK</option>
  </select>

  <label>Study Level</label>
  <select name="level">
    <option value="">Select level</option>
    <option>Bachelor</option>
    <option>Master</option>
  </select>

  <label>Preferred Consultation Date *</label>
  <input type="date" name="date">
  <small class="error"></small>

  <label>Tell Us About Your Goals</label>
  <textarea name="message" placeholder="E.g. I am looking to study Computer Science..."></textarea>

  <button class="form-btn">Book Consultation</button>
  <p class="success-msg"></p>
`;

consultContainer.appendChild(consultForm);


// ================== GENERAL ENQUIRY FORM ==================
const enquiryContainer = document.getElementById("enquiry-form");

const enquiryForm = document.createElement("form");

enquiryForm.innerHTML = `
  <label>Full Name *</label>
  <input type="text" name="name" placeholder="Your full name">
  <small class="error"></small>

  <label>Email Address *</label>
  <input type="email" name="email" placeholder="your@email.com">
  <small class="error"></small>

  <label>Subject *</label>
  <select name="subject">
    <option value="">Select a topic</option>
    <option>Application Help</option>
    <option>Visa</option>
  </select>
  <small class="error"></small>

  <label>Your Message *</label>
  <textarea name="message" placeholder="Describe your question in detail"></textarea>
  <small class="error"></small>

  <button class="form-btn outline">Send Enquiry</button>
  <p class="success-msg"></p>
`;

enquiryContainer.appendChild(enquiryForm);


// ================== VALIDATION FUNCTION ==================
function validateForm(form) {
  let isValid = true;

  const inputs = form.querySelectorAll("input, textarea, select");
  const errors = form.querySelectorAll(".error");

  errors.forEach(e => e.textContent = "");
  inputs.forEach(i => i.classList.remove("input-error"));

  inputs.forEach((input, index) => {
    if (input.hasAttribute("name") && input.value.trim() === "") {
      errors[index].textContent = "This field is required";
      input.classList.add("input-error");
      isValid = false;
    }
  });

  // Email check
  const email = form.querySelector('input[name="email"]');
  if (email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.match(pattern)) {
      email.nextElementSibling.textContent = "Invalid email format";
      email.classList.add("input-error");
      isValid = false;
    }
  }

  // Phone check (only for consultation)
  const phone = form.querySelector('input[name="phone"]');
  if (phone && phone.value !== "") {
    const phonePattern = /^[0-9+ ]{10,15}$/;
    if (!phone.value.match(phonePattern)) {
      phone.nextElementSibling.textContent = "Invalid phone number";
      phone.classList.add("input-error");
      isValid = false;
    }
  }

  return isValid;
}


// ================== SUBMIT HANDLING ==================
[consultForm, enquiryForm].forEach(form => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const success = form.querySelector(".success-msg");

    if (validateForm(form)) {
      success.textContent = "Thank you! We will get back to you within 24 hours.";
      form.reset();
    } else {
      success.textContent = "";
    }
  });
});