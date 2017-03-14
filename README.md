# Grid Problem

The grid problem asks us to create a program that is able to take a grid and generate all the possible combinations of contiguous, unique values within that grid whose sum equals the number of total spaces in the grid.

In our example, we are using a 3x3 grid, and our program will look for combinations of values that total 9, since a 3x3 grid holds 9 spaces.

## Approach

As I first considered this problem, I knew that recursion would likely be the best way to let the computer handle most of the heavy lifting.  What I essentially needed to do was write a program that would iterate through the grid, and then at each iteration it would need to check all surrounding values to see what potential sums were generated.

If the sum were equal to 9, it would add the combination to the list of solutions, and if it was more than 9, it would simply continue iterating.  However, if the sum was less than 9, it would potentially be part of a combination I'd be looking for, so I'd then need to make sure the program called itself recursively, searching all the surrounding cells of that cell that was part of an earlier search.

By storing solutions, indices, and current values at appropriate levels in the architecture, I was confident that I'd be able to write a program that performed as needed.

## Helper Functions

The first thing I had to do was determine which helper functions were needed.  Vanilla JavaScript is rather pathetic at comparing arrays, so at the very least I knew I'd need to help it out in that regard.

### arrayEqualityDetector()

I first needed a function that could simply return true/false booleans depending on whether two arrays were equal.  While it doesn't work on heavily nested arrays, this function served its purpose.

### dupChecker()

In order to ensure that I was not adding differently ordered duplicates to my solutions, I needed to use arrayEqualityDetector to compare the elements of a potential solution to the elements of each solution that had already been stored.

dupChecker iterates through each solution, and within that loop, iterates again over each element in each solution array.  At each element, it compares it to every element in the potential solution, checking for equality.  If every element of a given solution is found in the potential solution, the program returns false, since the potential solution has been proven to be a duplicate.

I'll admit that with 3 nested for loops, dupChecker is a bit lacking when it comes to time complexity, but since the program needs to check for potentially reordered duplicates, this seems like a necessary sacrifice.

### getGrid()

getGrid is a simple function that simply generates a grid from the user-facing input fields so that we can run our program.  Due to JavaScript's liberal attitude towards type comparisons, any value entered that isn't a number will not allow its respective sum to be equal to 9, and will therefore not be used as a solution.

### gridIterator()

The gridIterator is technically the name of the program, but it mainly serves as a container for another function held within it.

gridIterator establishes variables needed to keep track of the solutions, indices, and current elements the program is examining.  It then begins the initial iteration through the grid.

### gridSolver()

gridSolver is a closure, which means it is a function that has access to the variables set by gridIterator, but is defined and called from within gridIterator.

This function executes the pattern I initially conceptualized, where any active sum that is less than 9 is recursively acted upon using a compass of directions, while keeping track of the elements already visited.  By properly setting the correct base cases, our function will traverse through the grid, keeping track of visited values until it either finds a correct combination or determines that the sum is over 9 and it needs to take a step back.

The recursive nature of gridSolver made it necessary for this function to be a closure that had access to previously defined variables.  Since gridSolver will likely call itself multiple times, it needs to store data in variables defined in the external scope so as not to overwrite them every time it calls itself.

### newSolution()

The newSolution function builds and appends paragraph HTML elements containing solutions.  By adding a specific class name to each solution element, we can be sure that they are styled appropriately based on the code pertaining to that class in the external stylesheet.

## Scalability

Aside from its website-specific aspects (i.e. getGrid()), this program can work with a grid of technically any size.  However, the multiple nested loops combined with the extensive recursion that would exponentially (perhaps even factorially) increase with larger grids would likely cause this program to become visibly slow in its execution.

I've considered how I might improve the performance, and while I believe my recursive, directional approach is relatively efficient, I think I could improve the average time complexity by ensuring that I have checks in place to immediately terminate loops or recursive calls when non-solutions have been identified.  I tried to implement those where feasible, but with some restructuring, I think I could do better.
