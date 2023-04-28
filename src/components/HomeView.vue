<template>
    <div class="home">
        <h1>Welcome to my Grow2Learn!</h1>
        <p>Click here to  <router-link to="/login"  ><strong>Login</strong></router-link></p>
        <ul>
        </ul>
    </div>
</template>

<script>
export default {
    name: "HomeView"
};
</script>

<style>
.home {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
    text-align: center;
}

h1 {
    font-size: 48px;
    margin-bottom: 20px;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
}

li {
    margin-bottom: 10px;
}</style>