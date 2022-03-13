<template>

</template>

<script>
    export default {
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
                }
            }
        },
        methods: {
            validateLogin(){
                if( this.form.email == ''
                    || !this.form.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ){
                    this.validations.email.valid = false;
                    this.validations.email.message = 'A valid email address has to be entered to register'
                }else{
                    this.validations.email.valid = true;
                    this.validations.email.mesage = '';
                }
                if( this.form.password == ''){
                    this.validations.password.valid = false;
                    this.validations.password.message = 'A password must be entered'
                }else{
                    this.validations.password.valid = true;
                    this.validations.password.message = '';
                }
                return (
                    this.validations.email.valid &&
                    this.validations.password.valid
                ) ? true : false;
            },
            login(){
                if( this.validateLogin() ){
                    let email = document.getElementById('login-email').value;
                    let password = document.getElementById('login-password').value;

                    this.$auth.loginWith( 'laravelSanctum', { data: {
                        email: email,
                        password: password
                    } } )
                    .then( function(){
                        // ... Handle successful login
                    }.bind(this))
                    .catch( function( error ){
                        // ... Display an unsuccessful login
                    }.bind(this));
                }
            },
        }
    }
</script>

<style scoped>

</style>
