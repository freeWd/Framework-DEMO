<template>
  <div id="app">
    <button>
      <router-link to="/">去 Bar</router-link>
    </button>
    <button>
      <router-link to="/foo">去 Foo</router-link>
    </button>
    <p>hello world</p>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
