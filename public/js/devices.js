window['@imazzine'].load('devices').then((graphObj) => {
  graphObj.container = document.getElementById('cytoblock');
  window['@imazzine'].cy = cytoscape(graphObj);
});
