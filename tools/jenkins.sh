#!/bin/sh

GULP=node_modules/gulp/bin/gulp.js

echo ""
echo "install node modules"
echo ""
npm install

echo ""
echo "Launching phantomjs in webdriver mode..."
echo ""
node_modules/.bin/phantomjs --webdriver=4444 > /dev/null &
# Store the PID
phantomPID=$!

sleep 5

echo ""
echo "Run tests"
echo ""
node $GULP tests

sleep 10

echo ""
echo "Exit tests"
echo ""

kill -9 $phantomPID

echo ""
echo "linting..."
echo ""
node $GULP lint

echo ""
echo "jspd..."
echo ""
node $GULP jscpd

echo ""
echo ""
echo "Jenkins internal job done !"
echo ""