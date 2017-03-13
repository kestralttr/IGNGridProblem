
const compass = [
  [-1,0],
  [-1,1],
  [0,1],
  [1,1],
  [1,0],
  [1,-1],
  [0,-1],
  [-1,-1]
];

// making an array equality checker
let arrayEqualityDetector = function(arr1,arr2) {
  let isEqual = true;
  arr1.forEach(function(el,idx) {
    if(typeof el.constructor == Array && typeof arr2[idx].constructor == Array) {
      isEqual = arrayEqualityDetector(el,arr2[idx]);
    } else if(el !== arr2[idx]) {
      isEqual = false;
    }
  });
  return isEqual;
};

let sampleLists =  [
  [[1,2],[1,1]],
  [[2,2],[2,1]]
];

let sampleNew = [
  [1,1],[1,3]
];

let dupChecker = function(indexLists,newList) {
  let outerMatch = false;
  let innerMatch = false;
  for(i=0;i<indexLists.length;i++) {
    for(j=0;j<indexLists[i].length;j++) {
      for(k=0;k<newList.length;k++) {
        if(arrayEqualityDetector(indexLists[i][j],newList[k]) === true) {
          innerMatch = true;
          break;
        }
      }
      if(innerMatch === true) {
        outerMatch = true;
        innerMatch = false;
      } else {
        outerMatch = false;
      }
      if(outerMatch === false) {
        break;
      }
    }
    if(outerMatch === true) {
      return true;
    }
  }
  return false;
};

Array.prototype.doesInclude = function(arr) {
  let result = false;
  let foundMatch = true;
  this.forEach(function(el,idx) {
    if(el.length === arr.length) {
      foundMatch = true;
      for (let i = 0; i < arr.length; i++) {
        if(arr[i] !== el[i]) {
          foundMatch = false;
          break;
        }
      }
      if(foundMatch === true) {
        result = true;
      }
    }
  });
  return result;
};

let getGrid = function() {
  let inputArray = document.getElementsByClassName("number-entry");
  console.log(inputArray);
  let arr0 = [];
  let arr1 = [];
  let arr2 = [];

  for (var i = 0; i < 9; i++) {
    if(i <= 2) {
      arr0.push(parseInt(inputArray[i].value));
    } else if(i <= 5) {
      arr1.push(parseInt(inputArray[i].value));
    } else {
      arr2.push(parseInt(inputArray[i].value));
    }
  }
  return [arr0,arr1,arr2];
};

let gridIterator = function() {
  let solutionIdxs = [];
  let solutions = [];
  let currentVals = [];
  let currentIdxs = [];

  let grid = getGrid();

  grid.forEach(function(outerVal,outerIdx) {
    outerVal.forEach(function(innerVal,innerIdx) {
      currentVals.push(innerVal);
      currentIdxs.push([outerIdx,innerIdx]);

      let gridSolver = function(outerIdx,innerIdx) {
        compass.forEach(function(dir) {

          let newOuterIdx = outerIdx + dir[0];
          let newInnerIdx = innerIdx + dir[1];

          if(newOuterIdx >= 0 &&
            newOuterIdx < grid.length &&
            newInnerIdx >= 0 &&
            newInnerIdx < grid[0].length &&
            !currentIdxs.doesInclude([newOuterIdx,newInnerIdx])) {
              currentVals.push(grid[newOuterIdx][newInnerIdx]);
              currentIdxs.push([newOuterIdx,newInnerIdx]);

              let currentTotalVal = currentVals.reduce(function(el,sum) {
                return el + sum;
              },0);

              let gridSpaces = grid.length * grid[0].length;

              if(currentTotalVal === gridSpaces) {
                if(!solutions.doesInclude(currentVals) && dupChecker(solutionIdxs,currentIdxs) === false) {
                  solutions.push([]);
                  solutionIdxs.push([]);
                  currentVals.forEach(function(el) {
                    solutions[solutions.length-1].push(el);
                  });
                  currentIdxs.forEach(function(el) {
                    solutionIdxs[solutionIdxs.length-1].push(el);
                  });
                }
                currentVals.pop(1);
                currentIdxs.pop(1);
              }
              if(currentTotalVal > gridSpaces) {
                currentVals.pop(1);
                currentIdxs.pop(1);
              }
              if(currentTotalVal < gridSpaces) {
                gridSolver(newOuterIdx,newInnerIdx);
                currentVals.pop(1);
                currentIdxs.pop(1);
              }
            }
        });
        return;
      };

      gridSolver(outerIdx,innerIdx);
      currentVals = [];
      currentIdxs = [];
    });
  });

  console.log(solutions);
  console.log(solutionIdxs);

  let resultStr = "";
  
  function newSolution(arr) {
    arr.forEach(function(val) {
      resultStr = resultStr + val + " ";
    });
    document.getElementById("results-section").appendChild(document.createElement('p').innerHTML = resultStr);
    // let newP = document.createElement('p');
    // newP.innerHTML = resultStr;
    // document.getElementById("results-section").appendChild(newP);
    // let brTag = document.createElement('br');
    // document.getElementById("results-section").appendChild(brTag);
    resultStr = "";
  }

  solutions.forEach(function(el) {
    new newSolution(el);
  });

  let results = document.getElementById("results-section");
  results.innerHTML = solutions;
};

// gridIterator(grid1);
