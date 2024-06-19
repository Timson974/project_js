document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fullName = this.fullName.value;
    const email = this.email.value;
    const password = this.password.value;
    const confirmPassword = this.confirmPassword.value; // Используйте правильный id
    // Валидация полей
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }
    // Отправка данных на сервер
    // ...
});

// Псевдокод для обработчиков событий
document.addEventListener('DOMContentLoaded', () => {
});

document.getElementById('validationCustomUsername').addEventListener('input', function(event) {
    if (!event.target.value) { // Простая проверка, можно добавить регулярные выражения
        event.target.style.borderColor = 'red';
    } else {
        event.target.style.borderColor = 'initial';
    }
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/login', function(req, res) {
    const { email, password } = req.body;
    // Здесь должна быть логика авторизации
    res.send({ status: 'success' });
});

app.post('/register', function(req, res) {
    const { email, password } = req.body;
    // Здесь должна быть логика регистрации
    res.send({ status: 'success' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
