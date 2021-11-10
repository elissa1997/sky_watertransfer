import Vue from 'vue';

const arcgisModules = Vue.prototype.$arcgisModules;


import globleMask from "@/layers/globleMask.js";



export function loadDefaultLayers(map) {
  // debugger
  globleMask(map);
}