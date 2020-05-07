#Elventy Starter

This contains a starting point for eleventy static site.
This uses nunchucks and markdown to create pages.

Build tools are added using gulp.
To install:
- First run nvm use, to get the node version.
- NPM Install to install packages.

To Run:
- npm run will list all commands known.
- npm run dev : this runs gulp build and watch and eleventy --serve
-- This first build the site from the src folder, compiling the scss to css, and js will be run through babel and compiled. Watch will catch any changes to these files during development and compile to the dist folder. Eleventy serve is the native eleventy command for generating a local site.
- Other tasks can be reviewed in the gulp.js file, and can be added or removed from package.json as required.

To Note:
  The eleventy.js file defines the src and dist files. It also passes through images.