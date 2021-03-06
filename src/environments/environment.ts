// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Third-party API configurations
  CLOVERLY: {
    API_PUBLIC_KEY: "Bearer public_key:74a2372d12b94cd2f05a",
    URL: {
      ELECTRICITY: "https://api-prod-no-cert.cloverly.com/2021-10/estimates/electricity",
      FUEL: "https://api-prod-no-cert.cloverly.com/2021-10/estimates/fuel",
      TRANSPORT: "https://api-prod-no-cert.cloverly.com/2021-10/estimates/vehicle"
    }
  },
  ACTIVE_API: {
    API_HOST: "airport-info.p.rapidapi.com",
    API_KEY: "9a325031d8msha55fada455b8d0cp16bd8ajsn7dc0333a39d5",
    URL: "https://airport-info.p.rapidapi.com/airport?iata="
  },

  // Back end
  // APP_BACK_END_BASE_URL: "http://127.0.0.1:8000"
  APP_BACK_END_BASE_URL: "https://co2eq-tracking-rest-api.herokuapp.com"
}



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
