<template>
    <div class="mainNavBar d-flex flex-column flex-md-row align-items-center p-3 px-md-4  bg-white border-bottom shadow-sm">
        <img class="my-2 mr-md-auto" width="250"  src="../../assets/imgs/logo-text.png">
        <nav class="my-2 my-md-0 mr-md-4">
            <router-link class="nonUnderline" to="/">
                <a class=" navNormalBtn">HOME</a>
            </router-link>
            <router-link class="nonUnderline" to="/downloads">
                <a class=" navNormalBtn">SOBRE O L4Y</a>
            </router-link>
            <router-link class="nonUnderline" to="/login">
                <a class="navNormalBtn">LOGIN</a>
            </router-link>
        </nav>
        <router-link class="nonUnderline" to="/login">
            <button class="manageEvent">ORGANIZAR UM EVENTO<font-awesome-icon icon="rocket" /></button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style lang="scss">
.mainNavBar{
    .navNormalBtn{
        color: #224189 !important;
        transition: 0.3s;
        font-weight: 500;
        padding: 0 15px;
        font-size: 17px;
    }
    .navNormalBtn:hover{
        color: #003089 !important;
    }
    .nonUnderline{
        text-decoration: none !important;
    }
    .manageEvent{
        padding: 15px;
        color: white;
        background-color: #224189;
        border-radius: 100px;
        transition: 0.3s;
    }
    .manageEvent:hover{
        background-color: #003089;
    }

}


</style>
