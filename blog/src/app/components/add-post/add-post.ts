import { Component } from '@angular/core';
import { DataService } from '../../services/data';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.scss'
})
export class AddPostComponent {
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    text: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl('https://via.placeholder.com/150')
  });

  constructor(private dataService: DataService, private router: Router) { }

  submit() {
    if (this.postForm.invalid) return;

    this.dataService.addPost(this.postForm.value).subscribe({
      next: () => {
        alert('Post dodany!');
        this.router.navigate(['/blog']);
      },
      error: (err) => console.error(err)
    });
  }
}