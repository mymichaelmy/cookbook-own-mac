# cookbook-own-mac
Cookbook is an educational website to help professors to teach creative process and run project-based classes. This repo is the UI part of the website which fetches data from Drupal CMS. 

##Branches

production: This is the stable version which is deployed on AWS (http://54.153.57.8/). We announced it to several professors for testing.<br/> <br/>
production-monsoon: This is the version posted on Monsoon (http://172.18.0.22/ only available on corporate network). Some new feature and small fixes are added to this version.<br/>One problem for this version is that, the zip download function failed in collection page. I assume the problem is on server side since it works well on AWS and local server. There must be some configuration or installation needed on monsoon. I have debugged this for many days but haven't figured it out because of limited experience with server.

##Structure

##Installation

To get the UI working on local machine. You need to have a drupal installed as backend cms, and then configure the main url and port in cookbook.js to let the UI know the right url to request data. You can either <br/>
(1)install a local drupal, using Bitnami or DrupalVM. And install necessary module from https://github.com/mymichaelmy/drupalExt, enable features and import content. <br />
Or (2)fetch data directly from remote drupal online, yet you have to reset the header of Access-Control-Allow-Origin on server to enable CORS to allow you browser fetch data at local ip (OK for inner quick testing, but will be problematic on a published website).
<br /><br />

Then you move the whole content in the repository to your root directory of your local server. For example, "htdocs" directory when you using apache. root directory when you using node http-server. It should work.
