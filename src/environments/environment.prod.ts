export const environment = {
  production: true,

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
  APP_BACK_END_BASE_URL: "https://co2eq-tracking-rest-api.herokuapp.com"
};

