window['@imazzine'].load('devices').then((graphObj) => {
  graphObj.zoom = 1;
  graphObj.zoomingEnabled = false;
  graphObj.container = document.getElementById('cytoblock');
  window['@imazzine'].cy = cytoscape(graphObj);
});
