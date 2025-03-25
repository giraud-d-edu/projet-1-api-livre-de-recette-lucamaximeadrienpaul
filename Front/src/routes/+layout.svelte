<script>
  import { page } from '$app/state';
  import "../app.css";

  let btnStyle = "inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white hover:translate-y-1 transition-transform duration-300 focus:ring-3 focus:outline-hidden";
  let btnActive = "inline-block rounded-sm border border-indigo-600 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 text-sm sm:text-base md:text-lg lg:text-xl font-medium bg-white focus:ring-3 hover:translate-y-[-3px] transition-transform duration-300 focus:outline-hidden";
</script>

<nav class="bg-indigo-600">
  <ul>
    <li class:{btnActive}={page.url.pathname === '/'}>
      <a class={page.url.pathname === '/' ? btnActive : btnStyle} href="/">Accueil</a>
    </li>
    <li class:active={page.url.pathname === '/recipe'}>
      <a class={page.url.pathname === '/recipe' ? btnActive : btnStyle} href="/recipe">Recette</a>
    </li>
    <li class:active={page.url.pathname === '/ingredient'}>
      <a class={page.url.pathname === '/ingredient' ? btnActive : btnStyle} href="/ingredient">Ingrédients</a>
    </li>
    <li class:active={page.url.pathname === '/category'}>
      <a class={page.url.pathname === '/category' ? btnActive : btnStyle} href="/category">Catégories</a>
    </li>
    <li class:active={page.url.pathname === '/about'}>
      <a class={page.url.pathname === '/about' ? btnActive : btnStyle} href="/about">À propos</a>
    </li>
    <li class:active={page.url.pathname === '/contact'}>
      <a class={page.url.pathname === '/contact' ? btnActive : btnStyle} href="/contact">Contact</a>
    </li>
  </ul>
</nav>

<main>
  <slot />
</main>

<style>
  nav {
    padding: 1em;
    border-radius: 0 0 50% 50%;
    overflow: hidden;
  }
  
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  li {
    margin-right: 1em;
    margin-bottom: 0.5em;
  }
  
  .active {
    font-weight: bold;
  }
  
  main {
    padding: 1em;
  }
</style>