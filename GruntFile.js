
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files: [
                    {
                        src: ["src/scripts/fluxionScrollbar.js"],
                        dest: "build/scripts/fluxionScrollbar.min.js"
                    }
                ]
            }
        },
        less: {
            css: {
                files: [
                    {
                        src: ["src/styles/fluxionScrollbar.less"],
                        dest: "build/styles/fluxionScrollbar.css"
                    }
                ]
            }
        },
        watch: {
            js: {
                files: "src/scripts/**/*.js",
                tasks: ["uglify", "mocha_phantomjs"]
            },
            css: {
                files: "src/styles/**/*.less",
                tasks: ["less"]
            },
            tests: {
                files: "tests/**/*.js",
                tasks: ["mocha_phantomjs"]              
            }
        },
        mocha_phantomjs: {
            all: ['tests/**/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    
    grunt.registerTask("default", ["build"]);
    grunt.registerTask("build", ["uglify", "less", "mocha_phantomjs"]);
    grunt.registerTask("test", ["mocha_phantomjs"]);
    grunt.registerTask("develop", ["watch"]);
};
