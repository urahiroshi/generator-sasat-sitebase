'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var SasatSiteBaseProvider = yeoman.generators.Base.extend({
  init: function () {
    this.argument('name', { type: String, required: true });
    this.argument('createSP', { type: String, required: true });

    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  app: function () {
    var data = {name: this.name};
    this.template('base.html', 'out.html', data);
    if (this.createSP === 'true') {
      this.template('base_sp.html', 'out_sp.html');
    }

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = SasatSiteBaseProvider;