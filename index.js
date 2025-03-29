let email = document.getElementById('email');

email.addEventListener('input', () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("The email is not in the right format!!");
    email.reportValidity();
  } else {
    email.setCustomValidity("");
  }
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

const dobelement = document.getElementById('dob');

document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();

  if(!validateDOB()){
    dobelement.reportValidity();
  }
  else{
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    const data = { name, email, password, dob, terms };
    entries.push(data);
    window.location.reload();

    localStorage.setItem('user-form', JSON.stringify(entries));
  }
  
  displayEntries();
});

function validateDOB() {

  const dofb = document.getElementById('dob').value;
  const [year, month, day] = dofb.split('-').map(Number);

  console.log(year,month,day)

  const today = new Date();
  let age = today.getFullYear() - year;

  const monthDiff = today.getMonth() - month;

  const dayDiff = today.getDate() - day;

  // Adjust age if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
  }

  // Check if the age is between 18 and 55 years
  if (age < 18 || age > 55) {
    dobelement.setCustomValidity("Age must be between 18 and 55 years old");
    return false;
  } else {
    dobelement.setCustomValidity("");
    return true;
  }

}

dobelement.addEventListener('input', () => {
  dobelement.setCustomValidity("");
});

displayEntries();
