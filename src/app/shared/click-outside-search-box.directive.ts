import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[emClickOutsideSearchBox]'
})
export class ClickOutsideSearchBoxDirective {

    @Output() public clickOutsideSearchBox = new EventEmitter();
    constructor(private _elementRef: ElementRef) { }
  
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        if (!targetElement) {
            return;
        }
        const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!isClickedInside) {
            this.clickOutsideSearchBox.emit(null);
        }
    }
  
  
  }

