# Dongheon-Ryu-IS24-full-stack-competition-req97073

* Frontend: React.js, Javascript
* Backend: Node.js Express, Javascript

## How to install 
```
**Project tree**

Root folder
├── backend
│   ├── database
│   ├── product
│   ├── server.js
│   └── swaggerDoc.json
├── frontend
│   ├── public
│   ├── src
│   ├── package-lock.json
│   └── package.json
├── .gitignore
├── package-lock.json
├── package.json
└── README.md 

```
This repository consists of a frontend and a backend folder. 
To run without error, you need to install node modules for both frontend and backend.

**Important!**
* Make sure your computer has Node.js and the version should be above version of  17.x  
* Please follow the order of the installation


### Order of the installation

#1 Install backend node module
1. Make sure you are in the root folder directory Dongheon-Ryu-IS24-full-stack-competition-req97073
2. Run terminal, and type npm install and press enter
	> npm install
3. Confirm that node_modules folder is created
4. Now you installed node_modules for backend

#2 Install frontend node module
1.  At the terminal, move to frontend folder 
      > cd frontend
2. Type npm install and press enter
	 > npm install
3.  Confirm that node_modules folder is created in frontend folder
4.  Move to the root folder, using cd command
5.  At the root folder, run npm start command
	> npm start
6. It will run at http://localhost:3001/ on your browser

## Troubleshooting 

* Make sure you type 'npm start' at root folder
* Make sure there are no other applications are running on port 3000, 3001
* If npm start is not working, you need to run each backend and frontend using different command at the root folder
	* At the root folder type npm run server and confirm server is running on port 3000
		 > npm run server 
	* Open another terminal, type 'npm run client' and confirm that application is running on localhost:3001
		> npm run client

*You should run backend first and run client

## Swagger Documentation
After the server is running you can see at [http://localhost:3000/api/api-docs](http://localhost:3000/api/api-docs).