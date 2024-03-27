var form = document.getElementById("myForm"),
imgInput = document.querySelector(".img"),
file = document.getElementById("imgInput"),
userName = document.getElementById("name"),
age = document.getElementById("age"),
city = document.getElementById("city"),
email = document.getElementById("email"),
phone = document.getElementById("phone"),
submitBtn = document.querySelector(".submit"),
userInfo = document.getElementById("data"),
modal = document.getElementById("userForm"),
modalTitle = document.querySelector("#userForm .modal-title"),
newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('customerData') ? JSON.parse(localStorage.getItem('customerData')) : [];

let isEdit = false, editId;

showInfo();

newUserBtn.addEventListener('click', () => {
submitBtn.innerText = 'Submit';
modalTitle.innerText = "Fill the Form";
isEdit = false;
imgInput.src = "./image/Profile Icon.webp";
form.reset();
});

file.onchange = function () {
if (file.files[0].size < 1000000000000) { // 1MB = 1000000
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
        imgUrl = e.target.result;
        imgInput.src = imgUrl;
    };

    fileReader.readAsDataURL(file.files[0]);
} else {
    alert("This file is too large!");
}
};

function showInfo() {
document.querySelectorAll('.customerDetails').forEach(info => info.remove());
getData.forEach((element, index) => {
    let createElement = `<tr class="customerDetails">
        <td>${index + 1}</td>
        <td><img src="${element.picture}" alt="" width="50" height="50"></td>
        <td>${element.customerName}</td>
        <td>${element.customerAge}</td>
        <td>${element.customerCity}</td>
        <td>${element.customerEmail}</td>
        <td>${element.customerPhone}</td>
        <td>
            <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.customerName}', '${element.customerAge}', '${element.customerCity}', '${element.customerEmail}', '${element.customerPhone}', '${element.customerPost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
            <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.customerName}', '${element.customerAge}', '${element.customerCity}', '${element.customerEmail}', '${element.customerPhone}', '${element.customerPost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
        </td>
    </tr>`;

    userInfo.innerHTML += createElement;
});
}

function readInfo(pic, name, age, city, email, phone) {
document.querySelector('.showImg').src = pic;
document.querySelector('#showName').value = name;
document.querySelector("#showAge").value = age;
document.querySelector("#showCity").value = city;
document.querySelector("#showEmail").value = email;
document.querySelector("#showPhone").value = phone;
}

function editInfo(index, pic, name, Age, City, Email, Phone) {
isEdit = true;
editId = index;
imgInput.src = pic;
userName.value = name;
age.value = Age;
city.value = City;
email.value = Email;
phone.value = Phone;

submitBtn.innerText = "Update";
modalTitle.innerText = "Update";
}

function deleteInfo(index) {
if (confirm("Are you sure want to delete?")) {
    getData.splice(index, 1);
    localStorage.setItem("customerData", JSON.stringify(getData));
    showInfo();
}
}

form.addEventListener('submit', (e) => {
e.preventDefault();

const information = {
    picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
    customerName: userName.value,
    customerAge: age.value,
    customerCity: city.value,
    customerEmail: email.value,
    customerPhone: phone.value,
};

if (!isEdit) {
    getData.push(information);
} else {
    isEdit = false;
    getData[editId] = information;
}

localStorage.setItem('customerData', JSON.stringify(getData));

submitBtn.innerText = "Submit";
modalTitle.innerHTML = "Fill The Form";

showInfo();

form.reset();

imgInput.src = "./image/Profile Icon.webp";
});