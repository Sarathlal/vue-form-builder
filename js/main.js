Vue.component('text-field', {
	inheritAttrs: false,
	data: function () {
		return {
			hover: false,
		}
	},
	template:
	`<p @click="handleClick()" @mouseover="handleMouseOver()" @mouseleave="handleMouseLeave()" >
	<label :for="name">{{ label }}</label>
	<input type="text" :name="name" :id="name" :required="required" />
	</p>`,
	computed:{
	},
	methods: {
	  handleClick() {
		  this.$emit('click');
	  },
	  handleMouseOver() {
		  this.$emit('mouseover');
	  },
	  handleMouseLeave() {
		  this.$emit('mouseleave');
	  },
  	},
	props:["label","name","required"],
})

Vue.component('email-field', {
	inheritAttrs: false,
	data: function () {
		return {
		}
	},
	template:
	`<p @click="handleClick()" @mouseover="handleMouseOver()" @mouseleave="handleMouseLeave()">
	<label :for="name">{{ label }}</label>
	<input type="email" :name="name" :id="name" :required="required" />
	</p>`,
	computed:{
	},
	methods: {
	  handleClick() {
		  this.$emit('click');
	  },
	  handleMouseOver() {
		  this.$emit('mouseover');
	  },
	  handleMouseLeave() {
		  this.$emit('mouseleave');
	  },
  	},
	props:["label","name","required"],
})

Vue.component('select-field', {
	inheritAttrs: false,
	data: function () {
		return {
		}
	},
	template:
	`<p @click="handleClick()" @mouseover="handleMouseOver()" @mouseleave="handleMouseLeave()">
	<label :for="name">{{ label }}</label>
	<select :name="name" :id="name" :required="required">
		<option :value="option.value" v-for="option in options">{{ option.text }}</option>
	</select>
	</p>`,
	methods: {
	  handleClick() {
		  this.$emit('click');
	  },
	  handleMouseOver() {
		  this.$emit('mouseover');
	  },
	  handleMouseLeave() {
		  this.$emit('mouseleave');
	  },
  	},
	props:["label","name","options","required"],
})

Vue.component('textarea-field', {
	inheritAttrs: false,
	data: function () {
		return {
		}
	},
	template:
	`<p @click="handleClick()" @mouseover="handleMouseOver()" @mouseleave="handleMouseLeave()">
	<label :for="name">{{ label }}</label>
	<textarea :name="name" :id="name" :required="required"></textarea>
	</p>`,
	methods: {
	  handleClick() {
		  this.$emit('click');
	  },
	  handleMouseOver() {
		  this.$emit('mouseover');
	  },
	  handleMouseLeave() {
		  this.$emit('mouseleave');
	  },
  	},
	props:["label","name","required"],
})

Vue.component('checkbox-field', {
	inheritAttrs: false,
	data: function () {
		return {
		}
	},
	template:
	`<p @click="handleClick()" @mouseover="handleMouseOver()" @mouseleave="handleMouseLeave()">
	<input type="checkbox"  :name="name" :id="name" :required="required" :value="value"> <label :for="name">{{ label }}</label>
	</p>`,
	methods: {
	  handleClick() {
		  this.$emit('click');
	  },
	  handleMouseOver() {
		  this.$emit('mouseover');
	  },
	  handleMouseLeave() {
		  this.$emit('mouseleave');
	  },
  	},
	props:["label","name","required","value"],
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
		 {"name": "subject", "label": "Subject", "value":"", "type": "text-field", "options": [], "required":false, "showEdit": false, "hover": false},
		 {"name": "email", "label": "Email", "value":"",  "type": "email-field", "options": [], "required":true, "showEdit": false, "hover": false},
		 {"name": "name", "label": "Your Name", "value":"",  "type": "text-field", "options":[],  "required":true, "showEdit": false, "hover": false},
		 {"name": "phone", "label": "Phone number", "value":"",  "type": "text-field", "options": [], "required":false, "showEdit": false, "hover": false},
		 {"name": "website", "label": "Website", "value":"",  "type": "text-field", "options": [], "required":false, "showEdit": false, "hover": false},
		 {"name": "content", "label": "Your Content", "value":"", "type": "textarea-field", "options": [], "required":false, "showEdit": false, "hover": false}
	],
	html : "",
	activetab: 1,
  },
  created: function(){
	this.fields.forEach((field, index) => {
  		field['hover'] = false;
  	});
  },
  updated: function() {
	  this.UpdateHTMLData();
  },
  methods: {
	openEditor: function (field) {
		field.showEdit = true;
		this.fields.forEach((item, index) => {
			if(! (field == item)){
				vm.closeEditor(item);
			}
		});
	},
	closeEditor: function (field) {
		field.showEdit = false;
	},
	closeAllEditor: function () {
		this.fields.forEach((field, index) => {
			vm.closeEditor(field);
		});
	},
	deleteField: function (index) {
		//console.log('hi' + index);
		this.fields.splice(index, 1);
	},
    AddField: function () {
		vm.closeAllEditor();
		this.fields.push({ name: 'your_field', label: 'Your New Field', type: 'text-field', options: [{value: '', text: ''}], required: false, showEdit: true});
	},
    NewSelectOption: function (index, target) {
		this.fields[index].options.push({value: 'option value', text: 'Option Text'});
	},
    UpdateHTMLData: function () {
		var generated = this.$refs.formdata.innerHTML;
  	  	var cleaned = process(generated);
  	  	this.html = cleaned;
	},
	mouseover: function (field){
		field.hover = true;
		this.fields.forEach((item, index) => {
			if(! (field == item)){
				item.hover = false;
			}
		});
	},
	mouseleave: function (field){
		field.hover = false;
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
