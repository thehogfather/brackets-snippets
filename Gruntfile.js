module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jslint: {
            all: {
                src: ["*.js", "src/**/*.js", "nls/**/*.js"],
                directives: {
                    "node": true,
                    "nomen": true,
                    "regexp": true,
                    "sloppy": true,
                    "todo": true,
                    "vars": true,
                    "unparam": true,
                    "globals": {
                        "$": true,
                        "document": true,
                        "brackets": true,
                        "define": true,
                        "Mustache": true
                    }
                }
            }
        },
        jshint: {
            files: ["*.js", "src/**/*.js", "nls/**/*.js"],
            options: {
                jshintrc: true
            }
        },
        lesslint: {
            src: ["styles/**/*.less"],
            options: {
                csslint: {
                    "ids": false,
                    "important": false,
                    "known-properties": false
                }
            }
        },
        jscs: {
            src: ["*.js", "src/**/*.js", "nls/**/*.js"],
            options: {
                config: ".jscs.json"
            }
        },
        compress: {
            main: {
                options: {
                    archive: "brackets-snippets.zip"
                },
                files: [
                    { src: ["nls/**"], dest: "/" },
                    { src: ["shell/**"], dest: "/" },
                    { src: ["src/**"], dest: "/" },
                    { src: ["styles/**"], dest: "/" },
                    { src: ["templates/**"], dest: "/" },
                    { src: ["thirdparty/**"], dest: "/" },
                    { src: ["LICENSE", "*.js", "*.json", "*.md"], dest: "/", filter: "isFile" }
                ]
            }
        },
        lineending: {
            dist: {
                options: {
                    eol: "lf",
                    overwrite: true
                },
                files: {
                    "": [
                        "main.js",
                        "strings.js",
                        "Gruntfile.js",
                        "nls/**/*.js",
                        "shell/**/*.*",
                        "src/**/*.js",
                        "styles/**/*.less",
                        "templates/**/*.html",
                        "thirdparty/**/*.js"
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-jslint");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-lesslint");
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-lineending");

    grunt.registerTask("package", ["lineending", "compress"]);
    grunt.registerTask("jslint-test", ["jslint"]);
    grunt.registerTask("jshint-test", ["jshint"]);
    grunt.registerTask("less-test", ["lesslint"]);
    grunt.registerTask("test", ["jshint", "jscs"]); // for Travis

};
