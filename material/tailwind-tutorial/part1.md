
# Tailwind CSS Tutorial for Beginners ...

- [Theory: Exploring Tailwind Basics](#theory-exploring-tailwind-basics)
- [Practice: Creating A Simple Header](#practice-creating-a-simple-header)

---
## Theory: Exploring Tailwind Basics

There are four main factors involved in every web design project:

- **Layout**. It all starts with a blueprint. This defines how the whitespace and elements of our design are organized and ordered.
- **Typography**. This includes all text content, including messages.
- **Colors**. This brings life to a design and defines a design’s mood and brand.
- **Imagery**. This includes the visuals of a design, such as icons, images, illustrations, and so on.


### Layout

In this section, we’ll explore briefly the most commonly used classes for layout composition. We can group classes by their function, as follows:

- **Size**. This includes [width](https://tailwindcss.com/docs/width) and [height](https://tailwindcss.com/docs/height) utilities for setting an element’s dimensions.
- **Space**. This includes [margin](https://tailwindcss.com/docs/margin) and [padding](https://tailwindcss.com/docs/padding) utilities for adding space in our design.
- **Position**. This includes an element’s [positioning](https://tailwindcss.com/docs/position) and [coordinates](https://tailwindcss.com/docs/top-right-bottom-left).
- **Borders**. This includes various utilities for setting an element’s borders, such as [style](https://tailwindcss.com/docs/border-style), [width](https://tailwindcss.com/docs/border-width), and [radius](https://tailwindcss.com/docs/border-radius).
- **Display**. This includes the way elements are [rendered](https://tailwindcss.com/docs/display).


In modern CSS, we have also Flexbox and Grid classes for building a layout. Flexbox utilities, as they’re much simpler and easier to use for beginners.

When we use Flexbox, we start by creating a flex container by adding a `flex` class to a parent element. Then we add additional flex classes to configure how the flex items inside the container (direct children) will be displayed. For example, to render flex items vertically as a column, we add a `flex-col` class along with the `flex` class:

```html
<div class="flex flex-col">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

This is the base for applying flex classes. There are plenty of them in Tailwind, and it would be tedious to explain each one individually. 

#### Typography

Now that we have a layout, the next step is to add the content we want to display. This is mostly done by using text. Here are the most commonly used text utilities grouped by function:


- **Font**. This includes [font family](https://tailwindcss.com/docs/font-family), [size](https://tailwindcss.com/docs/font-size), [style](https://tailwindcss.com/docs/font-style) and [weight](https://tailwindcss.com/docs/font-weight) utilities, as well as [tracking](https://tailwindcss.com/docs/letter-spacing) and [leading](https://tailwindcss.com/docs/line-height) settings.
- **Text**. This includes text [aligning](https://tailwindcss.com/docs/text-align), [color](https://tailwindcss.com/docs/text-color) and [opacity](https://tailwindcss.com/docs/text-opacity), [decoration](https://tailwindcss.com/docs/text-decoration) and [transformation](https://tailwindcss.com/docs/text-transform).
- **List**. This includes [list type](https://tailwindcss.com/docs/list-style-type) and [position](https://tailwindcss.com/docs/list-style-position) styling.



#### Colors

We have a layout, and we have text. Now we need to bring life to them by using some colors. Tailwind offers a large, pre-made [color palette](https://tailwindcss.com/docs/customizing-colors). Applying a color is super easy. Here are the two most common uses of color:

- **Text**. To apply a [color to text](https://tailwindcss.com/docs/text-color) we use the pattern `text-[color]-[number]`. The `number` variable defines tints and shades. For example, to make text dark red, we can use a `text-red-900` class. To make it light red, we can use `text-red-100`.

- **Background**. To use a [color as a background](https://tailwindcss.com/docs/background-color), we use the pattern `bg-[color]-[number]`.

#### Imagery: Icons and Images

The final spice in our design recipe is the visual imagery. Visuals are like salt and spices: a meal isn’t tasty without them. The most commonly used visuals are:


- **Icons**. These can be based on SVGs or icon fonts. As we saw earlier, we included Font Awesome in our template. To use an icon from it, we use the pattern `fas fa-[icon-name]`. For example, to use a search icon for a search input, we can use the `fas fa-search` classes. Notice that `fas` placed before the icon name means that we use Font Awesome’s solid icons collection, which is free. Font Awesome offers some base styling for its icons, but we can style them with Tailwind’s utilities (for color, size, etc.) as well.

- **Images**. To style images, we can use a bunch of Tailwind classes, such as width and height, [opacity](https://tailwindcss.com/docs/opacity), [shadows](https://tailwindcss.com/docs/box-shadow), borders, [filters](https://tailwindcss.com/docs/filter), and so on.


---
## Practice: Creating A Simple Header

The following image shows what we’re trying to create.

![](./img/part1.png)

To create the header, put the following code inside the `<body>` element in the starting template:

```html
<div class="container mx-auto">
  <header class="flex justify-between items-center sticky top-0 z-10 py-4 bg-blue-900">
    <div class="flex-shrink-0 ml-6 cursor-pointer">
      <i class="fas fa-wind fa-2x text-yellow-500"></i>
      <span class="text-3xl font-semibold text-blue-200">Tailwind School</span>
    </div>
    <ul class="flex mr-10 font-semibold">
      <li class="mr-6 p-1 border-b-2 border-yellow-500">
        <a class="cursor-default text-blue-200" href="#">Home</a>
      </li>
      <li class="mr-6 p-1">
        <a class="text-white hover:text-blue-300" href="#">News</a>
      </li>
      <li class="mr-6 p-1">
        <a class="text-white hover:text-blue-300" href="#">Tutorials</a>
      </li>
      <li class="mr-6 p-1">
        <a class="text-white hover:text-blue-300" href="#">Videos</a>
      </li>
    </ul>
  </header>
</div>
```

Let’s break the header’s code into smaller blocks. First, we’ve wrapped all the content in a [container](https://tailwindcss.com/docs/container) by adding the `container` class in the wrapping `<div>` element:

```html
<div class="container mx-auto">
</div>
```

This forces the design to accommodate certain dimensions depending on the current breakpoint. We’ve also centered the design with the `mx-auto` utility. This sets the left and right margins to `auto`.

In Tailwind, when `x` is used after a CSS setting abbreviation (`m` for margin here), it means that the setting will be applied both on *left* and *right*. If `y` is used instead, it means the setting will be applied both *top* and *bottom*.


The reason we create such a container is that, on large screens, the design will be centered and presented in a more compact size, which in my opinion looks much better than a fully-fluid viewport.

The next thing we’ve done is create the header with a `<header>` element:

```html
<header class="flex justify-between items-center sticky top-0 z-10 py-4 bg-blue-900">
</header>
```

We’ve created a flex container and used `justify-between` and `items-center` classes to add an equal amount of space between flex items and align them along the center of the container’s cross axis.

We’ve also used the `sticky` and `top-0` classes to make the header fixed to the top when users scroll down, and we’ve set a `z-10` class to ensure the header will be always on top.

We’ve added a shade of blue color as a background and some padding for both top and bottom sides of the header.

The first item in the header’s container is the blog’s logo:

```html
<div class="flex-shrink-0 ml-6 cursor-pointer">
  <i class="fas fa-wind fa-2x text-yellow-500"></i>
  <span class="text-3xl font-semibold text-blue-200">Tailwind School</span>
</div>
```

It’s a combination of a yellow colored wind icon (`fas fa-wind`) and light blue colored “Tailwind School” text. We’ve made the icon bigger by using Font Awesome’s `fa-2x` class. The text is made bigger and semibold by using Tailwind’s `text-3xl` and `font-semibold` classes respectively.

For the logo’s container, we’ve added a bit of left margin and used the `flex-shrink-0` class to prevent the logo from shrinking when the design is resized to smaller viewports.

The second item in the header’s container is the main navigation:

```html
<ul class="flex overflow-x-hidden mr-10 font-semibold">
</ul>
```

We’ve created it by using a `ul` element turned into a flex container so we can style its items as horizontal links. We’ve used the `overflow-x-hidden` class to clip the content within navigation that overflows its left and right bounds. We’ve also added some right margin.

The `mr-10` class and the `ml-6` (logo) classes use the `r` for *right* and `l` for *left* abbreviations to set right and left margin respectively. In a similar way, `t` and `b` can be used for setting *top* and *bottom* sides of an element.

For the navigation’s links, we’ve added some right margin and a small padding to all sides:

```html
<li class="mr-6 p-1 border-b-2 border-yellow-500">
  <a class="cursor-default text-blue-200" href="#">Home</a>
</li>
<li class="mr-6 p-1">
  <a class="text-white hover:text-blue-300" href="#">News</a>
</li>
<li class="mr-6 p-1">
  <a class="text-white hover:text-blue-300" href="#">Tutorials</a>
</li>
<li class="mr-6 p-1">
  <a class="text-white hover:text-blue-300" href="#">Videos</a>
</li>
```

When we use a setting like padding without side abbreviation (`p-1` here), it’s applied to all sides.

We’ve set the color of links to white, which changes to light blue on hovering. We’ve also used the `hover:` prefix to achieve that effect.

We’ve styled the active “Home” link by adding a thin yellow border below the text. The border is created with the `border-b-2` class, where `b` is for *bottom* and `2` is the amount of border thickness.



---

### Ref

- Book: Tailwind CSS, Ivaylo Gerchev (Chapter 1), [src](https://github.com/spbooks/tailwind/blob/master/part-1/blog-starter-template.html)

