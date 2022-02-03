# countdown

A simple seven-segment style countdown display. Use url query params to configure the timer:

- `minutes`: the number of minutes for the timer to initialize
- `seconds`: the number of seconds for the timer to initialize, this will be added to minutes.
- `start`: set to "false" to not auto-start the timer on page load. click on the timer to start it. default is true.

At any point, clicking on the clock will reset the timer to the initial time.

