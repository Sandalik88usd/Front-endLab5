
const tableContainer = document.getElementById('colorTable');
const variant = 17;
const selectedColor = "red";

for (let i = 1; i <= 6; i++) {
    const row = document.createElement('tr');
    for (let j = 1; j <= 6; j++) {
        const cell = document.createElement('td');
        const number = (i - 1) * 6 + j;
        cell.textContent = number;
        cell.dataset.number = number;


        cell.addEventListener('mouseover', function () {
            if (number === variant) {
                cell.style.backgroundColor = getRandomColor();
            }
        });

        cell.addEventListener('click', function () {
            const colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.style.position = 'absolute';
            colorInput.style.opacity = 0;
            document.body.appendChild(colorInput);
        
            colorInput.addEventListener('input', function () {
                cell.style.backgroundColor = colorInput.value;
                document.body.removeChild(colorInput); 
            });
        
            colorInput.click();
        });

        cell.addEventListener('dblclick', function () {
            if (number === variant) {
                const columnIndex = cell.cellIndex;
                const rows = tableContainer.rows;
                for (let k = 0; k < rows.length; k++) {
                    rows[k].cells[columnIndex].style.backgroundColor = selectedColor;
                }
            }
        });

        row.appendChild(cell);
    }
    tableContainer.appendChild(row);
}

function validateForm() {
    const pib = document.getElementById('pib').value;
    const group = document.getElementById('group').value;
    const variant = document.getElementById('variant').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const pibRegex = /^[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/;
    const groupRegex = /^[A-ZА-ЯІЇЄҐ]{2}-\d{2}$/;
    const phoneRegex = /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true;
    let output = '';

    if (!pibRegex.test(pib)) {
        isValid = false;
        output += 'Некоректне ПІБ<br>';
    }
    if (!groupRegex.test(group)) {
        isValid = false;
        output += 'Некоректна група<br>';
    }
    if (!phoneRegex.test(phone)) {
        isValid = false;
        output += 'Некоректний телефон<br>';
    }
    if (!emailRegex.test(email)) {
        isValid = false;
        output += 'Некоректна пошта<br>';
    }

    const outputDiv = document.getElementById('output');
    if (isValid) {
        outputDiv.innerHTML = `<p>Успішно введено!</p>
        <p>ПІБ: ${pib}</p>
        <p>Група: ${group}</p>
        <p>Варіант: ${variant}</p>
        <p>Телефон: ${phone}</p>
        <p>Пошта: ${email}</p>`;
        outputDiv.style.color = "green";
    } else {
        outputDiv.innerHTML = output;
        outputDiv.style.color = "red";
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
