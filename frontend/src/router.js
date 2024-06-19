import {Form} from "./components/form.js";
import {Chart} from "./components/chart.js";
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
                template: 'templates/index.html',
                load: () => {

                }
            },
            {
                route: '#/signup',
                title: 'Создайте аккаунт',
                template: 'templates/register.html',
                style: 'styles/bootstrap.min.css',
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход',
                template: 'templates/login.html',
                style: 'styles/bootstrap.min.css',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/incomes',
                title: 'Прибыли',
                template: 'templates/incomes.html',
                load: () => {
                    new Income();
                }
            },
            {
                route: '#/chart',
                title: 'Затраты',
                template: 'templates/expenses.html',
                load: () => {
                    new Chart();
                }
            },
            {
                route: '#/create-income',
                title: 'Создание Прибыли',
                template: 'templates/create_income.html',
                load: () => {
                    new Chart();
                }
            },
            {
                route: '#/create-expense',
                title: 'Создание Затраты',
                template: 'templates/create_expense.html',
                load: () => {
                    new CreateExpense();
                }
            },
            {
                route: '#/edit-income',
                title: 'Изменение Прибыли',
                template: 'templates/edit_income.html',
                load: () => {
                    new EditIncome();
                }
            },
            {
                route: '#/edit-expense',
                title: 'Изменение Затраты',
                template: 'templates/edit_expense.html',
                load: () => {
                    new EditExpense();
                }
            },
            {
                route: '#/income&expense',
                title: 'Общие Прибыли и Затраты',
                template: 'templates/income&expense.html',
                load: () => {
                    new Income&Expense();
                }
            },
            {
                route: '#/create-income&expense',
                title: 'Создание Прибыли & Затраты',
                template: 'templates/create_income&expense.html',
                load: () => {
                    new CreateIncome&Expense();
                }
            },
            {
                route: '#/edit-income&expense',
                title: 'Изменение Прибыли & Затраты',
                template: 'templates/edit_income&expense.html',
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