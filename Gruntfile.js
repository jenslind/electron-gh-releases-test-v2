module.exports = function(grunt) {
  grunt.initConfig({
    'create-windows-installer': {
      x64: {
        appDirectory: './Test-win32-x64',
        outputDirectory: './Test-win32-x64-installer',
        authors: 'Testing Test',
        exe: 'Test.exe'
      }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');

};
