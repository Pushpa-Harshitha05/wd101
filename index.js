let emailelement = document.getElementById('email');
emailelement.addEventListener('input', () => {
  if(!emailelement.checkValidity()){
    emailelement.reportValidity();
  }
})

const dobelement = document.getElementById('dob');
const registrationForm = document.getElementById('registrationForm');


registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!registrationForm.checkValidity()) {
    registrationForm.reportValidity(); // Show browser errors
    return;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const terms = document.getElementById('terms').checked;

  const data = { name, email, password, dob, terms };
  entries.push(data);
  localStorage.setItem('user-form', JSON.stringify(entries));

  displayEntries();
  registrationForm.reset();
});


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

displayEntries();
