# sonar-web-frontend-helloworld

Helloworld project using [sonar-web-frontend-plugin](https://github.com/groupe-sii/sonar-web-frontend-plugin) to link with [sonar-web-frontend-reporters](https://github.com/groupe-sii/sonar-web-frontend-reporters)

## Requirements

- Node.JS
- gulp npm package installed globally
- Jenkins
- Sonar 4.5.5 LTS with SII sonar plugin installed, **Javascript default plugin uninstalled**
- ruby + scss-lint gem

## Installation

- configure a jenkins job, and run a shell command with these lines

```Shell
#!/bin/sh
#link gulp bin
GULP=node_modules/gulp/bin/gulp.js

#install node modules
npm install

#Launching phantomjs in webdriver mode...
node_modules/.bin/phantomjs --webdriver=4444 > /dev/null &
# Store the PID
phantomPID=$!

#let phantom launch fully
sleep 5

#Run tests
node $GULP tests

#let time for tests to pass
sleep 10

#Exit tests
kill -9 $phantomPID

#linting
node $GULP lint

#duplication
node $GULP duplication

echo "Jenkins job done !"
echo ""
```

- add build task 'Run a SonarQube scan' with sonar.properties in the repository
- configure the dashboard of the project in Sonar by adding 'Issues by languages' widget
- in "quality profiles" tab, for "Javascript" profiles, set as default "All linters"

## AngularJS

Due to a limitation of Sonar for handling multiple reporters on the same language (JS), the AngularJS errors are listed in the JS tab.

## Run on jenkins

- run Jenkins job
- open your Sonar, enjoy !

# Results

![Sonar](https://raw.githubusercontent.com/groupe-sii/sonar-web-frontend-helloworld/master/screenshots/sonar.png)