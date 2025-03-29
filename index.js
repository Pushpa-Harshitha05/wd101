let email = document.getElementById('email');

email.addEventListener('input', () => {
  const emailElement = document.getElementById('email');
  const email = emailElement.value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailPattern.test(email)) {
    emailElement.setCustomValidity(""); // Valid email
    return true;
  } else {
    emailElement.setCustomValidity("Please enter a valid email address.");
    emailElement.reportValidity();
    return false;
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

  if((year>1970) && (year<2007)){
    dobelement.setCustomValidity("");
    return true;
  }

  else if(year==1970){
    if(month < 3){
      dobelement.setCustomValidity("Age must be between 18 and 55 years old");
      return false;
    }
    else if(month == 3){
      if(day > 29){
        dobelement.setCustomValidity("");
        return true;
      }
      else{
        dobelement.setCustomValidity("Age must be between 18 and 55 years old");
        return false;
      }
    }
    
    else{
      dobelement.setCustomValidity("");
      return true;
    }
  }

  else if(year==2007){
    if(month > 3){
      dobelement.setCustomValidity("Age must be between 18 and 55 years old");
      return false;
    }
    else if(month == 3){
      if(day < 29){
        dobelement.setCustomValidity("");
        return true;
      }
      else{
        dobelement.setCustomValidity("Age must be between 18 and 55 years old");
        return false;
      }
    }
    
    else{
      dobelement.setCustomValidity("Age must be between 18 and 55 years old");
      return false;
    }
  }

  else{
    dobelement.setCustomValidity("Age must be between 18 and 55 years old");
    return false;
  }

}

dobelement.addEventListener('input', () => {
  dobelement.setCustomValidity("");
});

displayEntries();
