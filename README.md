# PDF-MUX. 
![Example](example.png)
In browser example.

<br>

## A minimal PDF reader with split screen views.
Inspired by tmux and built using cross-platform web technology,
this project aims to make make your document content be at the
forefront. 


## Try in Your Browser.

React web-app: http://ianzen.github.io/pdf-mux

### Controls (from left to right):
* Back
* Vertical Split
* Horizontal Split
* Close File
* Open File


<br>

## Dev Installation.

Install dependencies
`yarn install`<br>
Run in browerser
`yarn run start`<br>
Build executable
`yarn run electron-pack`<br>

More scripts found in `package.json` file

<br>

## Work In Progress.
This is an early concept prototype. More features and optimizations will be added.<br>
- [x] Fix page height scaling
- [ ] Render page view **after** drag finished
- [x] Page number counter
- [x] Jump to page
- [x] Split page to current
- [ ] Layout saving 
- [ ] Sidebar 
- [x] Link jump (forward + backward)
- [x] Session saving

