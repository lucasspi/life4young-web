<template>
	<div>
		<div :class="showModal ? 'modal is-active' : 'modal'">
		  <div class="modal-background"></div>
		  <div class="modal-content">
		    {{ content }}
		  </div>
		  <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
		</div>
	</div>
</template>

<script>
	export default {

		name: 'modal',

		props: ['showModal', 'content'],

		data () {
			return {
			    showModal: false,
			    content: null
			} 
		},

		methods: {
			closeModal() {
            	this.$emit('close');
        	}
		}
	}
</script>