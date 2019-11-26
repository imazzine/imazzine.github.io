var style;
var layout;
var elements;
var cy = window.cy = cytoscape({
  container: document.getElementById('cytoblock')
});
var axios = window.axios;
axios.get('/public/json/tmp/layout.json')
  .then((res) => {
    layout = res.data;
    return axios.get('/public/json/tmp/style.json');
  })
  .then((res) => {
    style = res.data;
    return axios.get('/public/json/tmp/elements.json');
  })
  .then((res) => {
    elements = res.data;
  })
  .then((res) => {
    cy.setStyle(style);
    cy.add(elements);
    cy.layout(layout).run();
  });