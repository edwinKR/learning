## package.json
* `package.json`    
    * Keeps track of all dependencies needed for the application.
    * `npm init` Creates `package.json` file.
        * `npm init -y`
            * `y` flag will automatically answer `yes` to all questions asked by default when running `npm init`.
 
### Semantic Versioning
* Universal agreement for software versioning - [Agreement](https://semver.org/)
* Example: `3.12.03`
    * `3` : Major version
        * New feature that are not compatible with previous verisons or changes project completely due to breaking changes.
    * `12`: Minor version
        * New feature but still will remain compatible with previous versions. 
    * `03`: Patch version
        * For bug fixes.

|Types              |Expressions|
|----------------   |---------  |
|Exact version      | 3.12.03   |
|Greater than       | >3.12.03  |
|Compatible changes | ^3.12.03  |
|Minor-level changes| ~3.12.03  |
* Compatible changes: Applies to minor or patch version updates.
    * This is saying any compatible changes are allowed.
* Minor-level changes: Applies to only patch version updates.
* Setting these up in your `package.json` file is to control version updates.

================================


### Dependencies vs Development Dependencies
* Dependencies
    * `npm install` or `npm install <package>`
    * All packages under the `dependencies` in the `package.json` file will be installed. 
    * Transitive Installation
        * Let's say "package A" is installed using `npm install`. If "package A" has dependency on "package B", then "package B" will ALSO BE INSTALLED along with it's dependencies as well. 

* Dev Dependencies
    * `npm install` and all packages under `devDependencies` will be installed as well.
    * Can't install with `npm install --production`
    * Not transitive
        * Let's say "package A" is installed using `npm install`. If "package A" has a devDependency on "package B", then "package B will NOT BE INSTALLED.
    * `npm install <package> --save-dev` or `npm install <package> -D`
        * This will add package under `devDependencies`
        * Installing package will also add to the `node_modules`
        * The `dependencies` of the installed package will ALSO BE INSTALLED.

* Installation Use Cases
    * When to install dependencies vs devDependencies?
        * Depends on building browser app vs server package. 
            * Browser applications needs an html file. Node applications is server side and usually just uses JavaScript files. 
            * For example: If you add `index.js` file that requires `commonjs` server package and then try to add that to a `script` into the html file for your browser application, it will not run.
            * In other words, `dependencies` and `devDependencies` have NO RELATIONSHIP to the the BROWSER APPLICATION. Broswer apps only understand html, javascript, and css.  
    * If you are creating a stand a lone browser application, a good practice is to add as `devDependencies` and with the final build, serve it to the browser as a bundle.
    * Add `dependencies` ONLY IF: 
        * It's a public package
        * Compiled version of your package uses features from dependent packages.
        * Other packages depend on your package.
    * Most packages are usually used on the server ONLY DURING DEVELOPMENT of other packages.

### Uninstall a package
* `npm uninstall <package>`
* If uninstalling a package, all its dependencies will also be removed from both `package.json`'s `dependencies` and `node_modules`.

### On GitHub
* Good practice is NOT to commit `node_modules`. So add it to the `.gitignore` file. This is b/c node_modules are usually pretty large size due to all the packages installed. Just sharing the `package.json` file prevents having to share the entire installed packages!
* `package-lock.json` file should ALWAYS be committed to the source control(i.e. git) along with the `package.json` file.

---

## package-lock.json
* Guarantees consistency of the dependencies versions. It keeps versions tree of the project dependencies including all the child(or descendant) dependencies.
* `package-lock.json` file is NOT PUBLISHED to your npm package registry. 
* If installed as: 
    * `dependencies`: Installed package in `package-lock.json` will not have `dev: true`.
    * `devDependencies`: Will have `dev: true`
* Without the `package-lock.json` file, when you share to others and they try to `npm install`, the latest versions of the `dependencies` packages will be installed.
* With the `package-lock.json` file, `npm install` will install based on the dependencies package versions stated inside the `package-lock.json` file. 

### Updating npm packages
* `npm update`
    * Will update entire packages listed with latest versions released in accordance to the `SemVer`
    * `npm update <package>` for updating certain package.

### Other Helpful commands
* `npm view <package>`
    * Can view details of the package if published on a registry.
    * `npm view <package> versions` to view all versions.
* `npm install <package@version>`
    * Example: `npm install moment@2.1.0`
    * This will update `dependencies` version for that package.
        * If you see a message saying `severity vulnerability` and says to run `npm audit fix`, you can just run `npm audit` to see the logs.
* `du -hs`
    * Shows memory size of current directory.
* npm default scripts commands:
    * `npm test`
    * `npm start`: By default, this will run `node server.js`
    * `npm restart`
    * `npm stop`
    * `npm prestart`
    * `npm poststart`
    * Can customize what to run with above built-in commands for scripts in your `package.json`'s `scripts`.
* npm custom scripts commands: `npm run <custom-script>`

### Parallel npm scripts
* `npm install npm-run-all --save-dev`
    * Saving as `devDependencies`
    * Then create script command:
        * `--parallel` flag: Ex) `npm run <custom-all> --parallel <custom-package-1> start <custom-package-2> moment`
        * `--serial` flag for sequential ordering.

### .bin folder
* If installing and npm package, npm will look for `bin` property in the `package.json` file.
    * If the `bin` property exsits, the `bin` scripts will be copied over to the `.bin` folder.
    * `.bin` folder contains the `executable files`
* Inside `executable files`, you will notice at the very top line is a `#!/user/bin/env node`
    * This is called a `SHEBANG` line which determines which intepreter should be used for file node execution on the Unix-like OS.
    * In other words, it's giving your computer instructions on how to run the executable file with node.        
---

## Webpack
* `npm install webpack webpack-cli --save-dev`
    * `webpack` Package that contains the core functionality of Webpack.
    * `webpack-cli` CLI tool to use webpack. 
    * `--save-dev`  This option will add webpack to the `package.json` file as a development dependency. Hence, other developers can share all dependencies if using this in same application and simply just npm install.

* Module Imports
    * `import someModule from './someFile.js` 
    * `export default someModule`
    * Above syntax are related to ECMAScript modules which is the current standard for JavaScript modules.
    * Webpack supports ECMASciprt modules by default.

### Default Webpack Configuration
* Run `npx webpack`
    * By default, will create `dist` folder with `main.js` file in it.
        * Webpack by default will look at your `index.js` file and assume it's in a `src` folder. Hence, the entrypoint by default will be to `src/main.js`.
        * We can give other options to customize webpack's default configuration like changing the entrypoint.

### Custom Webpack Configuration
*   Webpack stores its configuration generally by default in a `webpack.config.js` file. But, the file name can also be customized.