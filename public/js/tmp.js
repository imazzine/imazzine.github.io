window['@imazzine'].load('tmp').then((graphObj) => {
  graphObj.container = document.getElementById('cytoblock');
  window['@imazzine'].cy = cytoscape(graphObj);
});