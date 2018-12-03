Simple TODO application in React with simple Flask backend. There
is no persistance, all TODOs are in memory on server. You can add
TODO, mark as done, reorder by drag and drop.

Tested on node v0.12, python 2.7.6 and chrome 43.


# installation:

1. clone repo
2. best with virtualenv: `pip install -r requirements.txt`
3. install Sass: `gem install sass`
4. `npm install`

# run:

`python server.py`

flask server should run on default http://127.0.0.1:5000/


# test:

`npm run-script js-test` for some rudimentary Jest tests, but because of
https://github.com/facebook/jest/issues/243 they do not work on node 0.12
(they can be run on 0.10)

`npm run-script python-test` for some python API tests

`npm test` runs both

