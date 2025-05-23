const formSection = document.getElementById("formSection");
const HomePage = document.getElementById("HomePage"); 
const createPage = document.getElementById("createPage");
const table = document.getElementById("table");
const tableBody = document.getElementById("tableBody");
table.style.display = "block";
async function fetchContacts() {
    const res = await fetch("http://localhost:5500/contacts");
    const data = await res.json();
    renderTable(data);
    console.log(data);
  }

  function renderTable(contacts) {
    tableBody.innerHTML = "";
    contacts.forEach(contact => {
        tableBody.innerHTML += `
        <tr>
          <td>${contact.id}</td>
          <td>${contact.name}</td>
          <td>${contact.email}</td>
          <td>${contact.phone}</td>
          <td>${contact.city}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick='editContact(${JSON.stringify(contact)})'>Edit</button>
            <button class="btn btn-sm btn-danger" onclick='deleteContact(${contact.id})'>Delete</button>
          </td>
        </tr>
      `;
    });
  }

HomePage.addEventListener("click",()=>{
    formSection.style.display = "none";
    table.style.display = "block";
    fetchContacts();
});
createPage.addEventListener("click",()=>{
    formSection.style.display = "block";
    table.style.display = 'none';
});


formSection.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const id = document.getElementById("contactId").value;
    const contact = {
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        phone:document.getElementById("phone").value,
        city:document.getElementById("city").value,
    };
    const method = id?'PUT':'POST';
    const url = id?`/contacts/${id}`:`/`;
    const res = await fetch(url,{
        method:method,
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(contact),
    });
    submitButton.textContent = res.status;
    document.getElementById("contactId").value = '';
});
function editContact(contact) {
    submitButton.textContent = "Submit";
    formSection.style.display = "block";
    table.style.display = "none";
    document.getElementById("contactId").value = contact.id;
    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("city").value = contact.city;
  }

  async function deleteContact(id) {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    const res = await fetch(`/contacts/${id}`, { method: "DELETE" });
  }
  fetchContacts();
