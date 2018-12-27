const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function clickHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = clickHandler;
    document.addEventListener('click', clickHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};

export const fieldMixin = {
  name:'fieldMixin',
  directives: {clickoutside},
  props:{
    fieldIndex:Number
  },
  data(){
    return{
      visible: false, //访问状态
    }
  },
  computed:{
    fieldData: {
      get: function () {
        return this.fieldItemData;
      },
      set: function (val) {
        this.fieldItemData = val;
      }
    }
  },
  created(){

  },
  mounted(){
    this.$emit('update:fieldItemData', this.fieldData);
  },
  methods:{
    handleClose(e) {
      this.visible = false;
    },
    copyField(){
      this.$emit('copyField',this.fieldIndex);
    },
    removeField(){
      this.$emit('removeField',this.fieldIndex);
    }
  },
  watch:{
    fieldData: {
      handler(newData) {
        this.$emit('update:fieldItemData', newData);
      },
      deep: true
    }
  }
};

