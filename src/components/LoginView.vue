<template>
    <div class="login">
        <h1>Login</h1>
        <GithubLogin />
    </div>
</template>

<script>
import GithubLogin from "@/components/GithubLogin.vue";

export default {
    name: "LoginView",
    components: {
        GithubLogin
    }
};
</script>

<style>
.login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
    text-align: center;
}

h1 {
    font-size: 48px;
    margin-bottom: 20px;
}
</style>