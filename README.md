# focal-point

[![npm version](https://img.shields.io/npm/v/@steinringer/focal-point)](https://www.npmjs.com/package/@steinringer/focal-point)

# Installation
```npm
npm i @steinringer/focal-point
```


# Usage
FocalPoints are Coordinates range between -1 and 1 for both x and y axes.

To apply these coordinates you have to use FocalPointFocus class which will make some calculations on image to fit into parent container's aspect ratios and dimensions.

```html
<div style="width: 800px; height: 300px">
    <img id="focused-image" src="assets/fat-thor.jpg" alt="">
</div>
```

```ts
this.imageElement = 
    document.getElementById("focused-image") as HTMLImageElement;

this.focusedImage = new FocalPointFocus(this.imageElement, { x: 0, y: 0 });
```
## Keep in mind
Call FocalPointFocus class in case your html template is ready to view.
>f.e. In case you are using Angular, move the logic into ngAfterViewInit() lifecycle hook.