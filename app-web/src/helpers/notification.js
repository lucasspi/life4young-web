import Vue from 'vue'
import Notification from '@/components/Notification.vue'

const NotificationComponent = Vue.extend(Notification)

export default (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications',
  position: '.top-right',
  action: '',
  url: ''
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
};
