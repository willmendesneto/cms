# MST CMS

This is the MST new website CMS.

## How to

### Setup

Make sure you have recent versions of `node` and `npm` installed.

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
* Run all grunt tasks: 'grunt'

## Deployment tasks

When all the grunt  tasks pass

```
[snap-ci](https://snap-ci.com/movimento-sem-terra/cms/branch/master) deploys to github pages
```
