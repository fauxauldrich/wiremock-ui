# Wiremock UI

## Local Setup

- git clone `https://github.com/fauxauldrich/wiremock-ui.git`
- `cd wiremock-ui`
- `npm install`
- `npm install -g serve webpack tsc`
- Modify `ts/src/config.ts` in case Wiremock details differ from default values
  - `WIREMOCK_HOST`: default value -> localhost
  - `WIREMOCK_PORT`: default value -> 8080
- Run application in development mode using `npm start`
- Navigate to `http://localhost:5000/`
- To deploy in production
  - Build using webpack: `npm run wp`
  - `npm install -g serve`
  - `serve build/`

