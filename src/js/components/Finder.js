import {templates,select,classNames} from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;
    thisFinder.element = element;

    thisFinder.step = 1;

    thisFinder.grid = {};
    for(let row = 1; row <= 10; row ++){
      thisFinder.grid[row] = {};
      for(let col = 1; col <= 10; col ++){
        thisFinder.grid[row][col] = false;
      }
    }
    thisFinder.render();
  }


  changeStep(newStep){
    const thisFinder = this;
    thisFinder.step = newStep;
    thisFinder.render();
  }

  toggleField(fieldElem) {
    const thisFinder = this;
  
    const field = {
      row: fieldElem.getAttribute('data-row'),
      col: fieldElem.getAttribute('data-col')
    };

    if(thisFinder.grid[field.row][field.col]) {
      thisFinder.grid[field.row][field.col] = false;
      fieldElem.classList.remove(classNames.finder.active);
    }
  
    else {

      const gridValues = Object.values(thisFinder.grid)
        .map(col => Object.values(col))
        .flat();
  

      if(gridValues.includes(true)) {
  
        const edgeFields = [];
        if(field.col > 1) edgeFields.push(thisFinder.grid[field.row][field.col-1]);
        if(field.col < 10) edgeFields.push(thisFinder.grid[field.row][field.col+1]); 
        if(field.row > 1) edgeFields.push(thisFinder.grid[field.row-1][field.col]); 
        if(field.row < 10) edgeFields.push(thisFinder.grid[field.row+1][field.col]); 
  

        if(!edgeFields.includes(true)) {
          alert('A new field should touch at least one that is already selected!');
          return;
        }
      }
      thisFinder.grid[field.row][field.col] = true;
      fieldElem.classList.add(classNames.finder.active);
    }
  }

  initActions(){
    const thisFinder = this;
    if(thisFinder.step === 1) {
      thisFinder.element.querySelector(select.finder.submitBtn).addEventListener('click', function(elem) {
        elem.preventDefault();
        thisFinder.changeStep(2);
      });
      
      
      thisFinder.element.querySelector(select.containerOf.grid).addEventListener('click', function(e) {
        e.preventDefault();
        if(e.target.classList.contains('field')){
          thisFinder.toggleField(e.target);
        }
      });
    }

    /*else if(thisFinder.step === 2) {
      thisFinder.element.querySelector(select.finder.submitBtn).addEventListener('click', function(elem) {
        elem.preventDefault();
        thisFinder.changeStep(3);
      });

      thisFinder.element.querySelector(select.containerOf.grid).addEventListener('click', function(elem) {
        elem.preventDefault();
        thisFinder.pickStartEnd(elem.target);
      });
    }

    else if(thisFinder.step === 3) {
      thisFinder.element.querySelector(select.finder.submitBtn).addEventListener('click', function(elem) {
        elem.preventDefault();
        thisFinder.changeStep(1);
      });
    }*/
  }

  render(){
    const thisFinder = this;
    let pageData = null;
    
    switch(thisFinder.step) {
    case 1: 
      pageData = { title: 'Draw routes', btnText: 'Finish drawing' };
      break;
    case 2:
      pageData = { title: 'Pick start and finish', btnText: 'Compute routes' };
      break;
    case 3:
      pageData = { title: 'The best route is', btnText: 'Start again' };
      break;
    }

    const generatedHTML = templates.finder(pageData);
    thisFinder.element.innerHTML = generatedHTML;

    let html = '';
    for(let row=1; row<=10; row++){
      for(let col=1; col<=10; col++){
        html += '<div class="field" data-row="' + row + '" data-col="' + col + '"></div>';
      }
    }

    thisFinder.element.querySelector(select.containerOf.grid).innerHTML = html;

    thisFinder.initActions();
  }
}

export default Finder;