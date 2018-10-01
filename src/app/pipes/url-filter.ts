import {Pipe} from '@angular/core';

@Pipe({
  name: 'mattDamon'
})
export class MattDamon {
  transform(value, args) {

    //Count how many words were passed in
    let wordCount = value.split(" ").length;
    let newValue = "";

    for(let i = 0; i < wordCount; i++){
      newValue += "Matt Damon ";
    }

    return newValue;
  }
}
