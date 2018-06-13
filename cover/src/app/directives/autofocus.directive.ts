import { Directive,
         ElementRef, 
         AfterViewInit,
         ChangeDetectorRef }                      from '@angular/core'

@Directive({
selector: '[coAutoFocus]'
})

export class CoAutoFocusDirective implements AfterViewInit {

  constructor(private element   : ElementRef,
              private changeRef : ChangeDetectorRef) { }

  ngAfterViewInit() { 
    this.element.nativeElement.focus()
    this.changeRef.detectChanges()
  }
}