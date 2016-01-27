# sonar-web-frontend-helloworld

Helloworld project using [sonar-web-frontend-plugin](https://github.com/groupe-sii/sonar-web-frontend-plugin) to link with [sonar-web-frontend-reporters](https://github.com/groupe-sii/sonar-web-frontend-reporters)

## Requirements

- Node.JS
- gulp npm package installed globally
- Jenkins
- Sonar 4.5.5 LTS

## Installation

```Javascript
npm install
```

- configure a jenkins job, and a build task 'Run a SonarQube scan' with sonar.properties in the repository
- configure the dashboard of the project in Sonar by adding 'Issues by languages' widget

## Run

- run linting

```Javascript
gulp lint
```

- run Jenkins job
- open your Sonar, enjoy !
