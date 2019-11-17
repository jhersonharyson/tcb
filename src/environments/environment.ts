// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlbase: "https://dev-tcb.tfs.totvs.com/tcbapi/api/v1",
  redirect_uri: "https://dev-tcb.tfs.totvs.com",
  url_security: "https://dev-tcb.tfs.totvs.com/tcbseguranca",
  url_security_api: "https://dev-tcb.tfs.totvs.com/tcbsegurancaapi/api/v1",
  url_tcb_api: "https://dev-tcb.tfs.totvs.com/tcbapi/api/v1",
  client_id: "clientApiTCB",
  scope: "read",
  response_type: "code",
  grant_type: "authorization_code",
  authorization: {
    username: "clientApiTCB",
    password: "5u)d{TPgZu%Q7Ss6Y=!'*qCH7"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
