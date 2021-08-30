const braidDarkModeClass = 'braid-dark-mode';
// export default `
// <script>
// ((d)=>{try{var p=localStorage.getItem('braid-theme-pref');if(p==d||(p!='light'&&matchMedia('(prefers-color-scheme:dark)').matches)) document.documentElement.classList.add(d)}catch(e){}})('${braidDarkModeClass}')
// </script>
// `;
export default `
<script>
((d)=>{try{var p=localStorage.getItem('braid-theme-pref');if(p==d) document.documentElement.classList.add('${braidDarkModeClass}')}catch(e){}})('dark')
</script>
`;
