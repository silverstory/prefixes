import {sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild} from '@angular/animations';
// import {sequence, trigger, stagger, animate, style, group, query as q, transition, keyframes, animateChild} from '@angular/animations';
// const query = (s, a, o= {optional: true}) => q(s, a, o);

export const routerTransition = trigger('routerTransition', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    query(':enter', style({ transform: 'translateX(100%)' }), { optional: true }),
    sequence([
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('500ms cubic-bezier(.75,-0.48,.26,1.52)',
            style({ transform: 'translateX(-100%)' })),
        ], { optional: true }),
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('500ms cubic-bezier(.75,-0.48,.26,1.52)',
            style({ transform: 'translateX(0%)' })),
        ], { optional: true }),
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ])
]);

// -------------------------
//    Old Animation Code
// -------------------------
// import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

// export const routerTransition = trigger('routerTransition', [
//   transition('* <=> *', [
//     /* order */
//     /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' })
//       , { optional: true }),
//     // /* 2 */ query('.row', style({ opacity: 0 })), /* query('.block', style({ opacity: 0 })), */
//     /* 3 */ group([  // block executes in parallel
//       query(':enter', [
//         style({ transform: 'translateX(100%)' }),
//         animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' } ))
//       ], { optional: true }),
//       query(':leave', [
//         style({ transform: 'translateX(0%)' }),
//         animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' } ))
//       ], { optional: true }),
//     ]),
//     // /* 4 */ query(':enter .row', stagger(400, [ /* query(':enter .block', stagger(400, [ */
//     //     style({ transform: 'translateY(100px)' }),
//     //     animate('1s ease-in-out',
//     //       style({ transform: 'translateY(0px)', opacity: 1 })),
//     //   ])),
//   ])
// ]);
