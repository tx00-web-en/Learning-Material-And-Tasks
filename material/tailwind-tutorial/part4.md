# Customizing Tailwind and Optimizing Your Workflow

Tailwind provides a robust set of utilities, but there will be times when you’ll want to add extra features. Here, we’ll explore the most common ways to customize Tailwind to suit your needs.

> **Note**: You can find the finished project in this [repo](https://github.com/tx00-resources-en/tailwind-tutorial2).

---
## Part 1: Set Up

1. **Initialize Your Project**:  
   Start by creating a new project directory, e.g., `tailwind-part4`, and navigate into it. Run the following command to initialize a new project:

    ```bash
    npm init -y
    ```

2. **Install Tailwind**:  
   Next, install Tailwind as a development dependency:

    ```sh
    npm install -D tailwindcss@3.4.13 
    ```

3. **Create the Configuration File**:  
   Run the following command to generate a Tailwind configuration file:

    ```sh
    npx tailwindcss init
    ```

    > The `npx` tool, installed alongside `npm`, allows you to run a command from a local or remote npm package.

    This will create a minimal `tailwind.config.js` file where you can add your custom options. The generated file will look like this:

    ```js
    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

4. **Specify Template Paths**:  
   Add your template paths in the `content` section, so Tailwind can compile the utilities used in your templates. Here, we’ll add just an `index.html` file:

    ```js
    // tailwind.config.js
    module.exports = {
      content: ["index.html"],
      ...
    }
    ```

5. **Set Up Styles**:  
   Create a `styles.css` file in the root directory and include the framework’s styles using the `@tailwind` directives:

    ```css
    /* /styles.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

   Tailwind’s styles are divided into three groups:
   - **Base**: Includes foundational styles, like CSS resets.
   - **Components**: Contains component styles, where custom components can be injected.
   - **Utilities**: Holds all of Tailwind’s default utilities and any custom utilities you add.

6. **Build Tailwind Styles**:  
   To build the Tailwind styles, run the following command:

    ```sh
    npx tailwindcss -i styles.css -o tailwind.css
    ```

   This command takes `styles.css` as input and generates `tailwind.css` as output.

7. **Enable Watch Mode (Optional)**:  
   To automatically rebuild your styles on changes, append the `-w` or `--watch` flag to the command:

    ```sh
    npx tailwindcss -i styles.css -o tailwind.css -w
    ```

8. **Add Scripts for Easy Access**:  
   To streamline development, add these commands to your `package.json` file under `scripts`:

    ```json
    // /package.json
    "scripts": {
      "dev": "npx tailwindcss -i styles.css -o tailwind.css",
      "watch": "npx tailwindcss -i styles.css -o tailwind.css -w"
    },
    ```


9. Next, create an `index.html` file in the root directory and add the following content to it:

```html
<!-- /index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./tailwind.css" rel="stylesheet" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    
  </body>
</html>     
```

*   The first link includes the compiled Tailwind styles.
*   The second link includes the [Font Awesome](https://fontawesome.com/icons) icons library. We’ll use its icons in the examples later on.
*   The third link includes the [Carter One font](https://fonts.google.com/specimen/Carter+One) from the Google Fonts collection. 

To demonstrate Tailwind’s customization features, we’ll use this responsive header. We’ll copy the header section and add it to the `index.html` file:

```html
<!-- /index.html -->
  ...
  <body>
    <header
      class="flex items-center justify-between flex-wrap bg-gray-800 py-4 w-full"
    >
      <div class="flex-shrink-0 ml-6">
        <a href="#">
          <i class="fas fa-drafting-compass fa-2x text-yellow-500"></i>
          <span class="ml-1 text-3xl text-blue-200 font-semibold"
            >WebCraft</span
          >
        </a>
      </div>

      <button
        id="nav-toggle"
        class="md:hidden p-2 mr-4 ml-6 my-2 border rounded border-gray-600 text-blue-200 hover:border-blue-200"
      >
        <i class="fas fa-bars fa-2x"></i>
      </button>

      <div class="pl-6 w-full md:w-auto hidden md:block" id="nav-content">
        <ul class="md:flex">
          <li class="mr-6 p-1 md:border-b-2 border-yellow-500">
            <a class="text-blue-200 cursor-default" href="#">Home</a>
          </li>
          <li class="mr-6 p-1">
            <a class="text-white hover:text-blue-300" href="#">Services</a>
          </li>
          <li class="mr-6 p-1">
            <a class="text-white hover:text-blue-300" href="#">Projects</a>
          </li>
          <li class="mr-6 p-1">
            <a class="text-white hover:text-blue-300" href="#">Team</a>
          </li>
          <li class="mr-6 p-1">
            <a class="text-white hover:text-blue-300" href="#">About</a>
          </li>
          <li class="mr-6 p-1">
            <a class="text-white hover:text-blue-300" href="#">Contacts</a>
          </li>
        </ul>
      </div>
    </header>

    <script>
      document.getElementById("nav-toggle").onclick = function () {
        document.getElementById("nav-content").classList.toggle("hidden");
      };
    </script>
  </body>
..  
```

Now we ready to start experimenting with Tailwind customizations!


---

## Part 2: Customizing the Default Tailwind [Theme](https://tailwindcss.com/docs/theme)

The default Tailwind theme can be either overridden or extended, or both. This gives us a great amount of flexibility.

The `theme` key allows us to customize four base things: `screens`, `colors`, `spacing`, and core plugins such as `borderRadius`, `fontFamily`, and so on. We’ll explore each one next, starting with the screens.

### Customizing Tailwind Theme’s [Responsive Breakpoint Modifiers](https://tailwindcss.com/docs/screens)

The default responsive utility variants can be overridden by adding our own under the `screens`. Replace the content of `tailwind.config.js` like this:

```js
module.exports = {
  content: ["index.html"],
  theme: {
    screens: {
      sm: "576px",
      md: "960px",
      lg: "1440px",
    },
    extend: {},
  },
  plugins: [],
};     
```

In this case, the default variants are discarded and won’t be available along with the newly added ones.

If we want to keep the existing breakpoints and to extend them with one or more variants, we have two options.

First, if we want to add larger variants, we just add them under the `extend` key:

```js
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};     
```

Here, the default variants are kept and the new one is added to them. This approach can be used also to override a single breakpoint. In such a case, we use one of the default names and replace its value with a new one. For example:

```js
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      screens: {
        md: "960px",
      },
    },
  },
  plugins: [],
};     
```

Here, the `md` variant’s value is replaced, while the rest of the variants keep their default values.

Second, if we want to add smaller breakpoints, things get a bit more complicated. In such a case, we first need to add our smaller breakpoints, and then we must provide the default utilities after them like so:

```js
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["index.html"],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};        
```

Here, we first import the default theme and use its `screens` key to include the default responsive utilities after the `xs` variant. You may notice that we don’t use the `extend` key here. So in fact, we "extend” the breakpoints by redefining them. This is because, if we use the `extend` key, smaller breakpoints will be added to the end of the list and the order from smallest to largest will be incorrect. In such a case, the breakpoints won’t work as expected.

### Customizing Tailwind’s Theme [Colors](https://tailwindcss.com/docs/customizing-colors)

Tailwind offers a precisely selected color palette that will be enough in many scenarios. However, in some cases, we might want to add some specific colors or shades to it—such as our brand colors. In this case, we can extend the default colors like so:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#e46464",
          100: "#d05050",
          200: "#bc3c3c",
          300: "#a82828",
          400: "#941414",
          500: "#800000",
          600: "#6c0000",
          700: "#580000",
          800: "#440000",
          900: "#300000",
        },
        indigo: {
          950: "#1d1a6d",
        },
      },
    },
  },
};       
```

Here, we’ve added our new `maroon` color shades to the default colors, and also extended the default `indigo` color with one more darker shade.

If we want to completely replace the default Tailwind color palette with our own custom colors, we can do it this way:

```js
module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      tahiti: {
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
    },
  },
};       
```

Here, we’ve added simple white and black colors and `tahiti` color shades. We’ve also included values like `transparent` and `currentColor` in case we want to use them in our project.

If we want to use some of Tailwind’s default colors, we can do so by importing them and using the ones we need like so:

```js
const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
  },
};        
```

Now you can use your colors as usual—for example, `text-yellow-500`, `bg-indigo-300`, and so on.

#### Naming Colors

We can use different names for our colors if we wish. For example, `green: colors.emerald`. In this scenario, we would use it like this: `text-green-400`, `bg-green-700`, and so on.

### Customizing Tailwind’s [Spacing Utilities](https://tailwindcss.com/docs/customizing-spacing)

Tailwind has a rich set of spacing utilities—which are detailed in the documentation on [Tailwind’s default spacing scale](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale).

However, sometimes we might need a bit more precision. In such a situation, we can add the needed utilities again in two ways.

We can just discard the Tailwind utilities and replace them with our own:

```js
module.exports = {
  theme: {
    spacing: {
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
    },
  },
};        
```

Here, we’ve overridden Tailwind’s default spacing utilities and generated classes like `w-lg` and `h-md` instead.

Alternatively, we can add the "missing” utilities while keeping all the defaults as well:

```js
module.exports = {
  theme: {
    extend: {
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        128: "32rem",
        144: "36rem",
      },
    },
  },
};        
```

We can use these new utilities in the same way as default ones. For example, to apply our custom utilities for width and height, we write them like this: `w-15 h-13`.

### Customizing Tailwind’s [Core Plugins](https://tailwindcss.com/docs/theme#core-plugins)

The last thing we can customize in the `theme` key is core plugins.

A **core plugin** is a utility with a series of different variations.

Here’s the default definition for the `blur` plugin/utility:

```js
blur: {
  0: '0',
  none: '0',
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
}    
```

The `blur` plugin applies a [blur filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) to an element. Each variation applies a different amount of blurring.

Let’s see now how we can customize it. As with all utilities, we can either extend a plugin or override it.

The default blurring values are a bit too high. If you prefer to have gentler blurring variations with a smooth transition between them, you can override the plugin’s values:

```js
module.exports = {
  theme: {
    blur: {
      none: "blur(0)",
      sm: "blur(2px)",
      DEFAULT: "blur(4px)",
      md: "blur(6px)",
      lg: "blur(8px)",
      xl: "blur(10px)",
    },
  },
};    
```

We’ve added the plugin name as a key and provided our custom variations. The code above will produce the following classes: `blur-none`, `blur-sm`, `blur`, `blur-md`, and `blur-lg`.

You can find instructions for customization of each core plugin at the end of each plugin’s documentation page—like this one for the [blur plugin](https://tailwindcss.com/docs/blur#using-custom-values).

It’s also worth reading up on the default theme configuration for all [core plugins](https://tailwindcss.com/docs/theme#configuration-reference).

---
## A Practical Customization Example

In this section, we’ll apply all we’ve learned so far. We’ll replace the default responsive breakpoints with our own, we’ll extend the theme with additional colors and spacing utilities, and we’ll add the font we included in our HTML file earlier to the default font stack.

Open the `tailwind.config.js` file and replace its content with the following:

```js
// /tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html"],
  theme: {
    screens: {
      phone: "640px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      colors: {
        primary: colors.yellow,
        secondary: colors.blue,
        neutral: colors.gray,
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
      },
      fontFamily: {
        display: ['"Carter One"'],
      },
    },
  },
  plugins: [],
};      
```

- Here, we’ve firstly added `index.html` to the `content` array.
- Next, we’ve added four breakpoints with custom names that completely replace the default variants. The breakpoints are now more verbose but also more descriptive and easy to grasp.
- Next, under the `extend` key, we’ve created custom named colors and used the Tailwind colors to define them. The reason here is similar. We want more descriptive names so they can be applied more intuitively—for example, when we create buttons.
- Next, we’ve extended the spacing utilities with custom ones that give us a bit more precision. Sometimes our design needs to be pixel-perfect, so we might need a more precise scale.
- Finally, we’ve extended the `fontFamily` core plugin to have a `display` font set. We’ve used only the Carter One font here, but we can add as many as we like. Using a custom font instead of the default fonts can make our design stand out. 

Now, to apply the changes, we should rebuild the styles manually—if we didn’t run the build script with the `watch` flag. To do so, run 

```sh
npm run watch
```

We have the required styles, so now let’s use them. Replace the header section in the `index.html`file with the following:

```html
<!-- /index.html -->

    <header
      class="flex items-center justify-between flex-wrap font-display bg-neutral-800 py-4 w-full"
    >
      <div class="flex-shrink-0 ml-6">
        <a href="#">
          <i class="fas fa-drafting-compass fa-2x text-primary-500"></i>
          <span class="ml-1 text-3xl text-secondary-200 font-semibold"
            >WebCraft</span
          >
        </a>
      </div>

      <button
        id="nav-toggle"
        class="tablet:hidden p-2 mr-4 ml-6 my-2 border rounded border-neutral-600 text-secondary-200 hover:border-secondary-200"
      >
        <i class="fas fa-bars fa-2x"></i>
      </button>

      <div
        class="pl-6 w-full tablet:w-auto hidden tablet:block"
        id="nav-content"
      >
        <ul class="tablet:flex">
          <li class="mr-5.5 p-1 tablet:border-b-2 border-primary-500">
            <a class="text-secondary-200 cursor-default" href="#">Home</a>
          </li>
          <li class="mr-5.5 p-1">
            <a class="text-white hover:text-secondary-300" href="#">Services</a>
          </li>
          <li class="mr-5.5 p-1">
            <a class="text-white hover:text-secondary-300" href="#">Projects</a>
          </li>
          <li class="mr-5.5 p-1">
            <a class="text-white hover:text-secondary-300" href="#">Team</a>
          </li>
          <li class="mr-5.5 p-1">
            <a class="text-white hover:text-secondary-300" href="#">About</a>
          </li>
          <li class="mr-5.5 p-1">
            <a class="text-white hover:text-secondary-300" href="#">Contacts</a>
          </li>
        </ul>
      </div>
    </header>
  
```

What we’ve just done here is replace the following classes:

*   all `md:` occurrences with `tablet:`
*   `yellow`, `blue`, and `gray` classes with `primary`, `secondary`, and `neutral` respectively
*   `mr-6` with `mr-5.5`

We’ve also added a `font-display` class in the header.

Of course, visually the most notable difference is the new font. The other changes (apart from the margin tweaks) are just class-name replacements that affect the visual appearance, although the code is now a bit more descriptive.

## Adding [Base Classes](https://tailwindcss.com/docs/adding-base-styles)

Tailwind automatically adds [Preflight](https://tailwindcss.com/docs/preflight) base styles to each project by default. These settings do things like remove the default browser styles for the headings, paragraphs, lists, and so on, which may be unwanted.

So if we don’t want Preflight styles, we can disable them by setting the `preflight` value to false:

```js
module.exports = {
  corePlugins: {
    preflight: false,
  },
};       
```

Usually this isn’t necessary, but it’s still worth knowing it’s an option.

In either case, with Preflight classes or without them, we can add our own base classes that can override or extend Preflight, depending on whether a class already exists or not.

In the next example, we’ll override the classes for `<h1>`, `<h2>`, and `<p>` elements.

Open `styles.css` and replace with the following:

```css
/* /styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  h1,
  h2,
  p {
    @apply my-6 mx-4;
  }
}        
```

Here, we’ve changed the size for some headings and added margins for the same headings and all paragraphs.

#### Rebuilding Styles

You should rebuild the styles to apply the changes. To do so, run the `npm run watch` command.

To see this in action, open `index.html` and add this content below the header:

```html
<!-- /index.html -->

    <h1>Main Heading Is Here</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis urna
      vitae sapien volutpat commodo nec in nulla. Cras consectetur lorem
      pharetra turpis iaculis, vel finibus ante facilisis. Morbi auctor, elit
      sit amet congue sollicitudin, mi mi aliquam neque, ac condimentum purus
      leo nec felis. 
    </p>

    <h2>Second Heading Is Here</h2>

    <p>
      Donec tempor odio sed sem porttitor, ac sodales dolor ultrices. Phasellus
      nec enim et nibh vestibulum placerat. Nam sed lobortis tortor. Etiam at
      ipsum risus. Vestibulum erat elit, iaculis a pulvinar at, interdum nec mi.
      Aenean in consectetur ipsum, vitae rhoncus arcu. Vestibulum quis sapien
      nibh. Curabitur feugiat vestibulum lorem, vitae volutpat lectus porttitor
      tincidunt. Praesent diam sem, ultrices quis nibh luctus, pharetra
      tristique elit. 
    </p>

    <p>
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia curae; Nam non urna in mi dictum tempor. Quisque leo odio, pretium
      ut egestas eu, pulvinar eget lacus. Nulla quis orci ac dui hendrerit
      mattis quis a ex. Phasellus facilisis rutrum ante a auctor. Morbi non
      gravida risus. Integer convallis leo odio, nec pulvinar magna condimentum
      eleifend. 
    </p>
```

Now, when you open it, you should see the headings and paragraphs displayed with a space between them.

## Creating Configuration [Presets](https://tailwindcss.com/docs/presets)

If we want to reuse our configuration across different projects, Tailwind offers us a way to do so by creating reusable configuration presets. A **configuration preset** is a number of settings defined in the exact same way as those from the `tailwind.config.js` file. The only difference is that they’re put in a different, separate file.

Using presets is very useful for creating branding and/or design systems.

Let’s suppose we have brand colors that we want to use in a project or perhaps in multiple projects. In this scenario, we can create a preset with the brand colors. Let’s create a `brand-colors-preset.js` file and put the following content inside:

```js
// /brand-colors-preset.js
const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.yellow,
        secondary: colors.blue,
        neutral: colors.gray,
      },
    },
  },
};        
```

Here, we’ve moved the colors from the main configuration file into the preset. To include the preset into your main configuration, add it under the `presets` key, as in the example below:

```js
// /tailwind.config.js
module.exports = {
  content: ["./index.html"],
  presets: [require("./brand-colors-preset.js")],
  theme: {
    screens: {
      phone: "640px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
      },
      fontFamily: {
        display: ['"Carter One"'],
      },
    },
  },
  plugins: [],
};        
```

Here, we’ve removed the colors from the `colors` key and instead added them as a preset defining our brand colors. This gives us more flexibility to easily change the brand colors in future or use completely different colors if we wish.

#### Rebuilding Styles

You should rebuild the styles to apply the changes. To do so, run the `npm run watch` command.

#### Merging

Just as the `tailwind.config.js` settings are merged with the default configuration, the preset settings are merged with the `tailwind.config.js`. You can learn more about merging [in the Tailwind documentation](https://tailwindcss.com/docs/presets#merging-logic-in-depth).

We can also use multiple presets:

```js
module.exports = {
  presets: [
    require("responsive-breakpoints-preset.js"),
    require("brand-colors-preset.js"),
    require("brand-fonts-preset.js"),
  ],
};        
```

If there are overlapping classes in two or more presets, the classes specified in the last preset will take precedence.

## Conclusion

In this part, we explored various ways to configure Tailwind, such as tweaking the default theme by overriding and/or extending it, creating reusable presets, and tweaking the base Tailwind styles.

---

## Ref

- Chapters 2 and 4 in *Tailwind CSS* by Ivaylo Gerchev. [Available free of charge to Metropolia students via O'Reilly](https://learning.oreilly.com/library/view/tailwind-css).