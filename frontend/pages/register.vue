<template>
  <section class="main-section auth-section">
    <div class="container">
      <form action="" class="form-auth" @submit.prevent="register">
        <h1>Регистрация</h1>
        <label for="">
          <p>Имя</p>
          <input type="text" v-model="form.name" placeholder="Введите имя">
          <p class="error-msg">{{ validations.name.message }}</p>
        </label>
        <label for="">
          Email
          <input type="text" v-model="form.email" placeholder="Введите email">
          <p class="error-msg">{{ validations.email.message }}</p>
        </label>
        <label for="">
          Пароль
          <div>
            <input class="eye" v-model="form.password" :type="showPass ? 'text' : 'password'" placeholder="Введите пароль">
            <i @click="showPass = !showPass" :class="[showPass ? 'fas fa-eye' : 'fas fa-eye-slash' ]"></i>
          </div>
          <Meter :value="passwordStrength"></Meter>
          <p class="error-msg">{{ validations.password.message }}</p>
        </label>
        <label for="">
          Повторите пароль
          <div>
            <input class="eye" v-model="form.confirm_password" :type="showPass ? 'text' : 'password'" placeholder="Введите пароль повторно">

          </div>
          <p class="error-msg">{{ validations.confirm_password.message }}</p>
        </label>
        <button>Зарегистрироваться</button>
      </form>
    </div>
  </section>
</template>

<script>
    import zxcvbn from 'zxcvbn'
    import Meter from "../components/Meter";

    export default {
        middleware: 'guest',
        layout: 'App',
        data(){
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: ''
                },
                validations: {
                    name: {
                        valid: true,
                        message: ''
                    },
                    email: {
                        valid: true,
                        message: ''
                    },
                    password: {
                        valid: true,
                        message: ''
                    },
                    confirm_password: {
                        valid: true,
                        message: ''
                    }
                },
                showPass: false
            }
        },
        computed: {
            passwordStrength () {
                return zxcvbn(this.form.password).score
            },
        },
        methods: {
            validateRegistration() {
                if( this.form.name == '' ){
                    this.validations.name.valid = false;
                    this.validations.name.message = 'В этом поле необходимо указать имя.'
                }else{
                    this.validations.name.valid = true;
                    this.validations.name.message = '';
                }
                if( this.form.email == ''
                    || !this.form.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ){
                    this.validations.email.valid = false;
                    this.validations.email.message = 'Необходимо ввести корректныую электронную почту.'
                }else{
                    this.validations.email.valid = true;
                    this.validations.email.message = '';
                }
                if( this.form.password == ''|| this.passwordStrength < 4 ){
                    this.validations.password.valid = false;
                    this.validations.password.message = 'Необходимо ввести надежный пароль.'
                }else{
                    this.validations.password.valid = true;
                    this.validations.password.message = '';
                }
                if( this.form.confirm_password == '' || this.form.confirm_password != this.form.password ){
                    this.validations.confirm_password.valid =
                        false;
                    this.validations.confirm_password.message =
                        'Ваши пароли должны совпадать для регистрации.';
                }else{
                    this.validations.confirm_password.valid = true;
                    this.validations.confirm_password.message = '';
                }

                return (
                    this.validations.name.valid &&
                    this.validations.email.valid &&
                    this.validations.password.valid &&
                    this.validations.confirm_password.valid
                ) ? true : false;
            },
            // kirill.bielousov15151515@gmail.com
            //     3792016zxcsdfert
            register() {
                if( this.validateRegistration() ){

                    this.$axios.get('/sanctum/csrf-cookie')
                        .then( function(){
                            this.$axios.post('/register', this.form )
                                .then(function( response ){
                                    this.$auth.loginWith( 'laravelSanctum', { data: this.form } )
                                        .then( function(){
                                            this.$router.push({ path: '/' })
                                        }.bind(this));
                                }.bind(this))
                                .catch( function( error ){
                                    // ... Handle failure and show validation messages
                                }.bind(this));
                        }.bind(this));
                }
            },
        },
        global: {
            Meter
        }
    }
</script>

<style scoped>

</style>
