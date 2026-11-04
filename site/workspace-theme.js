(() => {
 'use strict';
 const key='director-workspace-theme-v1',root=document.documentElement;
 const valid=value=>value==='light'||value==='dark';
 let current='dark';
 try{const saved=localStorage.getItem(key);if(valid(saved))current=saved;}catch{}
 function apply(value,save=false){
  if(!valid(value))return;
  current=value;root.dataset.theme=value;root.style.colorScheme=value;
  // Set the canvas before the stylesheet arrives, including a fresh local-file visit.
  root.style.backgroundColor=value==='dark'?'#151a19':'#e0dfd6';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',value==='dark'?'#151a19':'#e0dfd6');
  const button=document.getElementById('theme-toggle');
  if(button){
   const night=value==='dark';
   button.setAttribute('aria-pressed',String(night));
   button.setAttribute('aria-label',night?'当前夜间配色，切换为白天配色':'当前白天配色，切换为夜间配色');
   button.title=night?'切换为白天配色':'切换为夜间配色';
   document.getElementById('theme-label').textContent=night?'夜间':'白天';
  }
  if(save){try{localStorage.setItem(key,value);}catch{if(button)button.title+='（本次生效，浏览器未允许记住选择）';}}
 }
 apply(current);
 document.addEventListener('DOMContentLoaded',()=>{
  apply(current);
  document.getElementById('theme-toggle')?.addEventListener('click',()=>apply(current==='dark'?'light':'dark',true));
 });
 window.addEventListener('storage',event=>{if(event.key===key&&valid(event.newValue))apply(event.newValue);});
 window.DirectorTheme={get value(){return current;},set:value=>apply(value,true)};
})();
