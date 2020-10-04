import styles from './styles/styles';

// Ignoring ts checking for cytoscape.js
const cytoscape: any = require('cytoscape');
const container: Element = document.getElementById('cytoblock');

async function start() {
  const res = await fetch('/public/graph/data.json');
  const data = await res.json();
  cytoscape({
    zoom: 1,
    zoomingEnabled: false,
    container: container,
    layout: {
      name: "cose"
    },
    style: styles,
    elements: data
  });
};
start();