window['@imazzine'] = window['@imazzine'] || {};
window['@imazzine'].load = function(name) {
  var graphObject = {};
  return window.axios.get('/public/json/' + name + '/layout.json')
    .then((res) => {
      graphObject.layout = res.data;
      return axios.get('/public/json/styles.json');
    })
    .then((res) => {
      graphObject.style = res.data;
      return axios.get('/public/json/graph.json');
    })
    .then((res) => {
      graphObject.elements = res.data;
      return graphObject;
    });
};