import {Form} from "./components/form.js";
import {Choice} from "./components/choice.js";
import {Test} from "./components/test.js";
import {Result} from "./components/result.js";
import {RightAnswers} from "./components/right-answers.js";
import {Auth} from "./services/auth.js";

export class Router {
    constructor() {

        this.contentElement = document.getElementById('content');
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('page-title');
        this.profileElement = document.getElementById('profile');
        this.profileFullNameElement = document.getElementById('profile-full-name');

        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'index.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/register',
                title: 'Регистрация',
                template: 'templates/register.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('register');
                }
            },
            {
                route: '#/login',
                title: 'Вход в систему',
                template: 'templates/login.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/incomes',
                title: 'Прибыли',
                template: 'templates/incomes.html',
                styles: 'styles/style.css',
                load: () => {
                    new Income();
                }
            },
            {
                route: '#/expenses',
                title: 'Затраты',
                template: 'templates/expenses.html',
                styles: 'styles/test.css',
                load: () => {
                    new Expense();
                }
            },
            {
                route: '#/create-income',
                title: 'Создание Прибыли',
                template: 'templates/create_income.html',
                styles: 'styles/style.css',
                load: () => {
                    new CreateIncome();
                }
            },
            {
                route: '#/create-expense',
                title: 'Создание Затраты',
                template: 'templates/create_expense.html',
                styles: 'styles/style.css',
                load: () => {
                    new CreateExpense();
                }
            },
            {
                route: '#/edit-income',
                title: 'Изменение Прибыли',
                template: 'templates/edit_income.html',
                styles: 'styles/style.css',
                load: () => {
                    new EditIncome();
                }
            },
            {
                route: '#/edit-expense',
                title: 'Изменение Затраты',
                template: 'templates/edit_expense.html',
                styles: 'styles/style.css',
                load: () => {
                    new EditExpense();
                }
            },
            {
                route: '#/income&expense',
                title: 'Общие Прибыли и Затраты',
                template: 'templates/income&expense.html',
                styles: 'styles/style.css',
                load: () => {
                    new Income&Expense();
                }
            },
            {
                route: '#/create-income&expense',
                title: 'Создание Прибыли & Затраты',
                template: 'templates/create_income&expense.html',
                styles: 'styles/style.css',
                load: () => {
                    new CreateIncome&Expense();
                }
            },
            {
                route: '#/edit-income&expense',
                title: 'Изменение Прибыли & Затраты',
                template: 'templates/edit_income&expense.html',
                styles: 'styles/style.css',
                load: () => {
                    new EditIncome&Expense();
                }
            }

        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];
        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = '#/';
            return;
        }

        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        })

        if(!newRoute) {
            window.location.href = '#/';
            return
        }
        this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
        this.stylesElement.setAttribute('href', newRoute.styles);
        this.titleElement.innerText = newRoute.title;

        const userInfo = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (userInfo && accessToken) {
            this.profileElement.style.display = 'flex';
            this.profileFullNameElement.innerText = userInfo.fullName;
        } else {
            this.profileElement.style.display = 'none';
        }
        newRoute.load();
    }
}