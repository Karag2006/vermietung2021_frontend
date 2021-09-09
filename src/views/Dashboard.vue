<template>
    <div>
        Dashboard
        {{
            $store.state.auth.user.username
                ? $store.state.auth.user.username
                : ""
        }}<br />
        Token expires at :
        {{ new Date($store.state.auth.user.decode.exp * 1000) }}

        <v-btn
            color="primary"
            dark
            elevation="2"
            @click="$store.dispatch('getNavMenu')"
        >
            <v-icon dark class="mr-2">
                fas fa-user
            </v-icon>
            {{ $store.state.auth.user.username }}
        </v-btn>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
