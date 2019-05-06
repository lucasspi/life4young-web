<template>
  <div class="field is-horizontal" :class="fieldClass" @keydown="form.errors.clear($event.target.name)">
    <div class="field-label" :class="{ 'is-danger': form.errors.has(name), 'is-normal': !form.errors.has(name) }"><label class="label">{{ label }}</label></div>
    <div class="field-body">
      <p class="control" :class="controlClass">
        <slot></slot>
      </p>
      <p class="help is-danger" v-if="form.errors.has(name)" v-text="form.errors.get(name)"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-control-horizontal',
  props: ['form', 'label', 'name', 'fieldClass', 'controlClass'],

  data() {
    return {
    }
  },
}
</script>

<style lang="scss">

</style>
