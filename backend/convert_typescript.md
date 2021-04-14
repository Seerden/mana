- Globally install typescript:
`npm i -g typescript`
- install @types/express-session

- Update `scripts` and possibly `module` in package.json
     - Install concurrently if it's not installed yet, since that's how the backend will be started
- Create tsconfig.json
    - include TypeRoots
        - add custom_typings with express file for request.user.username (from express-session)
            extend with additional properties if I use any
    