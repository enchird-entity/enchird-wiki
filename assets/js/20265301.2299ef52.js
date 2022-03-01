"use strict";(self.webpackChunkenchird_wiki=self.webpackChunkenchird_wiki||[]).push([[595],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(h,s(s({ref:t},c),{},{components:n})):r.createElement(h,s({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,s=new Array(o);s[0]=d;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var p=2;p<o;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9101:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return l},metadata:function(){return p},assets:function(){return c},toc:function(){return u},default:function(){return m}});var r=n(7462),i=n(3366),o=(n(7294),n(3905)),s=["components"],a={sidebar_position:4},l="Processes",p={unversionedId:"nudle/processes",id:"nudle/processes",title:"Processes",description:"The Main process",source:"@site/docs/nudle/processes.md",sourceDirName:"nudle",slug:"/nudle/processes",permalink:"/docs/nudle/processes",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/nudle/processes.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Project structure",permalink:"/docs/nudle/project-structure"},next:{title:"Views",permalink:"/docs/nudle/views"}},c={},u=[{value:"The Main process",id:"the-main-process",level:2},{value:"Printer module",id:"printer-module",level:3},{value:"Nudle Utility module",id:"nudle-utility-module",level:3},{value:"The Render process",id:"the-render-process",level:2},{value:"Registering modules",id:"registering-modules",level:3},{value:"Components",id:"components",level:3},{value:"Views",id:"views",level:3}],d={toc:u};function m(e){var t=e.components,n=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"processes"},"Processes"),(0,o.kt)("h2",{id:"the-main-process"},"The Main process"),(0,o.kt)("p",null,"The main process is the primary core process initializing the app and running core functions like:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Creating the app window and loading the UI"),(0,o.kt)("li",{parentName:"ul"},"Communicates with the render process via the ",(0,o.kt)("a",{parentName:"li",href:"https://www.electronjs.org/docs/latest/api/ipc-main"},"Inter process communication (ipc)")," channel"),(0,o.kt)("li",{parentName:"ul"},"Checks for updates, downloads available updates and notifies the render process of the downloaded update"),(0,o.kt)("li",{parentName:"ul"},"Save CSV to disk and read CSV files."),(0,o.kt)("li",{parentName:"ul"},"Initializes the settings configuration file")),(0,o.kt)("p",null,"The main process file path is ",(0,o.kt)("inlineCode",{parentName:"p"},"src/main/index.js"),". Learn more about the ",(0,o.kt)("a",{parentName:"p",href:"https://www.electronjs.org/docs/latest/tutorial/process-model#the-main-process"},"main process"),"."),(0,o.kt)("h3",{id:"printer-module"},"Printer module"),(0,o.kt)("p",null,"This is a main process module that receives data from the render process and prints the data ",(0,o.kt)("inlineCode",{parentName:"p"},"58mm")," printer. The printer module path\nis ",(0,o.kt)("inlineCode",{parentName:"p"},"src/main/api/pos.printer.js")),(0,o.kt)("h3",{id:"nudle-utility-module"},"Nudle Utility module"),(0,o.kt)("p",null,"The nudle utility is initialized once the application is started, this modules runs background task that do not\ndirectly affect the UI (render process) for example: the nudle utility modules runs scheduled tasks like backing up the database\nevery hour incase of loss by antivirus or another reason. "),(0,o.kt)("p",null,"If you need to write specific background functions like cron jobs that do or do not necessary involve the render process, it is best to write it in this file. This file is called on start up by the ",(0,o.kt)("inlineCode",{parentName:"p"},"src/main/index.js"),". Be sure you initialize your functions here"),(0,o.kt)("p",null,"The utility module path is ",(0,o.kt)("inlineCode",{parentName:"p"},"src/main/api/nudle.utility.js")),(0,o.kt)("h2",{id:"the-render-process"},"The Render process"),(0,o.kt)("p",null,"The render process structure in ",(0,o.kt)("inlineCode",{parentName:"p"},"src/renderer")," folder, is basically the set up of a standard vue application. There are currently two UI component frameworks installed; ",(0,o.kt)("a",{parentName:"p",href:"https://element.eleme.cn/#/en-US/component/quickstart"},"Element UI")," and ",(0,o.kt)("a",{parentName:"p",href:"https://antdv.com/components/"},"Ant Design"),". Element UI is in the process of deprecation, it's recommended to use more of Ant Design modules. Learn more about the ",(0,o.kt)("a",{parentName:"p",href:"https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process"},"render process")),(0,o.kt)("h3",{id:"registering-modules"},"Registering modules"),(0,o.kt)("p",null,"The file ",(0,o.kt)("inlineCode",{parentName:"p"},"src/renderer/modules.js")," is used to register all imported modules (third-party mostly) to the vue instance. For example if you want to add the\nripple effect to buttons from a third-party package. Check the file for examples."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// Import the module\nimport Ripple from "vue-material-design-ripple";\n\n// register the module as a directive to the vue instance\nVue.directive("ripple", Ripple);\n\n')),(0,o.kt)("h3",{id:"components"},"Components"),(0,o.kt)("p",null,"Components are reusable vue instances that can be imported anywhere in your vue application, all components should reside in ",(0,o.kt)("inlineCode",{parentName:"p"},"src/renderer/components"),". Naming conventions are important, it's recommended to name your component respective to it's use of view. you can put a group components it folders in the case if the components are related."),(0,o.kt)("h3",{id:"views"},"Views"),(0,o.kt)("p",null,"Views are the vue components with the user interfaces users interacts with. Read more in the next chapter"))}m.isMDXComponent=!0}}]);