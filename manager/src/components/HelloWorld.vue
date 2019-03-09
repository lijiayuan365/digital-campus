<template>
  <div>
    <div>

    </div>
    <button @click="addUser">按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedProp:[
        {id:'2',name:'11'},
      ],
      userList:[
        {id:'1',name:'1'},
        {id:'2',name:'11'},
        {id:'3',name:'13'},
      ],
      ids:['3']
    };
  },
  methods: {
    addUser(){
      debugger
      this.selectedIds.push('2');
    }
  },
  computed:{
    selectedIds(){
      let ids = this.selectedProp.map(user => user.id);
      return ids;
    },
//    userIds(){
//      let ids = this.userList.map(user => user.id);
//      return ids;
//    },
    selectedUser(){
      let user = this.userList.filter((user)=>{
        return this.ids.includes(user.id);
      });
      return user
//      return [...this.ids]
    }
  },
  watch:{
    selectedIds:{
      handler(oldValue,newValue){
        debugger
      },
      deep:true,
    }
  }
};
</script>
