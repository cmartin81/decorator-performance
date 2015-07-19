[![Build Status](https://travis-ci.org/cmartin81/decorator-performance.svg)](https://travis-ci.org/cmartin81/decorator-performance)

# decorator-performance
A ES6 decorator for logging out performance.

Should also work in frontend code if you use babel with es7.decorators enabled.

## Install
    $ npm install --save decorator-performance

## API
* @performance => Will log out the performance using console.time (works good in browsers)
* @performance() => Will log out with the standard template (<%= name %> tok <%= time %> ms)
* @performance(string) => Will log out with the the input string as template. (Available variables are: <%= name %> and <%= time %>)


## Example
    // ES2016 style
    import {performance} from 'decorator-performance'

    // CommonJS style
    let performance = require('decorator-performance').performance;
    
    class SuperNiceClass {
        @performance       //use this decorator
        @performance()     //or this decorator
        @performance('Customized output!!! TIME = <%= time %> ms NAME = <%= name %>') //or this decorator
            bar(a) {
            let x = 0;
            for ( let i = 1; i < 100000000; i++){
                x += i;
            }
            return x;
        }
    }
    new SuperNiceClass().bar(10)
    
## Output
    Customized output!!! TIME = 102.343 ms NAME = bar
    bar tok 102.343 ms
    bar: 102ms

## Note
You need to run babel with the option 'es7.decorators' enabled.

## License
MIT © Christian Martin

## dependencies
decorator-wrap