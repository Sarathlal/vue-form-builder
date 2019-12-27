
Vue.component('field-label', {
	props: ['field'],
	data: function () {
		return {
			count: 0
		}
	},
	template: '<label :for="field.name">{{ field.label }}</label>'
		
})

Vue.component('input-text', {
	props: ['field'],
	data: function () {
		return {
			count: 0
		}
	},
	template: '<input type="text" :name="field.name" :id="field.name" />'
})

Vue.component('input-email', {
	props: ['field'],
	data: function () {
		return {
			count: 0
		}
	},
	template: '<input type="email" :name="field.name" :id="field.name" />'
})

Vue.component('input-select', {
	props: ['field'],
	data: function () {
		return {
			count: 0
		}
	},
	template: `<select :name="field.name" :id="field.name" >
		<option :value="option.value" v-for="option in field.options">{{ option.text }}</option>
	</select>`
})

Vue.component('input-textarea', {
	props: ['field'],
	data: function () {
		return {
			count: 0
		}
	},
	template: '<textarea :name="field.name" :id="field.name" ></textarea>',
})

Vue.component('input-radio', {
	props: ['field'],
	data: function () {
		return {
			count: 0
		}
	},
	template: '<textarea :name="field.name" :id="field.name" ></textarea>',
})


new Vue({
  el: '#app',
  data: {
    fields: [
		 {"name": "subject", "label": "Subject", "type": "text", "options": []},
		 {"name": "email", "label": "Email", "type": "email", "options": []},
		 {"name": "name", "label": "Your Name", "type": "text", "options": []},
		 {"name": "phone", "label": "Phone number", "type": "text", "options": []},
		 {"name": "website", "label": "Website", "type": "text", "options": []},
		 {"name": "content", "label": "Your Content", "type": "textarea", "options": []}
	],
	html : "",
  },
  created: function() {
	  console.log('hi');
	  
  },
  methods: {
    AddField: function () {
		this.fields.push({ name: '', label: '', type: 'text', options: [{value: '', text: ''}]});
    },
    NewSelectOption: function (index, target) {
		this.fields[index].options.push({value: '', text: ''});
    },
    UpdateHTMLData: function () {
		console.log(this.$refs.formdata.innerHTML);
		this.html = this.$refs.formdata.innerHTML;
	},
    
  }
});
