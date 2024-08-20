const btn = document.getElementById("btn");
const name = document.getElementById("name")
const email = document.getElementById("email");
const contactList = document.getElementById("contact-list");


btn.addEventListener("click", function (e) {
    e.preventDefault()
    isValid = form.checkValidity()
    if (isValid) {
        createContact()
        name.value = "";
        email.value = ""
    } else {
        console.log("write properly")
    }



})

function createContact() {
    const plate = document.createElement("div");
    plate.setAttribute("id", "contact");
    plate.innerHTML = ` <p id="nameDisplay">${name.value}</p>
    <p id="emaildisplay">${email.value}</p>
    <button id="delete" onclick="remove(this)">Delete</button>`
    contactList.appendChild(plate)

}

function remove(contact) {
    var element = contact;
    element.parentElement.remove()
}