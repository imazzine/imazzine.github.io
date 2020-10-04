export default [
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
];
