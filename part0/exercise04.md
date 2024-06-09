```mermaid
    new note diagram;
       broswer-->server POST request with note content;
       browser-->server GET request main.css;
       server-->browser main.css file sent back;
       browser-->server GET main.js;
       server-->browser main.js file sent back;
       browser-->server GET data.json;
       server-->browser data.json file sent back;
```