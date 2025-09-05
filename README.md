# Astro Marcus → Website made with Astro and Friends

## Quick Start 

```sh
npm install
npm run dev 
```


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


## 🚀 Project Structure

Here is my file and folder structure

```text
/
    .astro/
    .git/
    .vscode/
    dist/
    node_modules/
    public/
    src/
        blog/
            post-1.md
            post-2.md
            ...
        components/
            Footer.astro
            Header.astro
            Navigation.astro
            Social.astro
        layouts/
            BaseLayout.astro
            BlogPost.astro
            MarkdownPostLayout.astro
        pages/
            posts/
                [...slug].astro
            tags/
                [tag].astro
                index.astro
            about.astro
            blog.astro
            index.astro
            rss.xml.js
        scripts/
            menu.js
        styles/
            global.css
        content.config
    .gitignore
    astro.config.mjs
    package.json
    README.md
    tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

