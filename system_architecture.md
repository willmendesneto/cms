## MST Website

The MST (Movimento dos Trabalhadores Rurais Sem Terra) have been longing for a proper solution for its website. The previous one was based on a heavy and outdated CMS, they lacked the technical staff to maintain it.

### Main Purpose of this Solution

The goal was to provide the user with a simple way to publish a static site. We've chosen to use Jekyll + Liquid. The former is a engine to convert Markdown files to HTML and the latter is a template language.


### Overall Architecture of the Solution

1. https://github.com/movimento-sem-terra/site-novo - The Jekyll blog, published using GitHub pages.

2. https://github.com/movimento-sem-terra/cms - The CMS used to generate the posts and commit them to the blog

3. https://github.com/movimento-sem-terra/mst-image-service - Responsible for uploading documents, to be attached to posts

4. https://github.com/movimento-sem-terra/mst-cron - A simple CRON job to import the posts from the previous site and publish them on the new blog

### Lifecycle

The client creates a new post on the CMS, that generates a Markdown file and put it inside the site-novo's '_posts' folder. Then Jekyll runs and processes all the posts, putting them inside the '_sites' folder.

In order to the blog to get published we need to perform the Github Pages necessary steps (detailed here: https://pages.github.com/) that consists, basically, of having a 'gh-pages' branch, which will be used as source.

### Version Control

We are using, for now, the github repository from MST organization to host all the necessary projects. It is possible that someday we remove some projects from there, like the CMS.

### Aknowledgements

The Client knows about the OpenSource way and have agreed on working like that. All code is open, because of that think twice before commiting code to master! The community is following us!

Static files:

The problem: Show the same information to many user.
What they have now: A huge and older CMS call drupal to create static content.
Which that bring together:
Slow, really, slow, the average to page load are 30 seconds.
Security, they have only one user to do anything.
Security, DDoS, zero-day and another of security issues they have now because the drupal version, currently 6.22 ( lasted update 2011 )
Ugly
Indexing content, to now is hard to spiders index all information
Without semantic
Maintain a complicated and very large database
Not responsive
Pay to maintain online
What we offer to then: A new website without drupal.
What more?
Fast, using a lot of techniques with cache, compress and other stuff to make a better experience to the users.
Free to maintain online
Security, without hacker attacks
Beautiful and clean
Can tracking any action from the user
Responsive
Easy to deploy in any place
Easy to another social movements do a fork
Index information
Web Server:

We don't pay to web server, we chose use Github Pages to host our static files.
Why?
The Github have a big infra to take care ours files and we are using Github to save our code it's easy do a deploy.
If the user wanna change?
 It's simple, change the deploy to send all files to the new web host
Do we have a hard link with github?
No, we can change any time, without a lot a work just move the HTML files to another server like Apache but reproduce the same infra from github it's expensive and hard to maintain.

Content Management System:

To the user create a new Markdown files, they need a tool and these kind of tool already exists, like prose.io, but to final user it is impossible, because that we created a new using CKEditor.

How is it works?
Simple, the user create a new content and this content go to '_posts' folder inside the webapp code and then the jekyll run and compile to html files.
Do we need send all time to github?
Now, yes because all code are in github, if the client chose other serve to save the code this place need be have a git server to the CMS send the content.
Are you seeing we depending the git?
Yes, for now, we don't need implement in other way now, because we are using the git to the code, with we change to other think we can easily change the way to save the content, for sample save text files using ssh.
Is it not complex? I mean we need do a lot of step to create a new post
 Yes, that is the challenge of the project, we need do all these stuff and a simple way to make generic to others social movements.
Why not using a database?
To save files? The jekyll working with static files, we don't need using a huge and expensive database to read static content.

Authentication:

Here it's another challenge, we chose using a third-party way to authentic with security. Our main motivation was to reuse an existing authentication service instead of building our own solution from scratch. For that, we decided to use auth.io.

How the authorization works?
For authorization, we leveraged the Github organizations feature. That way, we can provide authorized access only for a specific group of users. Here again, we didn't need to write our own authorization code from scratch.

If we need remove from github?
We can choose any service (auth.io, for instance, supports Google, Twitter, Facebook, and many others) to provide authentication, but for now, Github is easier because a Github user can create commits to the repository (as new posts) directly. If we use any other authentication service, we would have to come up with a customized way to create those commits.

Images:

Before that the client user the locaweb to host all images and PDF, because of that they get a lot of problem with slowness and difficult to manager these files and do backups, they needed maintain a big infra to save an increasing amount of images.

The Idea: Using a free CDN ( Flickr, photoboot, picasa and etc ) to save all image and using the cloud ( drive, mega, dropbox and etc) to save all PDF files.
The Solution: Create a restful service to save all images (using CDN and cloud services behind the scenes) and files in the cloud and return a link to have access to these contents.

How do we have a communication with these services?
 We created a API Keys inside Flickr and Google Drive to have access to their API's from inside our image service.

But, who can upload files?
We are using the same authentication from CMS, if the user have access to Github then can upload files.


Jekyll:

I'll write more about why Jekyll, but for now I bag to you read this post: http://developmentseed.org/blog/2012/07/27/build-cms-free-websites/
