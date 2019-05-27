<template>
  <div>
    <div class="is-4-mobile is-2-desktop container column" style="padding:0px;">
      <div>
        <button class="reportarProblemaButton">
          Reportar problema
        </button>
      </div>
    </div>
    <div class="is-2-mobile is-1-desktop column like" style="padding-right:0px; ">
      <div>
        <button class="likeButton">
          <font-awesome-icon icon="thumbs-up" style="color: white; font-size: 18px;"></font-awesome-icon>
        </button>
      </div>
    </div>
    <div class=" is-1-desktop is-2-mobile column" style="padding:0px;">
      <div>
        <button class="previousButton">
          <font-awesome-icon icon="step-backward" style="color: #0691E6; font-size: 18px;"></font-awesome-icon>
        </button>
      </div>
    </div>
    <div class="is-2-desktop is-4-mobile column" style="padding:0px; ">
      <div >
        <button class="proximaAulaButton">
          Próxima aula
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'lesson-buttons',
    props: ['active'],
    components: {

    },
    data() {
    return {
      // toggleMenu: true
    }
  },
}
</script>


<style>

  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {

    .reponsiveMenuTablet{
      display:none;
    }

    .logoCourseLesson{
      float: left;
    }
    .videoDescriptionSection{
      padding-top:20px;
      padding-bottom:20px;
    }
    .is-3-mobile.is-1-desktop.column{
      padding: 0px;
    }
   .videoHeightforMobile{
      height: 211px;
      width: 100%;
    }
    .titleVideoDescription{
      font-size: 18px;
      line-height:1.4;
      padding-left: 85px;
    }
    .titleVideoDescription2{
      font-size: 18px;
      line-height:1.4;

    }
    .textVideoDescription{
      font-size: 13px;
      display: static;
    }
    .columns.is-mobile > .column.is-6 {
      width: 30%;
    }
    .columns.is-mobile > .column.is-1{
      width: 5.33333%;
    }
    .likeButton{
      background-color: #0691E6;
      border-radius: 5px;
      padding:10px;
      border: transparent;
    }
    .previousButton{
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background-color: white;
      padding:10px;
      border-color: #e0e0e0;
    }
    .proximaAulaButton{
      font-size: 13px;
      font-weight:600;
      border-color:transparent;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      padding:10px;
      background-color:  #0691E6;
      color: white;
    }
    .reportarProblemaButton{
      margin-left: 30px;
      margin-right: 10px;
      font-size: 13px;
    }

}


.likeButton{
  background-color: #0691E6;
  border-radius: 5px;
  padding:10px;
  border: transparent;
  cursor: pointer;
}
.previousButton{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: white;
  cursor: pointer;
  padding:10px;
  border-color: #e0e0e0;
}
.proximaAulaButton{
  cursor: pointer;
  font-size: 16px;
  font-weight:600;
  border-color:transparent;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding:10px;
  background-color:  #0691E6;
  color: white;
}
.reportarProblemaButton{

  cursor: pointer;
  font-size: 16px;
  font-weight:600;
  border-color: #0691E6;
  border-radius: 5px;
  padding:10px;
  background-color: transparent;
  color: #0691E6;
  transition: 0.4s;
}
.reportarProblemaButton:hover {
  color:#333333;
  border-color: #333333;
  opacity: 1;

}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
   .videoHeightforMobile{
      height: 450px;
      width:100%;
    }
    .titleVideoDescription{
      font-size: 18px;
      line-height:1.4;
    }
    .columns.is-mobile > .column.is-6 {
        width: 30%;
    }
    .columns.is-mobile > .column.is-1{
          width: 5.33333%;
    }
}
</style>
