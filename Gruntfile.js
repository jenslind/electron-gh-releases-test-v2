module.exports = function(grunt) {
  grunt.initConfig({
    'create-windows-installer': {
      x64: {
        appDirectory: './',
        outputDirectory: './windows_installer',
        authors: 'Testing Test',
        exe: 'TestSetup.exe'
      }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');

};
