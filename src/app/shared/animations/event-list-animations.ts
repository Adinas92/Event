import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';
 
export const aborNewEventAnimation = 
trigger('aborNewEventAnimation', [
        state('newEventBoxActive', style({display: 'block'})),
        state('newEventBoxInActive', style({display: 'none'})),
        state('newEventSaved', style({display: 'none'})),
    transition('newEventBoxActive => newEventBoxInActive', [
        animate(600, keyframes([
            style({opacity: 1, transform: 'translate(0px)'}),
            style({opacity: 1, transform: 'translateY(-250px)'}),            
        ]))
    ]),
    transition('newEventBoxInActive => newEventBoxActive', [
        animate(600, keyframes([
            style({opacity: 1, transform: 'translateY(-250px)'}),
            style({opacity: 1, transform: 'translate(0px)'}),
                        
        ]))
    ]),
    transition('newEventBoxActive => newEventSaved', [
        animate(600, keyframes([
            style({opacity: 0, transform: 'translate(0px)'}),
                        
        ]))
    ])

])

export const focusPanel =

trigger('focusPanel', [
    state('inactive', style({
        transform: 'scale(1)',
        backgroundColor: '#eee'
    })),
    state('active', style({
        transform: 'scale(1.1)',
        backgroundColor: '#cfd8dc'
    })),
    transition('inactive => active', animate('100ms ease-in')),
    transition('active => inactive', animate('100ms ease-out'))
])