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

document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();

  window.location.reload();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const terms = document.getElementById('terms').checked;
  const [day, month, year] = dob.split('/'); 
  const birthDate = new Date(`${year}-${month}-${day}`);

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--; // Adjust if birthday hasn't occurred this year
  }

  const dobelement = document.getElementById('dob');

  // Check if the age is between 18 and 55 years
  if (age < 18 || age > 55) {
      dobelement.setCustomValidity('Age must be between 18 and 55 years old');
      dobelement.reportValidity();
      console.log('Age not within valid range');
      return;
  } else {
      dobelement.setCustomValidity('');
  }



  const data = { name, email, password, dob, terms };
  entries.push(data);

  localStorage.setItem('user-form', JSON.stringify(entries));
  displayEntries();
});

displayEntries();
