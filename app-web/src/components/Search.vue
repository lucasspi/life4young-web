<template>
<div>
  <section class="hero is-link is-small ">
    <div class="hero-body container">
      <div class="columns">
        <div class="column is-3-desktop"></div>
        <div class="column is-6-desktop is-12-mobile">
        <h1 class="title" style="text-align: center; line-height: 2.9">
          Página de pesquisa
        </h1>
          <div id="search">
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input class="input btnSearch" type="search" placeholder="Digite aqui sua pesquisa">
              </p>

            </div>
          </div>

        </div>
        <div class="column is-3-desktop"></div>


      </div>
    </div>
  </section>

  <section class="hero is-link is-medium">
    <div class="tabs is-centered is-boxed is-medium">
      <ul class="tab">
        <li id="defaultOpen" class="tablinks" v-on:click="openCategory(event, 'Series')"><a>Séries</a></li>
        <li class="tablinks" v-on:click="openCategory(event, 'Aulas')"><a>Aulas</a></li>
        <li class="tablinks" v-on:click="openCategory(event, 'Posts')"><a>Posts</a></li>
        <li class="tablinks" v-on:click="openCategory(event, 'Podcast')"><a>Podcasts</a></li>
      </ul>
    </div>
  </section>

  <section class="section container">
    <div class="columns ">
      <div  class="field has-addons column is-1-desktop ">
      </div>
      <div class="column is-10-desktop is-12-mobile">

        <ul>
          <li id="Series"  class="tabcontent">
            <div class="columns is-vcentered" style="background-color: #fafafa; border-radius: 10px; margin-bottom: 20px;">
              <div class="column is-1-desktop is-vcentered" style="">
                <font-awesome-icon icon="play-circle" class="iconSearch" style="width: 50px; height: 50px; background-color: #3273dc;"></font-awesome-icon>
              </div>
              <div class="column is-7-desktop is-12-mobile" >
                <h3 class="title is-6" style="">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
                <h6 class="subtitle is-7">2 de abril de 2019</h6>
              </div>
              <div class="column is-2-desktop" >
                <p style="background-color: #3273dc; border-radius: 50px; color: white; text-align: center; font-size: 14px;">Photoshop</p>
              </div>
            </div>
          </li>
          <li  id="Aulas" class="tabcontent" >
            <div class="columns is-vcentered" style="background-color: #fafafa; border-radius: 10px; margin-bottom: 20px;">
              <div class="column is-1-desktop is-vcentered" style="">
                <font-awesome-icon icon="laptop" class="iconSearch" style="width: 50px; height: 50px; background-color: #ff3860; "></font-awesome-icon>
              </div>
              <div class="column is-7-desktop is-12-mobile" >
                <h3 class="title is-6" style="">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
                <h6 class="subtitle is-7">2 de abril de 2019</h6>
              </div>
              <div class="column is-2-desktop" >
                <p style="background-color: #3273dc; border-radius: 50px; color: white; text-align: center; font-size: 14px;">Photoshop</p>
              </div>
            </div>
            <div class="columns is-vcentered" style="background-color: #fafafa; border-radius: 10px; margin-bottom: 20px;">
              <div class="column is-1-desktop is-vcentered" style="">
                <font-awesome-icon icon="laptop" class="iconSearch" style="width: 50px; height: 50px; background-color: #ff3860;"></font-awesome-icon>
              </div>
              <div class="column is-7-desktop is-12-mobile" >
                <h3 class="title is-6" style="">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
                <h6 class="subtitle is-7">2 de abril de 2019</h6>
              </div>
              <div class="column is-2-desktop" >
                <p style="background-color: #3273dc; border-radius: 50px; color: white; text-align: center; font-size: 14px;">Photoshop</p>
              </div>
            </div>
          </li>
          <li id="Posts"  class="tabcontent">
            <div class="columns is-vcentered" style="background-color: #fafafa; border-radius: 10px; margin-bottom: 20px;">
              <div class="column is-1-desktop is-vcentered" style="">
                <font-awesome-icon icon="comments" class="iconSearch" style="width: 50px; height: 50px; background-color: #334258;"></font-awesome-icon>
              </div>
              <div class="column is-7-desktop is-12-mobile" >
                <h3 class="title is-6" style="">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
                <h6 class="subtitle is-7">2 de abril de 2019</h6>
              </div>
              <div class="column is-2-desktop" >
                <p style="background-color: #3273dc; border-radius: 50px; color: white; text-align: center; font-size: 14px;">Photoshop</p>
              </div>
            </div>
          </li>
          <li  id="Podcast" class="tabcontent" >
            <div class="columns is-vcentered" style="background-color: #fafafa; border-radius: 10px; margin-bottom: 20px;">
              <div class="column is-1-desktop is-vcentered" style="">
                <font-awesome-icon icon="headphones" class="iconSearch" style="width: 50px; height: 50px; background-color: #ff6127;"></font-awesome-icon>
              </div>
              <div class="column is-7-desktop is-12-mobile" >
                <h3 class="title is-6" style="">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
                <h6 class="subtitle is-7">2 de abril de 2019</h6>
              </div>
              <div class="column is-2-desktop" >
                <p style="background-color: #3273dc; border-radius: 50px; color: white; text-align: center; font-size: 14px;">Photoshop</p>
              </div>
            </div>
            <div class="columns is-vcentered" style="background-color: #fafafa; border-radius: 10px; margin-bottom: 20px;">
              <div class="column is-1-desktop is-vcentered" style="">
                <font-awesome-icon icon="headphones" class="iconSearch" style="width: 50px; height: 50px; background-color: #ff6127;"></font-awesome-icon>
              </div>
              <div class="column is-7-desktop is-12-mobile" >
                <h3 class="title is-6" style="">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
                <h6 class="subtitle is-7">2 de abril de 2019</h6>
              </div>
              <div class="column is-2-desktop" >
                <p style="background-color: #3273dc; border-radius: 50px; color: white; text-align: center; font-size: 14px;">Photoshop</p>
              </div>
            </div>
          </li>

        </ul>
      </div>
      <div  class="field has-addons column is-1-desktop ">
      </div>


    </div>
  </section>
</div>
</template>
<script>

export default {

  data(){

    return {
      items: [1,2],
      tags: [1,2,3,4],

    }
  },
  methods: {

      openCategory(evt, categoryName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(categoryName).style.display = "block";

        evt.currentTarget.className += " active";
      },

    }

}
</script>
<style>
.iconSearch{
  width: 50px;
  height: 50px;
  line-height: 50px;
  padding: 10px;
  font-size: 50px;
  color:white;
  border-radius: 90px;

}
.btnSearch{
  border-radius: 100px;
      height: 50px;
}
/* Go from zero to full opacity */
@keyframes fadeEffect {
  from {opacity: 0;}
  to {opacity: 1;}
}
/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;

}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button:active {
  background-color: #333333;
}

/* Style the tab content */
.tabcontent {
  display: none;
  animation: fadeEffect 1s;
}
</style>

