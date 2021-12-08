declare var require: any;

export const environment = {
  production: true,
  rowsPerPage: 50,
  rowsPerPageOptions: [5,10,15,20,25,50,100],
  api: {
    nome: require( '../../package.json').name,
    descricao: require( '../../package.json').description,
    version: require( '../../package.json').version,
    dataUpdate: require( '../../package.json').dataUpdate,
    hourUpdate: require( '../../package.json').hourUpdate,
    author: require( '../../package.json').author,
    url: '/api'
  }
};
