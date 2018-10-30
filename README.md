# Vue Forum

> The best forum written with `Vue.js`

## Requirements

* Vue.js
* Firebase

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Firebase

* Make sure the `src/config/firebase.js` has the right configs for firebase realtime database
* Make sure the `read` and `write` are `true` in firebase rules configuration for `development` purposes and then choose the right config in `production`

## Other

* I used [spinKit](http://tobiasahlin.com/spinkit/) for app loading spinner
* I used [nprogress](https://github.com/rstacruz/nprogress) package for progress bar before navbar while loading

## More info

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
