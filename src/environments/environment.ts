// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare var require: any;

export const environment = {
  production: false,
  rowsPerPage: 50,
  rowsPerPageOptions: [5, 10, 15, 20, 25, 50, 100],
  api: {
    nome: require('../../package.json').name,
    descricao: require('../../package.json').description,
    version: require('../../package.json').versionDev,
    dataUpdate: require('../../package.json').dataUpdate,
    hourUpdate: require('../../package.json').hourUpdate,
    author: require('../../package.json').author,
    url: 'http://localhost:8180/api',
  },
  motor_consulta: {}
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
