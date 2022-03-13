<template>

</template>

<script>
    export default {
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
                }
            }
        },
        methods: {
            validateRegistration() {
                if( this.form.name == '' ){
                    this.validations.name.valid = false;
                    this.validations.name.message = 'A name is required on this field'
                }else{
                    this.validations.name.valid = true;
                    this.validations.name.message = '';
                }
                if( this.form.email == ''
                    || !this.form.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ){
                this.validations.email.valid = false;
                this.validations.email.message = 'A valid email address has to be entered to register'
                }else{
                    this.validations.email.valid = true;
                    this.validations.email.message = '';
                }
                if( this.form.password == ''|| this.passwordStrength.score < 4 ){
                    this.validations.password.valid = false;
                    this.validations.password.message = 'A secure password must be entered.'
                }else{
                    this.validations.password.valid = true;
                    this.validations.password.message = '';
                }
                if( this.form.confirm_password == ''
                    || this.form.confirm_password !=
                    this.form.password ){
                    this.validations.confirm_password.valid =
                        false;
                    this.validations.confirm_password.message =
                        'Your passwords must match to register';
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
            register() {
                if( this.validateRegistration() ){
                    this.$axios.get('/sanctum/csrf-cookie')
                        .then( function(){
                            this.$axios.post('/register', this.form )
                                .then(function( response ){
                                    this.$auth.loginWith( 'laravelSanctum', { data: this.form } )
                                        .then( function(){
                                            // ... Handle success
                                        }.bind(this));
                                }.bind(this))
                                .catch( function( error ){
                                    // ... Handle failure and show validation messages
                                }.bind(this));
                        }.bind(this));
                }
            },
        }
    }
</script>

<style scoped>

</style>
