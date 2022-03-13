<template>
  <section class="main-section auth-section">
    <div class="container">
      <form action="" class="form-auth" @submit.prevent="login">
        <h1>Авторизация</h1>
        <label for="">
          Email
          <input id="login-email" v-model="form.email" type="text" placeholder="Введите email">
          <p v-if="!validations.email.valid" class="error-msg">{{ validations.email.message }}</p>
        </label>
        <label for="">
          Пароль
          <div>
            <input id="login-password" class="eye" v-model="form.password" :type="showPass ? 'text' : 'password'" placeholder="Введите пароль">
            <i @click="showPass = !showPass" :class="[showPass ? 'fas fa-eye' : 'fas fa-eye-slash' ]"></i>
          </div>
          <p v-if="!validations.password.valid" class="error-msg">{{ validations.password.message }}</p>
          <p v-if="!validations.invalidLogin.valid" class="error-msg">{{ validations.invalidLogin.message }}</p>
        </label>
        <button>Войти</button>
      </form>
    </div>
  </section>
</template>

<script>
    export default {
        middleware: 'guest',
        layout: 'App',
        data(){
            return {
                form: {
                    email: '',
                    password: ''
                },
                validations: {
                    email: {
                        valid: true,
                        message: ''
                    },
                    password: {
                        valid: true,
                        message: ''
                    },
                    invalidLogin: {
                        valid: true,
                        message: ''
                    }
                },
                showPass: false,
                errorMessage: ''
            }
        },
        methods: {
            validateLogin(){

                if( this.form.email == ''
                    || !this.form.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ){
                    this.validations.email.valid = false;
                    this.validations.email.message = 'Необходимо ввести корректныую электронную почту.'
                }else{
                    this.validations.email.valid = true;
                    this.validations.email.mesage = '';
                }
                if( this.form.password == ''){
                    this.validations.password.valid = false;
                    this.validations.password.message = 'Необходимо ввести пароль'
                }else{
                    this.validations.password.valid = true;
                    this.validations.password.message = '';
                }
                return (
                    this.validations.email.valid &&
                    this.validations.password.valid
                ) ? true : false;
            },
            async login(){
                if( this.validateLogin() ){
                    let email = document.getElementById('login-email').value;
                    let password = document.getElementById('login-password').value;

                    await this.$auth.loginWith( 'laravelSanctum', { data: {
                            email: email,
                            password: password
                        } } )
                        .then( function(){
                            this.$router.push({ path: '/' })
                        }.bind(this))
                        .catch( function( error ){
                            this.validations.invalidLogin.valid = false;
                            this.validations.invalidLogin.message = 'Неверные учетные данные, пожалуйста, повторите попытку!';
                            this.validations.email.valid = true;
                            this.validations.password.valid = true;
                        }.bind(this));
                }
            },
        }
    }
</script>

<style scoped>

</style>
