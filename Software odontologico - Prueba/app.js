var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    lastname = document.getElementById("lastname"),
    date = document.getElementById("date"),
    time = document.getElementById("time"),
    treatment = document.getElementById("treatment"),
    doctor = document.getElementById("doctor"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Crear',
        modalTitle.innerText = "Crear nueva cita"
    isEdit = false
    form.reset()
})



function showInfo() {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeLastname}</td>
            <td>${element.employeeDate}</td>
            <td>${element.employeeTime}</td>
            <td>${element.employeeTreatment}</td>
            <td>${element.employeeDoctor}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.employeeName}', '${element.employeeLastname}', '${element.employeeDate}', '${element.employeeTime}', '${element.employeeTreatment}', '${element.employeeDoctor}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.employeeName}', '${element.employeeLastname}', '${element.employeeDate}', '${element.employeeTime}', '${element.employeeTreatment}', '${element.employeeDoctor}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(name, lastname, date, time, treatment, doctor) {
    document.querySelector('#showName').value = name,
        document.querySelector("#showLastname").value = lastname,
        document.querySelector("#showDate").value = date,
        document.querySelector("#showTime").value = time,
        document.querySelector("#showTreatment").value = treatment,
        document.querySelector("#showsDoctor").value = doctor
}


function editInfo(index, name, Lastname, Date, Time, Treatment, Doctor) {
    isEdit = true
    editId = index
    userName.value = name
    lastname.value = Lastname
    date.value = Date,
        time.value = Time,
        treatment.value = Treatment,
        doctor.value = Doctor

    submitBtn.innerText = "Actualizar"
    modalTitle.innerText = "Actualizar cita"
}


function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const information = {
        employeeName: userName.value,
        employeeLastname: lastname.value,
        employeeDate: date.value,
        employeeTime: time.value,
        employeeTreatment: treatment.value,
        employeeDoctor: doctor.value
    }

    if (!isEdit) {
        getData.push(information)
    }
    else {
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Registrar"

    showInfo()

    form.reset()

    alert("Exito")
    modal.style.display = "none"
    document.querySelector(".modal-backdrop").remove()
})