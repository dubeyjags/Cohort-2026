const chaiElements = document.querySelectorAll('[class^="chai-"]');
        chaiElements.forEach(element => {
            const classList = element.className.split(' ');
            classList.forEach(c => {
                let arr = c.split('-');
                let value = arr.at(-1);
                arr.shift();
                arr.pop();
                const prop = arr.join('-'); 
                // console.log('keyVal',prop,value);                
                
                if(prop == "mb" || prop == "m" || prop == "text" || prop == "gap" || prop == "z-index" 
                || prop=="pl" || prop=="pr" || prop=="pb" || prop=="pt" || prop=="px" || prop=="py" || 
                prop=="ml" || prop=="mr" || prop=="mt" || prop=="mb" || prop=="mx" || prop=="my" || prop=="w" || prop=="h" 
                ){
                    switch (value) {
                        case "xs": value = "0.75rem"; break;
                        case "sm": value = "0.875rem"; break;
                        case "md": value = "1rem"; break;
                        case "lg": value = "1.125rem"; break;
                        case "xl": value = "1.25rem"; break;
                        case "2xl": value = "1.5rem"; break;
                        case "3xl": value = "1.875rem"; break;
                        default: break;
                    }
                    if(!isNaN(+value)){ 
                        value = +value + "rem";
                    }
                } else if(prop == "opacity"){
                    value = value + '%';
                }
                
            switch (prop) {
                case "bg": element.style.backgroundColor = value; break;
                case "color": element.style.color = value; break;
                case "text": element.style.fontSize = value; break;
                case "text-decoration": element.style.textDecoration = value; break;
                case "fontFamily": element.style.fontFamily = value === "sans" ? "sans-serif" : "monospace"; break;
                case "font": element.style.fontWeight = value; break;
                case "position": element.style.position = value; break;
                case "top": element.style.top = value; break;
                case "right": element.style.right = value; break;
                case "bottom": element.style.bottom = value; break;
                case "left": element.style.left = value; break;
                case "align": element.style.textAlign = value; break;
                case "lineHeight": element.style.lineHeight = value; break;
                case "letterSpacing": element.style.letterSpacing = value; break;
                case "w": element.style.width = value; break;
                case "max-w": element.style.maxWidth = value; break;
                case "h": element.style.height = value; break;
                case "d": element.style.display = value; break;
                case "flex": element.style.display = "flex"; break;
                case "flex-col": element.style.display = "flex"; element.style.flexDirection = "column"; break;
                case "flex-row": element.style.display = "flex"; element.style.flexDirection = "row"; break;
                case "flex-wrap": element.style.display = "flex"; element.style.flexWrap = "wrap"; break;
                case "flex-no-wrap": element.style.display = "flex"; element.style.flexWrap = "nowrap"; break;
                case "flex-center": element.style.display = "flex"; element.style.justifyContent = "center"; element.style.alignItems = "center"; break;
                case "flex-end": element.style.display = "flex"; element.style.justifyContent = "flex-end"; break;
                case "flex-start": element.style.display = "flex"; element.style.justifyContent = "flex-start"; break;
                case "grid-cols": element.style.display = "grid"; element.style.gridTemplateColumns = 'repeat(' + value + ', minmax(0, 1fr))'; break;
                case "grid-rows": element.style.display = "grid"; element.style.gridTemplateRows = 'repeat(' + value + ', minmax(0, 1fr))'; break;
                case "visible": element.style.visibility = value; break;
                case "gap": element.style.gap = value; break;
                case "p": element.style.padding = value; break;
                case "pt": element.style.paddingTop = value; break;
                case "pr": element.style.paddingRight = value; break;
                case "pb": element.style.paddingBottom = value; break;
                case "pl": element.style.paddingLeft = value; break;
                case "px": element.style.paddingLeft = value; element.style.paddingRight = value; break;
                case "py": element.style.paddingTop = value; element.style.paddingBottom = value; break;
                case "m": element.style.margin = value; break;
                case "mt": element.style.marginTop = value; break;
                case "mr": element.style.marginRight = value; break;
                case "mb": element.style.marginBottom = value; break;
                case "ml": element.style.marginLeft = value; break;
                case "mx": element.style.marginLeft = value; element.style.marginRight = value; break;
                case "my": element.style.marginTop = value; element.style.marginBottom = value; break;
                case "border": element.style.border = value; element.style.borderStyle = "solid"; break;
                case "border-color":element.style.borderColor = value; break;
                case "border-radius": element.style.borderRadius = value; break;
                case "border-t": element.style.border="0"; element.style.borderTopWidth = value; element.style.borderStyle = "solid"; break;
                case "border-b": element.style.border="0"; element.style.borderBottomWidth = value; element.style.borderStyle = "solid"; break;
                case "border-l": element.style.border="0"; element.style.borderLeftWidth = value; element.style.borderStyle = "solid"; break;
                case "border-r": element.style.border="0"; element.style.borderRightWidth = value; element.style.borderStyle = "solid"; break;
                case "border-t-radius": element.style.borderTopLeftRadius = value; element.style.borderTopRightRadius = value; break;
                case "border-b-radius": element.style.borderBottomLeftRadius = value; element.style.borderBottomRightRadius = value; break;
                case "border-l-radius": element.style.borderTopLeftRadius = value; element.style.borderBottomLeftRadius = value; break;
                case "border-r-radius": element.style.borderTopRightRadius = value; element.style.borderBottomRightRadius = value; break;
                case "border-style": element.style.borderStyle = value; break;
                case "border-width": element.style.borderWidth = value; break;
                case "border-color": element.style.borderColor = value; break;
                case "border-radius": element.style.borderRadius = value; break;
                case "rounded": element.style.borderRadius = value; break;
                case "rounded-t": element.style.borderTopLeftRadius = value; element.style.borderTopRightRadius = value; break;
                case "rounded-b": element.style.borderBottomLeftRadius = value; element.style.borderBottomRightRadius = value; break;
                case "rounded-l": element.style.borderTopLeftRadius = value; element.style.borderBottomLeftRadius = value; break;
                case "rounded-r": element.style.borderTopRightRadius = value; element.style.borderBottomRightRadius = value; break;
                case "shadow": element.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)"; break;
                case "shadow-sm": element.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)"; break;
                case "shadow-md": element.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)"; break;
                case "shadow-lg": element.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"; break;
                case "shadow-xl": element.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"; break;
                case "shadow-2xl": element.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)"; break;
                case "cursor": element.style.cursor = value; break;
                case "opacity": element.style.opacity =  value; break;
                case "overflow": element.style.overflow = value; break;
                case "z-index": element.style.zIndex =  value; break;
                case "list": element.style.listStyleType = value; break;
                default: break;
            }
        });
        });