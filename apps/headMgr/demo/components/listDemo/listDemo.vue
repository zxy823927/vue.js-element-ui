<template>
<div>
<ul v-for="(value,key) in datas">
  <li>{{value}}---{{key}}</li>
</ul>
</div>
</template>

<script>
    export default {
      data() {
      return {
        datas: [
            { text: '巴士' },
            { text: '快车' },
            { text: '专车' },
            { text: '顺风车' },
            { text: '出租车' },
            { text: '代驾' }
          ]
      }
    },
    methods: {
      changeW: function(){
        this.value1=!this.value1
      }
    }
    }
</script>
