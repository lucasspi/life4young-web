<template>
  <div class="eventManager" >
    <section class="section">
      <div id="app" class="container accordion ">
        <accordion  title="Lista de líderes de jovens convidados ">
          <table style="width:100%" class="is-multiline">
            <tr>
              <th>Nº</th>
              <th>Nome</th>
              <th>Igreja</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
            <tr class="is-vcentered ">
              <td><input class="td_class_number" type="text" placeholder="">1</td>
              <td><input class="td_class" type="text" placeholder="Nome do participante"></td>
              <td><input class="td_class" type="text" placeholder="Igreja do participante"></td>
              <td><input class="td_class" type="date"></td>
              <td>
                <select class="td_class_select" name="status">
                  <option value="Convidado">Convidado</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="Presente">Presente</option>
                </select>
              </td>
            </tr>
            <tr class="is-vcentered ">
              <td><input class="td_class_number" type="text" placeholder="">2</td>
              <td><input class="td_class" type="text" placeholder="Nome do participante"></td>
              <td><input class="td_class" type="text" placeholder="Igreja do participante"></td>
              <td><input class="td_class" type="date"></td>
              <td>
                <select class="td_class_select" name="status">
                  <option value="Convidado">Convidado</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="Presente">Presente</option>
                </select>
              </td>
            </tr>
          </table>
    <div class="_quiz-send">
      <button class="vds-button vds-button--primary" type="button">
          <span class="vds-button__content">Adicionar +</span>
      </button>
    </div>
        </accordion>

      </div>
    </section>
  </div>
</template>

<script>
var accordion = {
  props: [
    'title'
  ],
  data() {
    return {
      active: false,
    }
  },
  template: `
            <div class="" style="padding:20px; padding-bottom: 0px;">
              <div class="columns is-vcentered" style="margin-bottom: calc(1.5rem - 0.75rem); */">
                <div class="tab__header column is-9-desktop">
                    <a href="#" class="titleAccordion" @click.prevent="active = !active">
                        <strong>{{title}}</strong>
                    </a>
                </div>
                <div class="tab__header column is-2-desktop">
                  <a href="#" class="titleAccordion" @click.prevent="active = !active">
                    <strong>Conteúdo?</strong>
                  </a>
                </div>
                <div class="tab__header column is-1-desktop">
                  <a href="#" class="titleAccordion" @click.prevent="active = !active">
                    <span class="down-Arrow " v-show="!active">&#9660;</span>
                    <span class="up-Arrow" v-show="active">&#9650;</span>
                  </a>
                </div>
                </div>
                <div class="tab__content p-2" v-show="active"><slot /></div>
            </div>
`
}

export default {

  components: {
    accordion
  },
  data(){
    items = [1,2,3,4]
  }


}
</script>

<style lang='scss'>
.eventManager{

  .td_class_select {
    width: 120px;
    padding: 5px;
    line-height: 1.8;
    font-size: 13px;
    border-left: 1px solid #004288;
    margin-left: 10px;
    background: #eaeaea;
    border: 0px;
}
  tr.is-vcentered {
    background: aliceblue;
    border-bottom: 2px solid #fafafa;
  }
  td {
      
  }

  .vds-button--default, .vds-button--destructive, .vds-button--primary, .vds-button--secondary {
    box-shadow: 0 0 8px 0 rgba(17,22,26,.16), 0 4px 8px 0 rgba(17,22,26,.08), 0 8px 16px 0 rgba(17,22,26,.08);
}
.vds-button__content {
    width: 100%;
    height: 100%;
    display: flex;
    overflow-y: hidden;
    align-items: center;
    justify-content: center;
}
.vds-button {
    font-size: .8125rem;
    line-height: 1.5rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    height: 3rem;
    padding: 0 2rem;
    background: #004288;
    border: transparent;
    border-radius: .25rem;
    color: #fff;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    vertical-align: middle;
    transition: all .3s ease;
}
._quiz-send {
    margin-top: 20px;
    text-align: right;
}
  .accordion{
    box-shadow: 0 0 8px 0 rgba(17,22,26,.16), 0 4px 8px 0 rgba(17,22,26,.08), 0 8px 16px 0 rgba(17,22,26,.08);
    border: 1px solid #dbe2e8;

  }
  .box_defaut_shadow{
    box-shadow: 0 0 8px 0 rgba(17,22,26,.16), 0 4px 8px 0 rgba(17,22,26,.08), 0 8px 16px 0 rgba(17,22,26,.08);
    border: 1px solid #dbe2e8;
  }
  .td_class_number{
    width: 15px;
    padding: 5px;
    line-height: 1.8;
    font-size: 13px;
    border-left: 1px solid #f0f0f0;
    margin-left:10px;
    background: aliceblue;
    border: 0px;
  }
  .td_class{
    width: 200px;
    padding: 5px;
    line-height: 1.8;
    font-size: 13px;
    border-left: 1px solid #f0f0f0;
    margin-left:10px;
    background: aliceblue;
    border: 0px;
  }
  .tab__content{
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #efefef;
    padding-bottom: 20px;
  }
  .titleAccordion{
    color: #004288;
    transition: 0.3s;
  }
  .titleAccordion:hover{
    color: #ffa800;
  }

}

</style>
