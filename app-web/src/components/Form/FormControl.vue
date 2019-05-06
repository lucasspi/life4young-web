<template>
  <div class="field" tabindex="1" :class="fieldClass" @keydown="form.errors.clear($event.target.name)">
    <label v-if="label" class="label" :class="{ 'is-danger': form.errors.has(name), 'is-normal': !form.errors.has(name) }" v-html="label"></label>
    <p class="control" :class="controlClass"><slot :class="{ 'is-danger': form.errors.has(name) }"></slot></p>
    <p class="help is-danger" v-if="form.errors.has(name)" v-text="form.errors.get(name)"></p>
    <p v-if="helpInfo" class="help">{{helpInfo}}</p>
  </div>
</template>

<script>
export default {
  name: 'form-control',
  props: ['form', 'label', 'name', 'fieldClass', 'controlClass', 'labelClass', 'helpInfo'],

  mounted () {
      // this.$slots.default.forEach(vnode => {
      //     if (vnode.tag.indexOf('a-child-component') > -1) {
      //       vnode.elm.addEventListener('click', this.handleClick, true) // <-- NATIVE event :-(
      //     }
      // })
  },

  data() {
    return {
    }
  }
}
</script>
