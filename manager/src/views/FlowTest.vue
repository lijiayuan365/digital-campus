<template>
  <div id="labelManage">
    <div id="item_left" class="item"></div>
    <div id="item_right" class="item" style="margin-left:50px;"></div>
  </div>
</template>
<script>
  import { JsPlumb } from 'jsplumb'
  export default {
    data(){
      return {

      }
    },
    methods:{

    },
    mounted(){
      JsPlumb.ready(function () {
        debugger
        JsPlumb.connect({
          source: 'item_left',
          target: 'item_right',
          endpoint: 'Dot'
        })
      })
    }
  }
</script>

<style scoped>
.item{
  width: 100px;
  height: 100px;
  border: solid 1px;
}

</style>
