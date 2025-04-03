let emailelement = document.getElementById('email');
emailelement.addEventListener('input', () => validateEmail(emailelement));

const dobelement = document.getElementById('dob');

// Retrieve stored entries from localStorage
const retrieveEntries = () => {
  let storedEntries = localStorage.getItem('user-form');
  return storedEntries ? JSON.parse(storedEntries) : []; // Return array if exists, else empty array
};

let entries = retrieveEntries(); // Initialize with stored entries

// Function to display stored entries in the table
const displayEntries = () => {
  const table = document.getElementById('entriesTable');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = ''; // Clear existing table rows

  entries.forEach(entry => {
    const row = document.createElement('tr');
    row.classList.add("border-b");
    row.innerHTML = `
      <td class="p-2">${entry.name}</td>
      <td class="p-2">${entry.email}</td>
      <td class="p-2">${entry.password}</td>
      <td class="p-2">${entry.dob}</td>
      <td class="p-2">${entry.terms ? "Yes" : "No"}</td>
    `;
    tbody.appendChild(row);
  });
};

// Email validation function
function validateEmail(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("The email is not in the correct format!");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

// Validate Date of Birth (Must be exactly 18-55 years from today's date)
function validateDOB() {
  const dofb = dobelement.value;
  if (!dofb) return; // Prevent errors if dob is empty

  const dobDate = new Date(dofb);
  const today = new Date();
  
  const minAgeDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()); // 55 years ago (exact day)
  const maxAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()); // 18 years ago (exact day)

  if (dobDate >= minAgeDate && dobDate <= maxAgeDate) {
    dobelement.setCustomValidity("");
  } else {
    dobelement.setCustomValidity("Age must be between 18 and 55 years old.");
  }
  dobelement.reportValidity();
}

// Prevent submission if validation fails
document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();

  validateEmail(emailelement);
  validateDOB();

  // Prevent form submission if any field is invalid
  if (emailelement.validationMessage || dobelement.validationMessage) {
    return;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const terms = document.getElementById('terms').checked;

  const data = { name, email, password, dob, terms };
  entries.push(data);
  
  localStorage.setItem('user-form', JSON.stringify(entries)); // Store updated entries

  displayEntries(); // Update table without reloading the page
});

// Reset custom validation message when user edits the DOB field
dobelement.addEventListener('input', () => {
  dobelement.setCustomValidity("");
});

// Display saved entries on page load
displayEntries();
