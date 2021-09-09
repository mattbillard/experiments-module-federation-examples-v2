# module-federation-ts-with-router Example

One potential scaleability problem for Module Federation is that each micro app requires a new port or domain. If you had for example 30 teams and 100 micro apps, it could quickly grow unmanageable. This example serves all the micro apps through one router.  

## Install

- Run the following 
  ```
  yarn install
  ```

## Run

- Run the following  
  ```
  yarn start
  ```
- Open the following in your browser
  - **app1 and app2 via router:** [localhost:3000/app1/](http://localhost:3000/app1/)

## Description 

Look at these files...  
- **app1/webpack.config.js**  
  **app2/webpack.config.js**   
  They have been modified to have `/app1/` and `/app2/` in their URLs.  

- **router/package.json**  
  After install, a postinstall script symlinks `app1/dist` and `app2/dist` into the router's own dist folder so it can serve their built files itself.  

- **router/webpack.config.js**
  The router's webpack config is very basic. It just serves content from router/dist.  
