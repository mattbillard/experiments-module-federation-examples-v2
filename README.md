# Module Federation Examples

Experiments building on these official [Module Federation examples](https://github.com/module-federation/module-federation-examples)

This repo has a few examples
1. **module-federation-ts**  
  The [official Module Federation TypeScript example](https://github.com/module-federation/module-federation-examples/tree/master/typescript), with CSS, ts-loader (to output types), and organized/cleaned up a bit.  

1. **module-federation-ts-with-router**  
  One potential scalability problem for Module Federation is that each micro app requires a new port or domain. If you had for example 30 teams and 100 micro apps, it could quickly grow unmanageable. This example serves all the micro apps through one router.  

1. **remote-components**  
  Before Module Federation existed, I experimented with many ways of stitching micro apps into a micro frontend architecture. This was the most successful one and in some ways works very similarly to Module Federation, loading JS and CSS files at runtime and then mounting the React Component. (Note: this solution could easily be adabpted to use the router like the above solution.)

---

## Requirements

- Node v14
- Yarn v1.22.11

## Install

- Run the following in the root of the project
  ```
  yarn install
  ```

## Run

- Navigate to the directory of the example you want and run the following  
  ```
  yarn install
  yarn start
  ```
- Open your browsers to the links in the example's readme
