# cookbook-own-mac
Cookbook is an educational website to help professors to teach creative process and run project-based classes. This repo is the UI part of the website which fetches data from Drupal CMS. 

##Branches

production: This is the stable version which is deployed on AWS (http://54.153.57.8/). We announced it to several professors for testing.<br/> <br/>
production-monsoon: This is the version posted on Monsoon (http://172.18.0.22/ only available on corporate network). Some new feature and small fixes are added to this version.<br/>One problem for this version is that, the zip download function failed in collection page. I assume the problem is on server side since it works well on AWS and local server. There must be some configuration or installation needed on monsoon. I have debugged this for many days but haven't figured it out because of limited experience with server.

##Installation

To get the UI working on local machine. You need to have a drupal installed as backend cms, and then configure the main url and port in cookbook.js to let the UI know the right url to request data. You can either <br/>
(1)install a local drupal, using Bitnami or DrupalVM. And install necessary module from https://github.com/mymichaelmy/drupalExt, enable features and import content. <br />
Or (2)fetch data directly from remote drupal online, yet you have to reset the header of Access-Control-Allow-Origin on server to enable CORS to allow you browser fetch data at local ip (OK for inner quick testing, but will be problematic on a published website).
<br /><br />

Then you move the whole content in the repository to your root directory of your local server. For example, "htdocs" directory when you using apache. root directory when you using node http-server. It should work.

##Structure
```
├── 503.html
├── README.md
├── action.php
├── app
│   ├── about
│   │   ├── js
│   │   │   └── about.js
│   │   └── templates
│   │       └── about.html
│   ├── classroom-tip
│   │   ├── js
│   │   │   └── tipDetail.js
│   │   └── templates
│   │       ├── classroom-tip-template-backup.html
│   │       └── classroom-tip-template.html
│   ├── collection
│   │   ├── collection-template.html
│   │   └── collection.js
│   ├── common
│   │   └── js
│   │       └── commonService.js
│   ├── creative-mindset
│   │   ├── js
│   │   │   └── mindsetDetail.js
│   │   └── templates
│   │       └── mindset-template.html
│   ├── explore
│   │   ├── js
│   │   │   └── explore.js
│   │   └── templates
│   │       └── explore-template.html
│   ├── index
│   │   ├── js
│   │   │   └── cardOnHomepage.js
│   │   └── templates
│   │       ├── index-card-template.html
│   │       └── index-template.html
│   ├── login
│   │   ├── js
│   │   │   └── login.js
│   │   └── templates
│   │       └── login-template.html
│   ├── method-card
│   │   ├── js
│   │   │   └── cardDetail.js
│   │   └── templates
│   │       └── methods-template.html
│   ├── recipe-list
│   │   ├── js
│   │   │   └── recipe-list.js
│   │   └── templates
│   │       └── recipe-list-template.html
│   ├── register
│   │   ├── js
│   │   │   ├── activation.js
│   │   │   ├── register.js
│   │   │   └── reset-password.js
│   │   └── templates
│   │       ├── activation-template.html
│   │       ├── register-template.html
│   │       └── reset-password-template.html
│   ├── search
│   │   ├── search-template.html
│   │   └── search.js
│   └── shared
│       ├── contribute-form
│       │   ├── contributeFormDirective.html
│       │   └── contributeFormDirective.js
│       ├── nav
│       ├── signup
│       │   ├── signupDirective.html
│       │   └── signupDirective.js
│       └── vendor
│           └── angular-base64-upload.js
├── assets
│   ├── angular-1.5.8.min.js
│   ├── angular-animate.min.js
│   ├── angular-route-1.5.8.min.js
│   └── angular-spinkit
│       ├── LICENSE.md
│       ├── README.md
│       ├── bower.json
│       ├── build
│       │   ├── angular-spinkit.js
│       │   ├── angular-spinkit.min.css
│       │   ├── angular-spinkit.min.js
│       │   ├── index.js
│       │   └── templates.js
│       ├── gruntfile.js
│       ├── package.json
│       └── src
│           ├── angular-spinkit.css
│           ├── angular-spinkit.js
│           └── templates
│               ├── chasingDotsSpinner.html
│               ├── circleSpinner.html
│               ├── cubeGridSpinner.html
│               ├── doubleBounceSpinner.html
│               ├── fadingCircleSpinner.html
│               ├── pulseSpinner.html
│               ├── rotatingPlaneSpinner.html
│               ├── threeBounceSpinner.html
│               ├── wanderingCubesSpinner.html
│               ├── waveSpinner.html
│               └── wordPressSpinner.html
├── bitnami.css
├── config.rb
├── css
│   ├── bootstrap-theme.min.css
│   ├── bootstrap.min.css
│   ├── ie.css
│   ├── main.css
│   ├── print.css
│   └── recipes.css
├── disqus
│   ├── dirDisqus.js
│   └── disqusController.js
├── favicon.ico
├── fonts
│   ├── glyphicons-halflings-regular.eot
│   ├── glyphicons-halflings-regular.svg
│   ├── glyphicons-halflings-regular.ttf
│   ├── glyphicons-halflings-regular.woff
│   └── glyphicons-halflings-regular.woff2
├── images
│   ├── Brainstorming.jpg
│   ├── Interviewing.jpg
│   ├── Star-hollow.png
│   ├── Star-solid.png
│   ├── Synthesis.jpg
│   ├── arrow-down.png
│   ├── coming-soon.png
│   ├── course-background-thumbnail.png
│   ├── course-head.png
│   ├── icons
│   │   ├── add.png
│   │   ├── blue-add.png
│   │   ├── blue-download.png
│   │   ├── blue-rec.png
│   │   ├── blue-share.png
│   │   ├── download.png
│   │   ├── green-add.png
│   │   ├── green-download.png
│   │   ├── green-rec.png
│   │   ├── green-share.png
│   │   ├── paper.png
│   │   ├── pencil.png
│   │   ├── rec.png
│   │   ├── red-add.png
│   │   ├── red-download.png
│   │   ├── red-rec.png
│   │   ├── red-share.png
│   │   ├── share.png
│   │   └── video.png
│   ├── icons-s47e4bb7315.png
│   ├── index-banner.png
│   ├── index-classroom.png
│   ├── index-course.png
│   ├── index-method.png
│   ├── method-background-thumbnail.png
│   ├── method-head.png
│   ├── nothing-yet.png
│   ├── quit.png
│   ├── sap.png
│   ├── tip-background-thumbnail.png
│   ├── tip-head.png
│   ├── tip-home.png
│   ├── ucsd.png
│   └── what-is-recipes.png
├── index.html
├── js
│   ├── bootstrap.min.js
│   ├── cookbook.js
│   ├── routes.js
│   ├── test.js
│   └── utility.js
├── php
│   ├── action.php
│   ├── doc.php
│   └── rtf.php
├── sass
│   ├── ie.scss
│   ├── main.scss
│   ├── print.scss
│   └── recipes.scss
├── stylesheets
│   ├── ie.css
│   ├── main.css
│   ├── print.css
│   └── screen.css
└── test
    ├── 1470353932\ copy.zip
    ├── 1470353932.zip
    ├── Archive
    │   ├── 1470353932\ copy.zip
    │   └── 1470353932.zip
    ├── Archive.zip
    ├── Create_a_Zip_File_Using_PHP
    │   ├── files
    │   │   ├── HTML5.png
    │   │   ├── SampleFile.docx
    │   │   └── SampleFile.pdf
    │   └── index.php
    ├── Create_a_Zip_File_Using_PHP\ 2
    │   ├── files
    │   │   ├── HTML5.png
    │   │   ├── SampleFile.docx
    │   │   └── SampleFile.pdf
    │   └── index.php
    ├── Create_a_Zip_File_Using_PHP.zip
    ├── HTML5.png
    ├── SampleFile.docx
    ├── SampleFile.pdf
    ├── action.php
    ├── files
    │   ├── HTML5.png
    │   ├── SampleFile.docx
    │   └── SampleFile.pdf
    ├── index.html
    └── test.php
```
