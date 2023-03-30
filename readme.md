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
* 2023 Mar 29, react-create-app has warning issue.

	[1] (node:59920) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
	[1] (Use `node --trace-deprecation ...` to show where the warning was created)
	[1] (node:59920) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.

This not affect my solution's function because is react-create-app's issue however if you don't want to see above warning. please follow my instruction.
After you install the frontend's node module.
1. Please go to react-scripts folder
2. Find config > webpackDevServer.config.js
3. In the file, you can see two functions 'onBeforeSetupMiddleware' , 'onAfterSetupMiddleware'
4. Remove them and copy below code.

setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
          throw new Error('webpack-dev-server is not defined')
      }
  
      if (fs.existsSync(paths.proxySetup)) {
          require(paths.proxySetup)(devServer.app)
      }
  
      middlewares.push(
          evalSourceMapMiddleware(devServer),
          redirectServedPath(paths.publicUrlOrPath),
          noopServiceWorkerMiddleware(paths.publicUrlOrPath)
      )
  
      return middlewares;
}

5. Make sure there are no warnings


* Make sure your computer has Node.js and the version should be above 17.x  
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
	* At the root folder, type npm run server and confirm server is running on port 3000
		 > npm run server 
	* Open another terminal, type 'npm run client' and confirm that application is running on localhost:3001
		> npm run client
* If the port is already used
	* this will list all PID listening on this port, once you have the PID you can terminate it with the following:
		> sudo lsof -i :3000	
	* Terminate the PID
		> kill -9 PIDNUMBER


*You should run backend first and run client


## Swagger Documentation
After the server is running you can see at [http://localhost:3000/api/api-docs](http://localhost:3000/api/api-docs).