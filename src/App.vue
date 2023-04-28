<template>
  <div>
    
    <div class="container">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <router-link to="/"  class="navbar-brand"><strong>Home</strong></router-link>
            
          </div>
        </div>
      </nav>
    </div>
    <router-view ></router-view>
  </div>
</template>

<script>


export default {
  data() {
    return {
      
    };
  }
 
}
</script>

