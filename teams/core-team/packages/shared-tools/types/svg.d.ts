// NOTE: need to define a type for SVG files so TypeScript doesn't complain when you import them
declare module '*.svg' {
  const content: any;
  export default content;
}
