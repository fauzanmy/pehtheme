var s=document.getElementById("dark-mode-btn"),o=document.getElementById("dark-mode-menus"),r=o.querySelectorAll(".theme-btn"),c=()=>{let e=localStorage.getItem("theme");return e||"light"},a=e=>{e==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"):e==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),localStorage.setItem("theme",e),d(e)},d=e=>{let t=s.querySelector(".theme-icon-active use");e==="dark"?(t.setAttribute("href","#moon"),s.setAttribute("aria-label","Toggle theme (dark)")):e==="light"?(t.setAttribute("href","#sun"),s.setAttribute("aria-label","Toggle theme (light)")):(t.setAttribute("href","#circle-half"),s.setAttribute("aria-label","Toggle theme (auto)"))};r.forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-theme");a(t),o.classList.remove("open"),o.classList.add("close")})});a(c());
/**
 * Dark Mode Toggle Script - Default Light
 * -----------------------------------
 * Script ini mengelola pengaturan tema (gelap, terang, atau otomatis)
 * berdasarkan preferensi pengguna. Tema yang dipilih akan disimpan di
 * localStorage agar tetap konsisten di setiap kunjungan halaman.
 *
 * @author  Fauzan My
 * @version 0.5.0
 * @license MIT
 */
