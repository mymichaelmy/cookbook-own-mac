# cookbook-own-mac
Cookbook is an educational website to help professors to teach creative process and run project-based classes. This repo is the UI part of the website which fetches data from Drupal CMS. 

##Branches
production: This is the stable version which is deployed on AWS (http://54.153.57.8/). We announced it to several professors for testing.<br/> <br/>
production-monsoon: This is the version posted on Monsoon (http://172.18.0.22/ only available on corporate network). Some new feature and small fixes are added to this version.<br/>One problem for this version is that, the zip download function failed in collection page. I assuem the problem is on server side since it works well on AWS and local server. There must be some configuration or installation needed on monsoon. I have debuged this for many days but haven't figured it out since limited experience with server.

##Structure
