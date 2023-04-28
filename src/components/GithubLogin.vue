<template>
    <div class="github-login">
        <button @click="login">Login with GitHub</button>
    </div>
</template>

<script>
export default {
    name: "GithubLogin",
    methods: {
        login() {
            const clientId = process.env.VUE_APP_GITHUB_CLIENT_ID;
            const redirectUri = "http://localhost:8080/login/callback";
            const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
            window.location.href = url;
        }
    }
};
</script>

<style>
.github-login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
    text-align: center;
}

button {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
}

button:hover {
    background-color: #0062cc;
}
</style>