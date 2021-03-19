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

## Screenshots
<img width="1792" alt="1" src="https://user-images.githubusercontent.com/10685907/111807368-e0d11d80-88f8-11eb-81d1-6bf45b80c63b.png">
<img width="1792" alt="2" src="https://user-images.githubusercontent.com/10685907/111807372-e2024a80-88f8-11eb-818f-3f5e6a3dad29.png">
