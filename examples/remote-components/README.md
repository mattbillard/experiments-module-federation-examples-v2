# remote-components Example

Before Module Federation existed, I experimented with many ways of stitching micro apps into a micro frontend architecture. This was the most successful one and in some ways works very similarly to Module Federation, loading JS and CSS files at runtime and then mounting the React Component. (Note: this solution could easily be adabpted to use the router like the above solution.)

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
  - **app1:** [localhost:3001](http://localhost:3001/)
  - **app2:** [localhost:3002](http://localhost:3002/)

## Details

When I created this micro frontend architecture solution, Module Federation didn't yet exist. Now that Module Federation does exist, I would recommend choosing it over remote-components for the following reasons

**Pros of Webpack Module Federation**
  - It is the official micro frontend architecture solution of the JavaScript ecosystem, so it has documentation, community, will grow over time, and you can google your questions 
  - Automatically works with React.Lazy and React.Suspense
  - Code reads easier: <Button /> instead of just generic <RemoteComponent />. (Although I suppose with some work this could be solved.)
  - Imported components aren't wrapped in an extra span, simplifying HTML / better for flexbox
  - Gives you choice of singletons for other things like lodash, moment, etc 
