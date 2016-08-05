module.exports = function(grunt) {
    // 配置
    // var mozjpeg = require('imagemin-mozjpeg');
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: '**/*.js',
                    dest: 'jsmin'
                }]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! 383104866@qq.com - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: [ 'jsmin/jquery-2.1.3.min.js','jsmin/mainprocess.js','jsmin/jquery.html5Loader.min.js','jsmin/jquery.html5Loader.line.js'],
                dest: 'dist/built.js'
            }
        },
        connect:{
            //这里为插件子刷新方式
            options: {
                port: 9022,
                hostname: '192.168.1.116', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729  //声明给 watch 监听的端口
            },
            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        '.'  //主目录
                    ]
                }
            }

        },
        watch: {
            sass: {
                files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}','sass/_module/**/*.{scss,sass}']
                //files: ['sass/*.scss']
                //tasks: ['compass:dist']
            },
            livereload: {
                options: {
                    livereload:'<%=connect.options.livereload%>'  //监听前面声明的端口  35729
                },
                files:[  //下面文件的改变就会实时刷新网页
                    './*.html',
                    'css/{,*/}*.css',
                    'js/{,*/}*.js',
                    'images/{,*/}*.{png,jpg}'


                ]
            }
        },
        encodeImages: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: 'main.css',
                    dest: 'css/'
                }]
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
                options: {                       // Target options
                    optimizationLevel: 7,
                    // svgoPlugins: [{ removeViewBox: false }],
                    // use: [mozjpeg()]
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'images/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },
        rev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [{
                    src: [
                        'images/**/*.{jpg,jpeg,gif,png}'
                    ]
                }]
            }
        },
        "bower": {
            "install": {
                "options": {
                    "targetDir": "./js/public/lib",
                    "layout": "byComponent",
                    "install": true,
                    "verbose": false,
                    "cleanTargetDir": false
                }
            }
        }
    });
    // 载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-encode-images");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-bower-task');
    // 注册任务
    // grunt.registerTask('default', ['uglify','concat','encodeImages','connect','watch']);
    grunt.registerTask('default', ['bower']);
};