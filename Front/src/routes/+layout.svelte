<script>
  import { page } from '$app/state';
</script>

<nav>
  <ul>
    <li class:active={page.url.pathname === '/'}>
      <a href="/">Accueil</a>
    </li>
    <li class:active={page.url.pathname === '/recipe'}>
      <a href="/recipe">Recettes</a>
    </li>
    <li class:active={page.url.pathname === '/ingredient'}>
      <a href="/ingredient">Ingrédients</a>
    </li>
    <li class:active={page.url.pathname === '/category'}>
      <a href="/category">Catégories</a>
    </li>
    <li class:active={page.url.pathname === '/about'}>
      <a href="/about">À propos</a>
    </li>
    <li class:active={page.url.pathname === '/contact'}>
      <a href="/contact">Contact</a>
    </li>
  </ul>
</nav>

<main>
  <slot />
</main>

<style>
  nav {
    background-color: #f5f5f5;
    padding: 1em;
  }
  
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin-right: 1em;
  }
  
  .active {
    font-weight: bold;
  }
  
  main {
    padding: 1em;
  }
</style>