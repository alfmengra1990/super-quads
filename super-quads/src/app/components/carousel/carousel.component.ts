import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('wheelWrapper') wheelWrapper!: ElementRef;

  private isDragging = false;
  private startAngle = 0;
  private currentAngle = -39;
  private rotationSpeed = 1;

  items = [
    { id: 0, text: 'Prioridad: Seguridad' },
    { id: 1, text: 'Bosque Privado' },
    { id: 2, text: 'Grupos reducidos' },
    { id: 3, text: 'Experiencia Exclusiva' },
    { id: 4, text: 'Guías Experimentados' },
    { id: 5, text: 'Vistas Únicas' },
    { id: 6, text: 'Piscina Termal' }
  ]

  selectedId: number = 6;

  ngAfterViewInit() {
    this.setupDragEvents();
  }

  private setupDragEvents() {
    const wheel = this.wheelWrapper.nativeElement;
    const events = [
      { type: 'mousedown', handler: this.onDragStart.bind(this) },
      { type: 'touchstart', handler: this.onDragStart.bind(this), options: { passive: false } },
    ];

    events.forEach(event => {
      wheel.addEventListener(event.type, event.handler, event.options);
    });

    document.addEventListener('mousemove', this.onDragMove.bind(this));
    document.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });
    document.addEventListener('mouseup', this.onDragEnd.bind(this));
    document.addEventListener('touchend', this.onDragEnd.bind(this));
  }

  private getClientX(e: MouseEvent | TouchEvent): number {
    return e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  }

  private getCenterPosition(rect: DOMRect) {
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  private onDragStart(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.isDragging = true;

    const rect = this.wheelWrapper.nativeElement.getBoundingClientRect();
    const center = this.getCenterPosition(rect);
    this.startAngle = Math.atan2(this.getClientX(e) - center.x, center.y - rect.top) * (180 / Math.PI);
  }

  private onDragMove(e: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    e.preventDefault();

    const rect = this.wheelWrapper.nativeElement.getBoundingClientRect();
    const center = this.getCenterPosition(rect);
    const currentAngle = Math.atan2(this.getClientX(e) - center.x, center.y - rect.top) * (180 / Math.PI);
    const angleDiff = currentAngle - this.startAngle;

    this.currentAngle += angleDiff * this.rotationSpeed;
    this.startAngle = currentAngle;

    this.wheelWrapper.nativeElement.style.transform = `translateY(65%) rotate(${this.currentAngle}deg)`;
  }

  private onDragEnd() {
    this.isDragging = false;
  }
  
  selectedItem(id: number){
    this.selectedId = id;
  }
}
