!function(){let e=new Date("Sept 03, 2019 00:00:00"),t=(Math.round((new Date).getTime()-e.getTime())/864e5).toFixed(0),n=2*(t-2*(t/7).toFixed(0)),a=document.querySelectorAll(".la-croix"),o=document.querySelector("#la-croix-cans");if(a&&a.forEach((e=>{e.append(n)})),o)for(let e=0;e<n;e++)o.innerHTML+='<span id="'+e+'" class="la-croix-can"></span>'}();
!function(){var e={pageNav:".workshop-nav",pageNavTitle:".workshop-nav--title",pageNavLinkList:".workshop-nav--list",pageNavLinks:".workshop-nav--link"},t=function(){pageNav=document.querySelector(e.pageNav),pageNavTitle=document.querySelector(e.pageNavTitle),pageNavLinkList=document.querySelector(e.pageNavLinkList),pageNavLinks=document.querySelectorAll(e.pageNavLinks)},o=function(){for(const e of pageNavLinks)e.addEventListener("click",a);pageNavTitle.addEventListener("click",n)};function a(e){e.preventDefault();const t=this.getAttribute("href"),o=document.querySelector(t).offsetTop,a=document.querySelector(".workshop-nav").offsetHeight;document.querySelector(t).offsetHeight;scroll({top:o-a,behavior:"smooth"}),n()}function n(){pageNavLinkList.classList.toggle("hidden")}document.querySelector(".workshop-nav")&&(t(),o())}();
!function(){let e=window.pageYOffset||document.body.scrollTop;window.addEventListener("scroll",(function(t){let o=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop,n=o/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;document.getElementById("progress").setAttribute("style","width: "+n+"%"),e=o<=0?0:o}))}();
var colorMode=function(){const o={root:document.querySelector(":root"),initialColorMode:{id:window.localStorage.getItem("colorMode")},wizard:document.querySelector("#wizard"),unicorn:document.querySelector("#unicorn"),ninja:document.querySelector("#ninja")};var r=function(o){[wizard,unicorn,ninja].forEach((r=>{r.id==o.id?r.classList.replace("underline","line-through"):r.classList.replace("line-through","underline")}))};return{toggle:function(e){switch(e.id?e.id:e){case"wizard":window.localStorage.setItem("colorMode","wizard"),o.root.classList.remove("unicorn","dark"),r(wizard);break;case"unicorn":window.localStorage.setItem("colorMode","unicorn"),o.root.classList.remove("wizard","dark"),o.root.classList.add("unicorn"),r(unicorn);break;case"ninja":window.localStorage.setItem("colorMode","ninja"),o.root.classList.remove("wizard","unicorn"),o.root.classList.add("dark"),r(ninja)}}}}();colorMode.toggle(window.localStorage.getItem("colorMode")||"wizard");