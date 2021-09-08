<template>
  <div>
    Dashboard {{$store.state.auth.user.username ? $store.state.auth.user.username : ''}}<br>
    Token expires at : {{new Date($store.state.auth.user.decode.exp * 1000)}}
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>