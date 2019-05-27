<template>
    <div class=" loginForm ">   
        <div class="flex-center py-5">
            <div>
                <form class="form-signin py-5 px-5 box-login-form" >
                    <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
                    <h1 class="h3 mb-4 font-weight-normal">Acessar a plataforma</h1>
                    <label for="inputEmail" class="sr-only">Email</label>
                    <input type="email" id="inputEmail" class="form-control my-2" placeholder="Email" required="" autofocus="">
                    <label for="inputPassword" class="sr-only">Senha</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Senha" required="">
                    <div class="checkbox my-3 text-left">
                        <label class="text-left">
                            <input type="checkbox"  value="remember-me"> Me lembrar
                        </label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Fazer login</button>
                    <router-link to="/register">
                        <button class="btn btn-lg btn-secondary btn-block" type="submit">Cadastre-se</button>
                    </router-link>
                </form>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style lang="scss">
.loginForm{
    
    /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
        .flex-center{
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e2e2e2 !important;
            height: 500px;
        }
    }
        /* iPads (portrait and landscape) ----------- */
    @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
        .flex-center{
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e2e2e2 !important;
            height: 700px;
        }
    }
        /* Desktops and laptops ----------- */
    @media only screen  and (min-width : 1224px) {
        .flex-center{
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e2e2e2 !important;
            height: 700px;
        }
    
    }

    .bg-main{
        background-color: #e2e2e2 !important;
    }
    .box-login-form{
        background-color: white !important;
    }
}
</style>
