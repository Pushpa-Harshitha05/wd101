let emailelement = document.getElementById('email');
emailelement.addEventListener('input', () => {
  validateEmail();
})

const dobelement = document.getElementById('dob');
const registrationForm = document.getElementById('registrationForm');


registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!registrationForm.checkValidity()) {
    registrationForm.reportValidity(); // show error messages
    return;
  }

  validateEmail();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    const data = { name, email, password, dob, terms };
    entries.push(data);

    localStorage.setItem('user-form', JSON.stringify(entries));
  
  displayEntries();
  document.getElementById('registrationForm').reset();
});


function validateEmail() {
  if (!emailelement.validity.valid) {
    emailelement.setCustomValidity("The email is not in the right format!!!");
  } else {
    emailelement.setCustomValidity("");
  }
  emailelement.reportValidity();
}



const retrieve = () => {
  let entry = localStorage.getItem('user-form');
  if (entry) {
    entry = JSON.parse(entry);
  } else {
    entry = [];
  }
  return entry;
};

let entries = retrieve();

const displayEntries = () => {
  const table = document.getElementById('entriesTable');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  entries.forEach(entry => {
    const row = `<tr class="border-b">
                            <td class="p-2">${entry.name}</td>
                            <td class="p-2">${entry.email}</td>
                            <td class="p-2">${entry.password}</td>
                            <td class="p-2">${entry.dob}</td>
                            <td class="p-2">${entry.terms}</td>
                        </tr>`;
    tbody.innerHTML += row;
  });
};

// function validateDOB() {
//   const dofb = dobelement.value;

//   const dob = new Date(dofb);

//   const minDate = new Date('1970-04-05');
//   const maxDate = new Date('2007-04-05');

//   if (dob >= minDate && dob <= maxDate) {
//     dobelement.setCustomValidity("");
//     return true;
//   } else {
//     dobelement.setCustomValidity("Age must be between 18 and 55 years old as of April 5, 2025");
//     dobelement.reportValidity();
//     return false;
//   }
// }

// dobelement.addEventListener('input', () => {
//   dobelement.setCustomValidity("");
// });

displayEntries();
