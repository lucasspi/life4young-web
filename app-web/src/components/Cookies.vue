<template>
  <div class="cookies-page">
    <hero-section set-classes="is-primary is-bold">
      <div class="container">
        <h1 class="title">
          Política de cookies
        </h1>
      </div>
    </hero-section>
    <div class="container">
      <div class="content">
        <h2>O que são cookies?</h2>
        <p class="c2"><span class="c6">Um&nbsp;cookie&nbsp;é um pequeno ficheiro de texto que um sítio Web instala no seu computador ou dispositivo móvel quando o visita. Estes ficheiros permitem que durante um certo período de tempo o Website se «lembre» das suas ações e preferências, nomeadamente do nome de utilizador, da língua escolhida, do tamanho dos carateres e de outras definições de visualização. É por isso que quando percorre as páginas de um sítio ou regressa a um sítio que já visitou não tem, em princípio, de voltar a indicar as suas preferências quando regressa a um sítio.</span></p>
        <p class="c1"><span class="c6"></span></p>
        <h2>Como utilizamos os cookies?</h2>
        <p class="c9"><span class="c6">Utilizamos&nbsp;cookies&nbsp;para registar:</span></p>
        <ul class="c3 lst-kix_list_2-0 start">
          <li class="c5"><span class="c6">as suas preferências em termos de visualização, tais como parâmetros relativos ao contraste e à cor ou ao tamanho dos carateres; &nbsp;</span></li>
          <li class="c5"><span class="c6">se já respondeu a um inquérito numa janela instantânea em que lhe é perguntado se acha útil ou não o conteúdo da página em questão (para que o mesmo deixe de aparecer se já respondeu);</span></li>
          <li class="c9 c10"><span class="c6">se deu ou não o seu acordo quanto à instalação de cookies.</span></li>
        </ul>
        <p class="c9"><span class="c6">Além disso, alguns vídeos inseridos nas nossas páginas utilizam um&nbsp;cookie&nbsp;para recolher estatísticas anónimas sobre a forma como as pessoas chegaram até eles e que vídeos viram.</span></p>
        <p class="c9"><span class="c6">Os cookies são igualmente guardados por um serviço de “Analytics”&nbsp;que mede a eficácia e eficiência do nosso sítio e todos os seus domínios.</span></p>
        <p class="c2"><span class="c6">A ativação dos&nbsp;cookies&nbsp;não é indispensável para que um sítio Web funcione, mas facilita a navegação. Os cookies&nbsp;podem ser apagados ou bloqueados, mas se o fizer poderá desativar algumas funcionalidades do sítio.</span></p>
        <p class="c2"><span class="c12">As informações associadas aos&nbsp;cookies&nbsp;</span><span class="c11">não são utilizadas para identificar pessoalmente</span><span class="c6">&nbsp;os utilizadores e a Social Guider tem controlo sobre os dados recolhidos. A Social Guider só usa&nbsp;cookies&nbsp;para os fins referidos.</span></p>
        <h2>Utilizamos outros cookies?</h2>
        <p class="c2"><span class="c6">Algumas das nossas páginas domínios podem utilizar outros&nbsp;cookies&nbsp;diferentes dos acima descritos. Nesse caso, a área específica sobre&nbsp;cookies&nbsp;da página de advertência conterá informações pormenorizadas sobre os mesmos, podendo ser solicitado o seu acordo para que possam ser instalados.</span></p>
        <h2>Como controlar os cookies</h2>
        <p class="c2"><span class="c12">Pode&nbsp;</span><span class="c11">controlar e/ou apagar</span><span class="c12">&nbsp;os&nbsp;cookies&nbsp;que desejar. Para mais informações, consulte&nbsp;</span><span class="c12 c17"><a class="c8" href="https://www.google.com/url?q=http://www.aboutcookies.org/&amp;sa=D&amp;ust=1523407864763000">aboutcookies.org</a></span><span class="c6">. Pode apagar todos os&nbsp;cookies&nbsp;já instalados no seu computador ou dispositivo móvel ou ativar uma opção disponível na maioria dos programas de navegação que impede a sua instalação. Mas se o fizer, poderá ter de configurar manualmente algumas preferências sempre que visitar um sítio e corre o risco de desativar determinados serviços e funcionalidades.</span></p>
      </div>
    </div>
  </div>
</template>


<script>
import HeroSection from './HeroSection.vue'
export default {
  components: {HeroSection},

  data() {
    return {};
  }
};
</script>

<style lang="scss">
  .cookies-page {
    .content {
      &, h2 {
        color: rgb(109, 109, 109);
      }
    }
  }
</style>
