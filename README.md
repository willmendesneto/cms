# MST CMS

This is the MST new website CMS.

[![Build Status](https://snap-ci.com/movimento-sem-terra/cms/branch/master/build_image)](https://snap-ci.com/movimento-sem-terra/cms/branch/master)

## How to

### Setup

Make sure you have recent versions of `node`, `npm` and `chromedriver` are installed.

Install `grunt-cli` globally so you can use [Grunt](http://gruntjs.com) to run project tasks:

```
npm install -g grunt-cli
```

Then, `cd` into the project folder and install dependencies with npm:

```
npm install
```

## Development tasks

After installing all dependencies, you can use grunt to run different project related tasks.

* Run the app locally: `grunt serve`
* Run the jasmine specs: `grunt test`
* Run all grunt tasks: `grunt`

To run e2etest you need install chromedrive in your machine:
* http://chromedriver.storage.googleapis.com/index.html?path=2.9/
or
* brew install chromedriver

## Tests Tasks

You need create a test envoriment to you:

1. Create a single account in github;
2. Create a new repo to test;

And add this new repo inside Gruntfile

```
ng-constant: {
  test: {
    ENV: {
      repository: 'your-user/cool-repository/',
    }
  }
}

```

Then run the test with the password see:

```
TEST_USER=your-user  TEST_PASSWORD=sucrilhos grunt e2etest
```

## Deployment tasks

When all the grunt  tasks pass:

[snap-ci] (https://snap-ci.com/movimento-sem-terra/cms/branch/master) deploys to github pages

