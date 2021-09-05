# useResponsiveClass

## Motivation: Proof of concept

The idea behind this hook is to apply at component level the same mechanics provided by the media queries but in this case taking as a reference the space occupied by the component itself.

A use case would be the need to create components that are represented differently depending on the space they are going to have. For example, for a responsive component library published in npm.

The hook receives a reference to the component to be controlled and optionally breakpoints to be used.
In case of not receiving breakpoints, predefined ones will be used.

```javascript
  interface breakpointsInput {
      readonly [key: string]: number;
  }
```
  Example (defaults breakpoints):
  ```javascript
    const MEDIA_BREAKPOINTS: breakpointsInput = {
        small: 420,
        big: 768,
    };
  ```

Size ranges will be created according to the breakpoints used with their respective classes.
```javascript
  interface mediaBreakpoints {
    class: string;
    from: number;
    toUnder: number;
  }

  const mediaBreakpoints = createMediaBreakpoints(MEDIA_BREAKPOINTS);
```
  Sample response:
  ```javascript
    [
        {
            class: "to-small",
            from: 0,
            toUnder: 420,
        },{
            class: "from-small-to-under-big",
            from: 420,
            toUnder: 768,
        },{
            class: "from-big",
            from: 768,
            toUnder: Infinity,
        }
    ]
  ```

Each time a change is made to the size of the component, the class corresponding to that size range will be returned.
```javascript
  getCurrentSizeClass(elementWidth, mediaBreakpoints) : "to-small" | "from-small-to-under-big" | "from-big"
```
How to use the hook:
```javascript
    const elRef = createRef<HTMLElement>();
    const [responsiveClass] = useResponsiveClass(elRef);
    return (<div ref={elRef}>{responsiveClass}</div>);
```
The styles should be something like this:
```javascript
  .root {
      &.to-small {
          background-color: green;
      }
      &.from-small-to-under-big {
          background-color: yellow;
      }
      &.from-big {
          background-color: red;
      }
  }
```
The package was generated following these guidelines:
[https://reactgraphql.academy/react/a-typescript-tale-how-to-publish-a-custom-hook-on-npm-with-typescript](https://reactgraphql.academy/react/a-typescript-tale-how-to-publish-a-custom-hook-on-npm-with-typescript "Custom hook on npm")

A third party hook was used for ResizeObserver:
[https://www.npmjs.com/package/@react-hook/resize-observer](https://www.npmjs.com/package/@react-hook/resize-observer "useResizeObserver")