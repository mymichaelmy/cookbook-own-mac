# cookbook-own-mac
Cookbook is an educational website to help professors to teach creative process and run project-based classes. This repo is the UI part of the website which fetches data from Drupal CMS. 

##Branches

production: This is the stable version which is deployed on AWS (http://54.153.57.8/). We announced it to several professors for testing.<br/> <br/>
production-monsoon: This is the version posted on Monsoon (http://172.18.0.22/ only available on corporate network). Some new feature and small fixes are added to this version (New category of cards, improved printing version, etc.).<br/>One problem for this version is that, the zip download function failed in collection page. I assume the problem is on server side since it works well on AWS and local server. There must be some configuration or installation needed on monsoon. I have debugged this for many days but haven't figured it out because of limited experience with server.

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
├── action.php           //php used to genertated zip files to pack up recipe cards on server side and return this zip file to user
├── app              //all angular templates and js for each kind of pages 
│   ├── about       //about page
│   │   ├── js
│   │   │   └── about.js
│   │   └── templates
│   │       └── about.html
│   ├── classroom-tip     //for classroom management card
│   │   ├── js
│   │   │   └── tipDetail.js
│   │   └── templates
│   │       ├── classroom-tip-template-backup.html
│   │       └── classroom-tip-template.html
│   ├── collection      //for collection page
│   │   ├── collection-template.html
│   │   └── collection.js
│   ├── common         //for common services shared by different controllers
│   │   └── js
│   │       └── commonService.js
│   ├── creative-mindset        //for creative-mindset page
│   │   ├── js
│   │   │   └── mindsetDetail.js
│   │   └── templates
│   │       └── mindset-template.html
│   ├── explore         //explore page
│   │   ├── js
│   │   │   └── explore.js
│   │   └── templates
│   │       └── explore-template.html
│   ├── index       //index page
│   │   ├── js
│   │   │   └── cardOnHomepage.js
│   │   └── templates
│   │       ├── index-card-template.html
│   │       └── index-template.html
│   ├── login       //login function which has not been published yet.
│   │   ├── js
│   │   │   └── login.js
│   │   └── templates
│   │       └── login-template.html
│   ├── method-card     //for method card 
│   │   ├── js
│   │   │   └── cardDetail.js
│   │   └── templates
│   │       └── methods-template.html
│   ├── recipe-list     //outdated 
│   │   ├── js
│   │   │   └── recipe-list.js
│   │   └── templates
│   │       └── recipe-list-template.html
│   ├── register        //register function which has not been published yet.
│   │   ├── js
│   │   │   ├── activation.js
│   │   │   ├── register.js
│   │   │   └── reset-password.js
│   │   └── templates
│   │       ├── activation-template.html
│   │       ├── register-template.html
│   │       └── reset-password-template.html
│   ├── search      //search function
│   │   ├── search-template.html
│   │   └── search.js
│   └── shared      //shared components used in different pages
│       ├── contribute-form     //contribute form on cards used to submit other links
│       │   ├── contributeFormDirective.html
│       │   └── contributeFormDirective.js
│       ├── nav     //outdated
│       ├── signup      //signup function is under development, outdated
│       │   ├── signupDirective.html        
│       │   └── signupDirective.js
│       └── vendor      //open-source code used for uploading files
│           └── angular-base64-upload.js
├── assets      //angular related open source code
│   ├── angular-1.5.8.min.js
│   ├── angular-animate.min.js
│   ├── angular-route-1.5.8.min.js
│   └── angular-spinkit
│    
├── bitnami.css     //bitnami default file after installation, have no use
├── config.rb       //sass configuration file
├── css         //compass output directory for stylesheet 
│   ├── bootstrap-theme.min.css
│   ├── bootstrap.min.css
│   ├── ie.css
│   ├── main.css
│   ├── print.css
│   └── recipes.css
├── disqus      //disqus plugin and controller
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
│   └── icons
│   
├── index.html
├── js      //some shared configuration and function across the site
│   ├── bootstrap.min.js
│   ├── cookbook.js
│   ├── routes.js
│   ├── test.js
│   └── utility.js
├── php
│   ├── action.php     //duplicate as the action.php in the root directory
│   ├── doc.php     //outdated
│   └── rtf.php     //for rtf generation for each card
├── sass            //input folder for compass
│   ├── ie.scss
│   ├── main.scss       //main scss file
│   ├── print.scss      //style for printing
│   └── recipes.scss
├── stylesheets     //default output folder for compass, not used anymore, can be deleted
│   ├── ie.css
│   ├── main.css
│   ├── print.css
│   └── screen.css
└── test
    
```