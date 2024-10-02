# react-todo

A todo app utilising the browser's local storage to store items. Built with ReactJS

## Notes

1. When running `npm run deploy`, you may face an error. This appears to be beacuse of certain large image files in the `public` directory. To fix this, you can try using the following command:
   ([source](https://stackoverflow.com/a/78260070))

```bash
git config --global http.postBuffer 1048576000
```
