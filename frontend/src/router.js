import {Form} from "./components/form.js";
import {Main} from "./components/main.js";
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
                template: 'templates/main.html',
                load: () => {
                    new Main();

                }
            },
            {
                route: '#/signup',
                title: 'Создайте аккаунт',
                template: 'templates/register.html',
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход',
                template: 'templates/login.html',
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
                route: '#/expenses',
                title: 'Затраты',
                template: 'templates/expenses.html',
                load: () => {
                    new Expense();
                }
            }

        ]
    }

    // async openRoute() {
    //     const urlRoute = window.location.hash.split('?')[0];
    //     if (urlRoute === '#/logout') {
    //         await Auth.logout();
    //         window.location.href = '#/';
    //         return;
    //     }
    //
    //     const newRoute = this.routes.find(item => {
    //         return item.route === urlRoute;
    //     })
    //
    //     if(!newRoute) {
    //         window.location.href = '#/login';
    //         return
    //     }
    //
    //     this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
    //     this.titleElement.innerText = newRoute.title;
    //
    //     if(urlRoute === '#/login' || urlRoute === '#signup') {
    //         this.contentElement.classList.add('justify-content-center');
    //         this.contentElement.classList.add('auth-container');
    //     } else {
    //         const userInfo = Auth.getUserInfo();
    //         const accessToken = localStorage.getItem(Auth.accessTokenKey);
    //
    //         if (!userInfo && !accessToken) {
    //             this.profileElement.innerText = userInfo.name + '' + userInfo.lastName;
    //             // Load balance data
    //         } else {
    //             location.href = '#/login';
    //         }
    //     }
    //     console.log(this.contentElement);
    //
    //     newRoute.load();
    // }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (!newRoute) {
            window.location.href = '#/login';
            return;
        }

        this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
        this.titleElement.innerText = newRoute.title;

        if (urlRoute === '#/login' || urlRoute === '#/signup') {
            this.contentElement.className = 'd-flex justify-content-center auth-container';
        } else {
            this.contentElement.className = ''; // Clear previous class if any
        }

        newRoute.load();
    }

}