Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})


new Vue({
  el: '#app',
  data: {
    fields: [
		 {"name": "subject" ,"type": "text"},
		 {"name": "email", "type": "email"},
		 {"name": "name", "type": "text"},
		 {"name": "phone", "type": "text"},
		 {"name": "website", "type": "text"},
		 {"name": "content", "type": "textarea"}
	],
    json_data: {},
  },
  created: function() {
  },
  methods: {
    AddField: function () {
      this.fields.push({ name: '',type: 'text' });
    },
  }
});
