#1 
React is for shipping and component based.
JS
Framework = > Rules (lib) + routing + state management = nextjs
Hooks

Frontend
CSR,SSR,SSG

#2 
unpkg for lib for cdn

#3
Prettier (npm i -D prettier)
- .prettierrc
- .prettierignore

linting - npm init @eslint/config@latest (for js errors)
- exlintconfig mjs dont touch
- .eslintignore (which folder dont touch)

#4
jsx - js + html
babel is the first to write jsx (convert jsx to html for react)
vite comes  + react + react-dom + jsx toolchain

#7 (react basics)
npm init -y
npm i react react-dom
index.html - call id root and add indes.js
App.js- react  component
index.js 
reactDom.createRoot(id).render(<App />)
plugin for compiler vite
npm i --save-dev vite @vitejs/plugin-react
package.json 
    script
     dev:"vite"

update type module form json and html file for js file
vite.config.js
    difineConfig
    export default difineConfig
Update App.jsx

#8
npm create vite@latest .
.env
    VITE_API_URL="api"


useState
const [state, setState] = useState(initVal);
state = is the varible
setState = is the function, responsible to udpate the state, (update the valie)
useState = is the hook 
initVal = is the initial value of the var or value of the state

it async 
setState(count + 1);
setState(count + 1);
 this is will not work because it goes in the chunk
 but

setState(prev => prev +1);
setState(prev => prev +1);
will always work

useEffect(() => {
    // effect logic
    return () =>{
        //cleanup logic
    }
},[dependinces]);

*key is used for make the list item unique*

customHooks (useFetch)
create file with name of use and export and create function with use
return the values what you want
call it as usestate with value from hooks


SSG(Static site generator)
ISG increment site generator
SSR server side rendering

#09
gatsby for html tempaltes create

#10
nextjs
npm i react react-dom express
src/app.js
export react App Compoeent
    react.createElement

server.js
import express
improt react
import reactdomserver from react-dom/sever
import app

const app

#11
Error Boundries
errorbounderies.js
class component
for error components
*react error boundaries*