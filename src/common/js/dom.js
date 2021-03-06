export function addClass(el,className){
   if(hasClass(el,className)){
     return
   }
   let newClass = el.className.split(' ')
   newClass.push(className);
   el.className = newClass.join(' ')
}

export function hasClass(el,className){
   let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
   return reg.test(el.className);
}

export function getData(el,index,val){
	
	 let name = 'data-'+index;
	if(val){
      return el.setAttribute(name,val)
	}else{
	  return el.getAttribute(name,val)
	}
}
