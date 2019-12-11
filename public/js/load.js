window['@imazzine'] = window['@imazzine'] || {};
window['@imazzine'].load = function() {
  var graphObject = {};
  return window.axios.get('/public/json/styles.json')
    .then((res) => {
      graphObject.style = res.data;
      return axios.get('/public/json/graph.json');
    })
    .then((res) => {
      graphObject.elements = res.data;
      return graphObject;
    })
    .then((graphObj) => {
      graphObj.zoom = 1;
      graphObj.zoomingEnabled = false;
      graphObj.container = document.getElementById('cytoblock');
      graphObj.layout = {
        name: "cose"
      };
      window['@imazzine'].cy = cytoscape(graphObj);
    });
};
window['@imazzine'].load();