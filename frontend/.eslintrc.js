export default {
    "extends": ["react-app", "plugin:@typescript-eslint/recommended"],
    "rules": {
    },
    "overrides": [
        {
            "files": ["**/*.js?(x)", "**/*.ts?(x)"],
            "rules": {
                "react-hooks/exhaustive-deps": "off",
                "@typescript-eslint/no-unused-vars": "off",
                "no-unused-vars": "off",
            }
        }
    ]
}