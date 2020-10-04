window['@imazzine'] = window['@imazzine'] || {};
window['@imazzine'].graph = function() {
  var graphObject = {
    style: [
      {
        selector: 'node',
        style: {
          fontFamily: 'monospace',
          color: '#777'
        },
      },{
        selector: 'node.composition__group',
        style: {
          label: 'data(label)',
          fontSize: 12,
          width: '25px',
          height: '25px',
        },
      },{
        selector: 'node.composition__file',
        style: {
          label: 'data(label)',
          fontSize: 12,
          width: '14px',
          height: '14px',
        },
      },
    ],
  };
  return window.axios.get(`/public/graph/data.json`)
    .then((res) => {
      graphObject.elements = res.data;
      return graphObject;
    })
    .then((graphObj) => {
      graphObj.zoom = 1;
      graphObj.zoomingEnabled = true;
      graphObj.container = document.getElementById('cytoblock');
      graphObj.layout = {
        name: "cose"
      };
      window['@imazzine'].cy = cytoscape(graphObj);
    });
};
window['@imazzine'].graph();