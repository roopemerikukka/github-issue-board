# Github issue board

Github issue board is a dashboard where you can see all of your open issues on one sight. __The application is still under heavy construction (a.k.a. early alpha) and may change drastically.__

## Usage

The application is hosted [here](https://issues.roo.pe) and you can start using it straight away. The routing doesn't still work with full page refreshes on subroutes. The application doesn't record any of your personal GitHub data, but only uses minimal parts of it to show your issues. All data is stored on your browsers local storage.

## Development

### Requirements
1. You need to register an application to your GitHub account. You can do it [here](https://github.com/settings/applications/new).
2. You need to set up a [github-secret-keeper](https://github.com/HenrikJoreteg/github-secret-keeper#setting-it-up-on-heroku) and follow the instructions provided in there.

### Development
1. `git clone git@github.com:roopemerikukka/github-issue-board.git`
2. `cd github-issue-board`
3. `yarn`
4. Add the address of your `github-secret-keeper` app to `package.json` in here:
```json
"github-issue-board": {
  "secret-keeper-url": "https://your-secrets-app.herokuapp.com"
}
```
4. Configure the start script with your client IDs:
```json
"start": "REACT_APP_DEV=<YOUR-CLIENT-ID> react-scripts start"
```

## Screenshots


![screenshot 2017-03-14 18 47 55](https://cloud.githubusercontent.com/assets/1453463/23911972/181b5dfa-08e7-11e7-9672-07e76bda53fd.png)

## About the project

The Github issue board started as an university course project and kind of introduction for me to get a better understanding about GitHub API, Redux, testing ect. so the code might not be as efficient as it could be. I try to refactor it as I have time, but all pull requests and improvement suggestions are welcome!

---

Github issue board was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
