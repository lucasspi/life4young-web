<template>
<div id="post" >

  <div id="postnickname" class="media nickname content" style="margin-bottom: 15px;">
    <figure class="media-left image nickname ">
        <img class="is-rounded" :src="post.uri">
    </figure> <div class="media-content">
    <div class="content" style="margin-bottom:0px;">
        <a><strong>{{post.nickname}}</strong></a>

    </div>
    <p style="font-size:12px;">{{post.ranking}} pontos </p>
    </div>

    <p style="font-size:12px;">{{post.data}}</p>
  </div>
  <div>
    <h3 style="font-size:14px;">{{post.content}}{{post.content}}</h3>
  </div>

  <div class="item">
      <input type="checkbox" id="check1">
      <label for="check1">Responder</label>
      <ul>
        <li><textarea class="textarea" placeholder="Responder este Comentário"></textarea></li>
        <li style="margin-top: 15px;"><div id="search" class="box">
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link">Comentar</button>
                </div>
                <p class="control">
                    <button class="button">Ocultar</button>
                </p>
              </div>
          </div></li>

      </ul>
  </div>


</div>
</template>

<script>

console.log("chegou no post.vue")
export default {

  name: 'post',
  props: ['active'],
  components: {

    },
 data(){
    return{

    post: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      nickname: '@nickname',
      data: 'a 3 horas atrás',
      uri: 'http://bulma.io/images/placeholders/128x128.png',
      ranking:1092
    },
    tags:["Revit","Autocad", "Photoshop", "Illustrator", "Lumion", "V-Ray", "SketchUp"],
    filtro: '',
    foto:{
      url: 'https://spirandeli.com.br/wp-content/uploads/2019/03/forum-01.png',
    }
    //tags:[ {titulo: "Revit"},{titulo: "Autocad"}, {titulo: "Photoshop"}, {titulo: "Illustrator"}, {titulo: "Lumion"}, {titulo: "V-Ray"}, {titulo: "SketchUp"}]

  }
  },


}
</script>

<style lang='scss'>
p#tag {
    background-color: #09449c;
    padding-right: 6px;
    padding-left: 6px;
    color: white;
    border-radius: 23px;
}


.item{
  margin-top:30px;
}
.item label{
  display: inline;
  padding:10px;
  background-color: #3273dc;
  font-size:16px;
  color:white;
  border-radius: 3px;

}
.item label:hover{

  padding:10px;
  background-color: #f2673a;
  font-size:16px;
  color:white;
  border-radius: 3px;
  transition: all .2s linear;

}
.item ul{
  width:100%;
  list-style: none;
  overflow: hidden;
  max-height: 0 ;
  transition: all .4s linear;
  margin-top: 15px;

}
.item ul li a{
  width:100%;
  height:200px;
  padding:10px;
  display:block;
  text-decoration: none;
  background-color: #fafafa;
}
.item input:checked ~ label{
display:none;
}
.item input:checked ~ ul{
height: auto;
max-height: 200px;
transform: all;
}
.item input{
  display: none;
}
div#postnickname {
    padding-top: 30px;
}
.media {
    -ms-flex-align: start;
    align-items: flex-start;
    display: -ms-flexbox;
    display: flex;
    text-align: left;
}
figure.nickname.image {
    width: 40px;
    height: auto;
    margin: 0 auto;
}
.media.nickname .media-content {
    padding-left: 15px;
    padding-top: 5px;
}
.media-content {
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    text-align: left;
}
.image img {
    display: block;
    height: auto;
    width: 100%;
}
</style>
