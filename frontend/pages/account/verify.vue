<template>

</template>

<script>
    export default {
        name: "verify",
        mounted(){
            if( this.$route.query.verify_url ){
                this.verifyEmail();
            }
        },
        methods: {
            async verifyEmail(){
                this.verifyingEmail = true;
                this.message = await this.$axios.post(this.
                    $route.query.verify_url);
                this.reloadUser();
            },
            async reloadUser(){
                await this.$auth.fetchUser();
                this.verifyingEmail = false;
            },
            async resendVerificationEmail(){
                await this.$axios.post('/api/v1/email/resend');
                this.emailResent = true;
            },
        }
    }
</script>

<style scoped>

</style>
