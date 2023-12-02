import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prose prose-sm">
  <h1>Help Desk</h1>
 
</div>
  `,
  styles: ``
})
export class HomeComponent {

}
