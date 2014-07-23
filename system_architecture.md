## MST Website

The MST (Movimento dos Trabalhadores Rurais Sem Terra) have been longing for a proper solution for its website. The previous one was based on a heavy and outdated CMS, they lacked the technical staff to maintain it.

### Main Purpose of this Solution

The goal was to provide the user with a simple way to publish a static site. We've chosen to use Jekyll + Liquid. The former is a engine to convert Markdown files to HTML and the latter is a template language.


### Overall Architecture of the Solution

1. [Site-Novo](https://github.com/movimento-sem-terra/site-novo) - The Jekyll blog, published using GitHub pages.

2. [CMS](https://github.com/movimento-sem-terra/cms) - The CMS used to generate the posts and commit them to the blog

3. [Image-Service]( https://github.com/movimento-sem-terra/mst-image-service) - Responsible for uploading documents, to be attached to posts

4. [MST-CRON]( https://github.com/movimento-sem-terra/mst-cron) - A simple CRON job to import the posts from the previous site and publish them on the new blog

5. [Snap-CI](http://snap-ci.com) - A continuos delivery tool, used to perform the deploys between the applications

### Version Control

We are using, for now, the github repository from MST organization to host all the necessary projects. It is possible that someday we remove some projects from there, like the CMS.

### Aknowledgements

The Client knows about the OpenSource way and have agreed on working like that. All code is open, because of that think twice before commiting code to master! The community is following us!

### Current Scenario

The problem: Present the same information to many users.

What they have now:

* A huge and old CMS called [Drupal](https://www.drupal.org/) to create static content.

* The average page load is 30 seconds

* Only one admin user to do everything.

* Security, DDoS, zero-day and another of security issues due the Drupal version, currently 6.22 (lasted updated in 2011)

* Ugly layout

* Indexing problems. It is hard for web crawlers to index the site's information

* No semantic at all

* Maintain a complicated and very large database

* Not responsive

* Paid online hosting

### Proposed Scenario

* A new website that does not uses Drupal

* Faster page loads, using a lot of techniques such as cache, compress and others to deliver a better experience to the users

* Free online hosting

* No hacker attacks

* Beautiful and clean

* Tracking of every user interaction

* Responsiveness

* Easy to deploy

* Easy for another social movements to do a fork and start using it

* Indexing friendly

### Web Hosting

[Github Pages](https://pages.github.com) is our choice.

They have a big infrastructure to take care ours files and we are using Github to save our code, thus it's easier to deploy.

In case the client might want to change it, it's simple, just need to change the deploy to send all the files to the new web host.

That said, we are not tied to Github. We can change any time, without a lot of work, just move the HTML files to another server, running an Apache for instance. But reproducing the same infrastructure we have on Github is extremely expensive and hard to maintain.

### Content Management System

To create a new Markdown files, the user needs a tool, such as [Prose.io](http://prose.io),  but that's not feasible for the MST. Thus we created a CMS application based on [CKEditor](http://ckeditor.com/).

### CMS Post Lifecycle

This is what happens when a user creates a new post:

1. The CMS creates a Markdown file and commits it to the Master branch on the Site-Novo's repository

2. The Snap-CI detects the commit and fires a deploy script to run Jekyll.

3. The aforementioned script converts all the Markdown files on the "_posts" folder into HTML files and place them on the "_site" folder.

4. Then, all these files are pushed to the "gh_pages" branch, in order to Github Pages be able to publish them to the website

### Github Dependency

This current solution relies strongly on Github, but in case the MST decides to change it we should be able to do it. We would only need a new GIT server.

### Complexity

This solution might seem a little over complicated for a simple CMS, and in truth it is. And that's our challenge!

Our goal is not only to be used by the MST but also be used by other social projects. By adhering to this we designed a solution based on the open-source community, best practicies, and tools.

### Data Storage

Jekyll works with static content, thus we don't need to use a huge and expensive database only to deal with this kind of information.

### Authentication

Here it's another challenge, we chose using a third-party way to authenticate securely. Our main motivation was to reuse an existing authentication service instead of building our own solution from scratch. For that, we decided to use [OAuth.io](https://oauth.io/).

For this authorization, we leveraged the Github's Organizations feature. That way, we can provide authorized access only for a specific group of users. Here again, we didn't need to write our own authorization code from scratch.

In the need of removing the dependency on Github, we can choose to use any other service (OAuth.io, for instance, supports Google, Twitter, Facebook, and many others) to provide authentication.

But for now Github is easier because a Github user can create commits to the repository (as new posts) directly. If we use any other authentication service, we would have to come up with a customized way to create those commits.

### Images

With the current solution the MST uses the Locaweb web hosting to host all images and PDF files. Because of that they get a lot of problem with slowness and difficult to manage these files and do backups. They need to maintain this big infrastructure to save an increasing amount of images.

The new solution is to use a free CDN (Content Delivery Network), such as Flickr, PhotoBooth, Picasa, etc, to save all the images and use the cloud storage, such as Google Drive, Mega, Dropbox, etc, to save all the PDF files.

This is the responsibility of the Image-Service application. It's a RESTful service for saving both images and PDF files to each respective service (either CDN or Cloud Storage) and return with the appropriate URL.

The platforms of choice are [Flickr](http://www.flickr.com/) and [Google Drive](http://drive.google.com). And for each one of them API keys were created and stored within the Image-Service application.

Finally, this application uses the same authentication schema from the CMS, thus if a user has access to creating posts, he has access to upload files.

### Jekyll

We will write a little more about Jekyll, but for now we recommend you to read this post:

http://developmentseed.org/blog/2012/07/27/build-cms-free-websites/
