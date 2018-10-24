<!--  -->
<template>
  <div>
    <div id="mountNode"></div>

  </div>
</template>
<script>/* eslint-disable indent,semi */
import G6 from '@antv/g6';
export default {
  data() {
    return {};
  },
  components: {},

  computed: {},

  created() {
  },

  mounted() {
    const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200
      },{
        id: 'node2',
        x: 300,
        y: 200
      }],
      edges: [{
        id: 'edge1',
        target: 'node2',
        source: 'node1'
      }]
    };
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 500,
      height: 500
    });
    graph.read(data);
  },

  methods: {}
}
</script>

<style scoped>

</style>
