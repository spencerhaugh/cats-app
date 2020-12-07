# Catabase!
## Project 2: SEI 9-21

After 6 weeks of study, came Project 2! Project 2 was another solo project, to be deployed to Heroku, and using Node.js and Express intergrated with a MongoDB database & Mongoose. This project required us to utilize MVC conventions, as well as implementing authentication (via bCrypt). This app is rendered sever-side, and was focused on building our back-end.

I created a full CRUD RESTful app that tracks a user-uploaded database of cats, and allows users to rank the cats with "likes". Users that are logged in can add new cats, edit cats, delete cats, and "like" cats.

LINK:
[Catabase App](https://enigmatic-island-67697.herokuapp.com/catabase)

Feature List:

* Cats are displayed on the index page in decending order of total likes.
* Users must be logged in to add, edit, delete, or like cats.
* Once a user has liked a cats, they can not like it again.
* Username is displayed in the title area of the header when logged in.
* Fully responsive
* Interactive UI, all buttons and cats have hover effects and visual effects
* Non-logged in users attempting to Create are directed to the login page.

## Summary

I wanted to make an app that looked great, and that people would be drawn in to interacting with. I settled on ranking cats because, well, the internet loves cats! I think the concept is one that the general public could easily become enamoured with.

## Technologies used

This app was build on a Mongo database, which has schemas for both users and cats. It utilizes Express and Nodejs, with Mongoose to interface with the database, to create the stack for this interactive site. User passwords are encrypted using bcrypt. The RESTful routes adhere to the MVC file structure.

App users have access to full CRUD, while non-logged in users can browse all pages, but can not create, edit, or delete. I initially added Skeleton CSS framework, but I actually felt like I had less control over what I was trying to do with the site, so I ended up coding all the CSS on my own.
I was also able to implement EJS partials for my navbar and header.

This app has been deployed online via Heroku, and is available to the public at the link above.

## Challenges

The most difficult parts of this app was getting the connection between the cat model and user model correct, so that when clicking the "like" button, the user was associated with the cat, and the cats like count incremented by 1. Figuring out how to accomplish two things on one click was more than I anticipated. 

I would still like to update the app further to retrict cat editing/deleting to only the user that created it. I think now that I finally have the like button working, that it wouldn't be too much of a stretch to implement that feature.

The other item on my wish list that I did not have time to research/implement was image upload. I think moving beyond the Image URL input is crucial for this app to move beyond 'class project' and into a viable for public use. I honestly do not know how hard that would be to add, or if it's even viable using MongoDB. Something to look into!

## Original Wireframe

![Wireframe image](/images/CatabaseInitialWireframe.png)