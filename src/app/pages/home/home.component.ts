import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  categories = [
    { name: 'Tissus', slug: 'tissus', icon: '🧵', description: 'Bogolan & Batik' },
    { name: 'Nappes', slug: 'nappes', icon: '🍽️', description: 'Sets de table' },
    { name: 'Sacs', slug: 'sacs', icon: '👜', description: 'Sacs & Accessoires' },
    { name: 'Paniers', slug: 'paniers', icon: '🧺', description: 'Paniers & Déco' }
  ];

  constructor(private router: Router) {}

  goToCategory(slug: string): void {
    this.router.navigate(['/catalogue'], { queryParams: { category: slug } });
  }
  onHover(event: MouseEvent, isHover: boolean): void {
  const card = event.currentTarget as HTMLElement;
  card.style.transform = isHover ? 'translateY(-5px)' : 'translateY(0)';
}
}