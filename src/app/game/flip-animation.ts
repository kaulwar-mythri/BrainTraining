import {
    trigger,
    state,
    style,
    animate,
    transition,
  } from '@angular/animations';
  
  export const flipAnimation = trigger('flip', [
    state(
      'front',
      style({
        transform: 'rotateY(0deg)',
      })
    ),
    state(
      'back',
      style({
        transform: 'rotateY(180deg)',
      })
    ),
    transition('front <=> back', [animate('0.5s ease-in-out')]),
  ]);