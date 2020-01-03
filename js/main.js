Vue.component('text-field', {
	inheritAttrs: false,
	data: function () {
		return {
		}
	},
	template:
	`<p>
	<label :for="name"> {{ label }}</label>
	<input type="text" :name="name" :id="name" />
	</p>`,
	computed:{
	},
	props:["label","name"],
})

Vue.component('email-field', {
	inheritAttrs: false,
	data: function () {
		return {
		}
	},
	template:
	`<p>
	<label :for="name"> {{ label }}</label>
	<input type="email" :name="name" :id="name" />
	</p>`,
	computed:{
	},
	props:["label","name"],
})

Vue.component('select-field', {
	inheritAttrs: false,
	data: function () {
		return {
		}
	},
	template:
	`<p>
	<label :for="name"> {{ label }}</label>
	<select :name="name" :id="name" >
		<option :value="option.value" v-for="option in options">{{ option.text }}</option>
	</select>
	</p>`,
	props:["label","name", "options"],
})

Vue.component('textarea-field', {
	inheritAttrs: false,
	data: function () {
		return {
		}
	},
	template:
	`<p>
	<label :for="name"> {{ label }}</label>
	<textarea :name="name" :id="name" ></textarea>
	</p>`,
	props:["label","name"],
})

Vue.component('radio-field', {
	inheritAttrs: false,
	props: ['field'],
	data: function () {
		return {
			count: 0
		}
	},
	template: '<textarea :name="field.name" :id="field.name" ></textarea>',
})


let vm = new Vue({
  el: '#app',
  data: {
    fields: [
		 {"name": "subject", "label": "Subject", "type": "text-field", "options": []},
		 {"name": "email", "label": "Email", "type": "email-field", "options": []},
		 {"name": "name", "label": "Your Name", "type": "text-field", "options": []},
		 {"name": "phone", "label": "Phone number", "type": "text-field", "options": []},
		 {"name": "website", "label": "Website", "type": "text-field", "options": []},
		 {"name": "content", "label": "Your Content", "type": "textarea-field", "options": []}
	],
	html : "",
  },
  mounted: function() {
	  this.UpdateHTMLData();
  },
  methods: {
    AddField: function () {
		this.fields.push({ name: 'your_field', label: 'Your New Field', type: 'text-field', options: [{value: '', text: ''}]});
		vm.UpdateHTMLData();
	},
    NewSelectOption: function (index, target) {
		this.fields[index].options.push({value: 'your_option', text: 'Your Option'});
		vm.UpdateHTMLData();
	},
    UpdateHTMLData: function () {
		var generated = this.$refs.formdata.innerHTML;
  	  	var cleaned = process(generated);
  	  	this.html = cleaned;
	},

  }
});



function process(str) {

    var div = document.createElement('div');
    div.innerHTML = str.trim();

    return format(div, 0).innerHTML;
}

function format(node, level) {

    var indentBefore = new Array(level++ + 1).join('  '),
        indentAfter  = new Array(level - 1).join('  '),
        textNode;

    for (var i = 0; i < node.children.length; i++) {

        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild == node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    }

    return node;
}
