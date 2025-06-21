# Simple Blog Manager

This is a simple blog post manager web app that allows users to:
- View all posts
- See details of a selected post
- Add a new blog post
- Edit an existing post
- Delete a post

## Features

- Built with HTML, CSS, and JavaScript
- Uses JSON Server as a mock backend
- Dynamic rendering of posts
- Edit and Delete functionality

##  Folder Structure

.
├── css
│   └── styles.css
├── db.json
├── index.html
├── README.md
└── src
    └── index.js

## How To Run It
Start JSON Server
Make sure you have JSON Server installed:
npm install -g json-server

json-server --watch db.json
Open the app
Open index.html in your browser. Posts will load from http://localhost:3000/posts.


