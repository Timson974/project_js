import {CustomHttp} from "../services/custom-http.js";
import {Auth} from "../services/auth.js";
import config from "../../config/config.js";

export class Form {
    constructor(page) {
        this.rememberMe = null;
        this.processElement = null;
        this.page = page;

        this.fields = [

            // {
            //     name: 'name',
            //     id: 'name',
            //     element: null,
            //     regex: /^[А-Я][а-я]+(\s[А-Я][а-я]+)?$/,
            //     valid: false
            // },

            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false
            },
        ];

        if (this.page === 'signup') {
            this.fields.unshift({
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/,
                    valid: false
                },
                {
                    name: 'repeatPassword',
                    id: 'repeatPassword',
                    element: null,
                    regex: null,
                    valid: false
                })
        }


        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            // console.log(item.name, item.element);
            item.element.onchange = function () {
                that.validateField.call(that, item, this)
            }
        })

        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm()
        }

        if (this.page === 'login') {
            this.rememberMe = document.getElementById('agree');
            this.rememberMe.onchange = function () {
                that.validateForm()
            }
        }
    }

    // validateField(field, element) {
    //     if (!element.value || !element.value.match(field.regex)) {
    //         element.parentNode.style.borderColor = 'red';
    //         field.valid = false;
    //     } else {
    //         element.parentNode.removeAttribute('style');
    //         field.valid = true;
    //     }
    //     this.validateForm()
    // }

    validateField(field) {
        const value = field.element.value;
        if (!value || !value.match(field.regex)) {
            field.element.parentNode.style.borderColor = 'red';
            field.valid = false;
        } else {
            // field.element.parentNode.style.borderColor = ''; // or use removeAttribute('style')
            field.element.parentNode.removeAttribute('style');

            field.valid = true;
            console.log(field.name + " is valid"); // Добавьте эту строку для отладки
        }
        this.validateForm();
    }

    // validateField(field) {
    //     const value = field.element.value;
    //     if (field.name === 'repeatPassword') {
    //         const passwordValue = this.fields.find(f => f.name === 'password').element.value;
    //         if (value !== passwordValue) {
    //             field.element.parentNode.style.borderColor = 'red';
    //             field.valid = false;
    //         } else {
    //             field.element.parentNode.removeAttribute('style');
    //             field.valid = true;
    //         }
    //     } else if (!value || !value.match(field.regex)) {
    //         field.element.parentNode.style.borderColor = 'red';
    //         field.valid = false;
    //     } else {
    //         field.element.parentNode.removeAttribute('style');
    //         field.valid = true;
    //     }
    //     console.log(field.name + " is valid:", field.valid); // Для отладки
    //     this.validateForm();
    // }



    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.rememberMe ? this.rememberMe.checked && validForm : validForm;
        if (isValid) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled')
        }

        console.log(this.fields)
        console.log(isValid)
        return isValid
    }

    // validateForm() {
    //     const validForm = this.fields.every(item => item.valid);
    //     this.processElement.disabled = !validForm;
    //     console.log("All fields valid:", validForm);
    //     return validForm;
    // }


    async processForm() {
        if (this.validateForm()) {
            const email = this.fields.find(item => item.name === 'email').element.value;
            const password = this.fields.find(item => item.name === 'password').element.value;
            const [name, lastName] = this.fields.find(item => item.name === 'name').element.value.split('.');

            if (this.page === 'signup') {
                try {
                    const result = await CustomHttp.request(config.host + '/signup', 'POST', {
                        name: name,
                        lastName: lastName,
                        email: email,
                        password: password,
                        passwordRepeat: this.fields.find(item => item.name === repeatPassword).element.value
                    })

                    if (result) {
                        if (result.error || !result.user) {
                            throw new Error(result.message);
                        }
                    }
                } catch (error) {
                    return console.log(error)
                }

            }
            try {
                const result = await CustomHttp.request(config.host + '/login', 'POST', {
                    email: email,
                    password: password,
                })

                if (result) {
                    if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
                        throw new Error(result.message);
                    }

                    Auth.setTokens(result.accessToken, result.refreshToken);
                    Auth.setUserInfo({
                        fullName: result.fullName,
                        userId: result.userId,
                        email: email
                    })
                    location.href = '#/';
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    // async processForm() {
    //     if (this.validateForm()) {
    //         const email = this.fields.find(item => item.name === 'email').element.value;
    //         const password = this.fields.find(item => item.name === 'password').element.value;
    //         const name = this.fields.find(item => item.name === 'name').element.value;
    //
    //         try {
    //             const result = await CustomHttp.request(config.host + '/signup', 'POST', {
    //                 name: name,
    //                 email: email,
    //                 password: password,
    //                 passwordRepeat: this.fields.find(item => item.name === 'repeatPassword').element.value
    //             });
    //
    //             if (result && !result.error) {
    //                 Auth.setTokens(result.accessToken, result.refreshToken);
    //                 Auth.setUserInfo({
    //                     fullName: result.fullName,
    //                     userId: result.userId,
    //                     email: email
    //                 });
    //                 window.location.href = '/main.html'; // Убедитесь, что путь корректен
    //             } else {
    //                 throw new Error(result.message);
    //             }
    //         } catch (error) {
    //             console.error("Registration error:", error);
    //         }
    //     }
    // }

}


