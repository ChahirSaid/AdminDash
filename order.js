// Select necessary HTML elements
const form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    productName = document.getElementById("name"),
    customer = document.getElementById("city"),
    price = document.getElementById("age"),
    status = document.getElementById("status"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser"),
    submitBtn = document.querySelector(".submit");

// Retrieve data from localStorage or initialize an empty array
let getData = localStorage.getItem("orderData")
  ? JSON.parse(localStorage.getItem("orderData"))
  : [];

let isEdit = false, editId;
showInfo();

// Event listeners for form actions and button clicks
newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Fill the Form";
    isEdit = false;
    imgInput.src = "./image/Profile Icon.webp";
    form.reset();
});

file.onchange = function() {
    if (file.files[0].size < 1000000000000) {  // 1MB = 1000000
        let fileReader = new FileReader();

        fileReader.onload = function(e) {
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        };

        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("This file is too large!");
    }
};

function showInfo() {
    document.querySelectorAll('.productDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {
        let createElement = `<tr class="productDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.productName}</td>
            <td>${element.customer}</td>
            <td>${element.status}</td>
            <td>${element.price}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.productName}', '${element.customer}', '${element.price}', '${element.status}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.productName}', '${element.customer}', '${element.price}', '${element.status}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

        userInfo.innerHTML += createElement;
    });
}

function readInfo(pic, name, customer, price, status) {
    document.querySelector('.showImg').src = pic;
    document.querySelector('#showProduct').value = name;
    document.querySelector("#showCustomer").value = customer;
    document.querySelector("#showPrice").value = price;
    document.querySelector("#showStatus").value = status;
}

function editInfo(index, pic, name, customerVal, priceVal, statusVal) {
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    productName.value = name;
    customer.value = customerVal;
    price.value = priceVal;
    status.value = statusVal;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update Product";
}

function deleteInfo(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        getData.splice(index, 1);
        localStorage.setItem("orderData", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        picture: imgInput.src || "./image/Profile Icon.webp",
        productName: productName.value,
        customer: customer.value,
        price: price.value,
        status: status.value
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('orderData', JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Fill The Form";

    showInfo();

    form.reset();

    imgInput.src = "./image/Profile Icon.webp";
});
