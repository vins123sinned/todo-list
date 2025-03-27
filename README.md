# todo-list
A simple todo list that allows for creating, reading, updating, and deleting todos. The todo list will also have sections of lists for organization and better quality of life. Data will be stored using JSON in the LocalStorage so data can be saved in between page reloads.

Inspired mainly by [Todoist](https://en.todoist.com) with a sprinkle of [Things](https://culturedcode.com/things/), this todo list website is fully functional and has all of the necessary features and functionality a todo list will ever need. From creating, reading, updating, or deleting sections and todos to being able to expand them and filter them, you can do anything you ever wish you could do with your todos. And while it looks simple the code underneath is a complex weave of many different code that interacts with each other while being loosely coupled. I hope you enjoy playing around with this todo!

## How it's made
**Techs Used:** HTML, CSS, JS, Webpack

**Packages Used**: 
* CSS-Loader, Style-loader - Reads CSS files imported and turns it into a JavaScript string and then applies it to the file
* HTML-Loader - Finds and bundles links in HTML files, such as an image `src` so that it won't be lost when Webpack optimizes it
* HTML-Webpack-Plugin - Bundles HTML code so that Webpack can find and use the HTML file as a template
* Webpack, Webpack-Cli, Webpack-Dev-Server, Webpack-Merge - Packages that help personalize or add features to Webpack and help make it work
* Date-FNS - A popular and handy npm package that helps format and run functions on date values

## Features
* Create, read, update, or delete your todos and sections
* Separate your todos into sections for organization
* Sort each todos by priority
* Set due dates and times for your todos
* Choose or change the section you want to place your todo in
* Expand to see your todos or edit them
* Mark todos as completed when you're done with them
* Filter your todos by today, upcoming (month), year, or all
* Clean and sleek design based off [Todoist](https://en.todoist.com)
* Store data on LocalStorage using JSON

## Installation
**IMPORTANT**: Make sure you have NODE.js and npm installed first!
1. Clone the repository:
`git clone git@github.com:vins123sinned/todo-list.git`
2. Navigate into project folder:
`cd todo-list`
3. Install all npm dependencies:
`npm install` 
4. Bundle code using webpack:
`npm run build` or `npm run dev`
5. And you're ready to start coding!

## Lessons learned
This project is by far the most complex and time consuming one that I've completed so far. It's complexities and the many different functionalities needed, such as CRUD (create, read, update, delete) operations and using localStorage, naturally led to the project taking longer than usual to complete. Despite all this complexity, I still found this project to be very rewarding and a great learning experience as the time I've spent working on this project helped me apply new JavaScript code and principles which I only had a few chances to use earlier. For example, I utilized classes to create my todo instances and localStorage to store them. Then, following the DRY (don't repeat yourself) principle I split up my code to make the project work into smaller functions, dividing and conquerering while slowly building up until the project was completed. By doing this, even a large project like a fully functioning todo list was made manageable and easy to complete.

With such a large amount of code needed to finish the project, the use of ES6 modules (imports and exports) came in handy for me. By simply creating an entry point and notifying Webpack, a module bundler, of its existence, a dependency graph will be automatically created and do the optimization and tracking work of managing your imports and exports for you. By doing so, my long lines of code can be logically and semantically split up into different files and imported as I wish, whether it is a JavaScript, CSS, or any other file. Not only will my code be split up and more understandable, but my code can also be optimized and easier to maintain simply due to how modules import and export intelligently and the structure of my codes are more robust and easy to grasp. Speaking of Webpack, this project gave me a chance to work on some new features of the bundler that I didn't use before. Splitting up my webpack configuration file into one for production and another for development gives me more control over the features I want in specific Webpack mode. Then, using npm scripts I am able to create more intuitive and personalized commands for webpack such as `npm run dev` or `npm run build` that makes it easier to control whatever feature I want during specific development/production modes. Another thing to note now is that I am more comfortable with navigating my way around the configuration file of webpack and asset managing is no longer a mysterious force that I can't comprehend anymore. Finishing this project made me realize that ES6 modules and webpack truly are indispensable tools in my toolbox that makes my coding quality of life better than it ever was.

With the structure of the code explained, one non-coding lesson I took away from all this was the importance of organizing your code before beginning to work on it. Even with a simple draft of the structure of my code and the layout, my productivity and code readability rose through roof due to the fact that I had a solid idea of what I was doing earlier. Compared to my past projects where I didn't bother with thinking about what my code should look like and started due to the preconception that it was a daunting task the projects where I did plan in advance went more smoothly and satifactory. The only time where my code became sloppy in this project was when I completed every code I've planned out in advanced but didn't do the same for new and unexpected pieces of code in my project. Completing this project made me realize the important of organization and being prepared, and that coding is both the writing of it itself and the bigger picture at the same time. Code is made up of smaller code, and so that smaller code needs to be well written as it is part of your completed code as a whole.
 
There were many lessons I've learned by the time I completed this project, yet at the same time there were also many setbacks. With such a complex and interrelated code there were bound to be many unexpected bugs as I built my code from the bottom up. My strategy for the todo list was to build different sections of the code and made sure they work before putting them neatly together like puzzle pieces. However, I ran into many unexpected bugs and error which wasted a lot of time as I had to spend them digging for the errors and fixing them. Although these errors and bugs were infuriating, it led me to realize that my current way of debugging my code was flawed and that even though bugs and errors are natural there needed to be a better way to test and find them. Another setback was the creation of DOM elements which was primarily due to the way I wrote them. Instead of following the DRY principle I kept on repeating repetitive code to create DOM (document object model) elements with only a slight difference between each element. Reflecting on this now, I realized that I should've created functions for the DOM element and added parameters to handle the differences and special features needed for each of them. This would prevent and make any unexpected bugs or error easier to find and it would also shave many lines of code off of my files since it's the main culprit. I originally thought that DRY principles were a guideline for your code and didn't really make a difference in writing good code, but it seems that it was referred to as a principle for a reason. All in all, the majority of the headaches stemmed mainly from my lack of planning beforehand and all of it helped me realize that planning and organizing your code beforehand is just as important as the actual programming part is. After all, they say that maintaining the code is 80% of the work while writing it is simply 20%.
