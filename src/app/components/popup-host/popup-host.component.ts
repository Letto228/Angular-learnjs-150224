import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-popup-host',
  templateUrl: './popup-host.component.html',
  styleUrls: ['./popup-host.component.css']
})
export class PopupHostComponent {
  isOpen: boolean = true;
  @Input() set template(template: TemplateRef<unknown> | null) {
    
    console.log('template popup', template)
    if (template) {
      this.isOpen = true;
      this.update(template);
    }
    else{
      this.isOpen = false
    }
  }

  @ViewChild('viewport', {read: ViewContainerRef, static: true})
  private viewportContainer: ViewContainerRef | undefined;

  private update(template: TemplateRef<unknown>) {
    this.viewportContainer?.clear();
    this.viewportContainer?.createEmbeddedView(template);
    console.log('viewportContainer', this.viewportContainer)
  }

}
