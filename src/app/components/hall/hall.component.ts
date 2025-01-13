import { Component } from '@angular/core';
import { Hall } from '../../models/hall';
import { HallService } from '../../service/hall.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hall',
  standalone: true,
  imports: [CommonModule],
  providers: [HallService],
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent {
  hallList: Hall[] = [];

  constructor(private service: HallService) {}

  ngOnInit() {
    this.service.getAllHalls().subscribe(
      (data: Hall[]) => {
        this.hallList = data;
        console.log('Halls loaded:', this.hallList);
      }
    );
  }

  getHallById(id: number): void {
    this.service.getHallById(id).subscribe(
      (hall: Hall) => console.log('Hall found:', hall)
    );
  }

  deleteHall(id: number): void {
    this.service.deleteHall(id).subscribe(
      () => {
        console.log('Hall deleted successfully');
        this.loadHalls();
      }
    );
  }

  private loadHalls(): void {
    this.service.getAllHalls().subscribe(
      (data: Hall[]) => this.hallList = data
    );
  }

  trackByHallId(index: number, hall: Hall): number {
    return hall.hallId;
  }
}