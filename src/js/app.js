import Finder from './components/Finder.js';
import {select} from './settings.js';

const app = {


  initFinder: function() {
    const thisApp = this;

    const finderContainer = document.querySelector(select.containerOf.finder);

    thisApp.finder = new Finder(finderContainer);
  },

  init: function () {
    const thisApp = this;
    thisApp.initFinder();
  },
};

app.init();