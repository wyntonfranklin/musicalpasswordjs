module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        meta: {
            banner: "/*\n" +
                " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
                " *  <%= pkg.description %>\n" +
                " *  <%= pkg.homepage %>\n" +
                " *\n" +
                " *  Made by <%= pkg.author.name %>\n" +
                " *  Under <%= pkg.license %> License\n" +
                " */\n"
        },
        copy: {
            main: {
                files: [
                  // includes files within path
                    {expand: true, src: ['src/musicalpassword.js'], dest: 'build/', filter: 'isFile'},
                    {expand: true, src: ['src/*'], dest: 'docs/', filter: 'isFile'},
                ],
              },
          },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: "src/<%= pkg.name %>.js",
                dest: "build/<%= pkg.name %>.min.js"
            }
        },
        jshint: {
            files: ['./src/*.js']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify','copy']);

};