import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [RouterModule],
  template: `
  @if (image) {
    <div class="container mt-5">
      <img [src]="image" class="img-fluid mb-3" alt="Blog image">
      <p class="lead">{{ text }}</p>
      <a routerLink="/" class="btn btn-secondary">Wróć</a>
    </div>
  }
`
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = '';
  public text: string = '';

  constructor(private service: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.service.getById(id).subscribe((res: any) => {
          this.image = res.image;
          this.text = res.text;
        });
      }
    });
  }
}