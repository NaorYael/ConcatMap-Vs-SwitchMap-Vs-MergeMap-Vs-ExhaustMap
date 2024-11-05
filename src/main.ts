import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { concatMap, switchMap, mergeMap, exhaustMap, Observable, of, delay } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h1>RxJS Map Operators Demo</h1>
      
      <div>
        <input [formControl]="searchControl" 
               placeholder="Type to search..."
               class="search-input">
      </div>

      <div class="results-grid">
        <div class="result-card">
          <h3>concatMap</h3>
          <p>Queues: {{ concatResults.join(', ') }}</p>
        </div>

        <div class="result-card">
          <h3>switchMap</h3>
          <p>Latest only: {{ switchResults.join(', ') }}</p>
        </div>

        <div class="result-card">
          <h3>mergeMap</h3>
          <p>Parallel: {{ mergeResults.join(', ') }}</p>
        </div>

        <div class="result-card">
          <h3>exhaustMap</h3>
          <p>Ignores until complete: {{ exhaustResults.join(', ') }}</p>
        </div>
      </div>
    </div>
  `
})
export class App implements OnInit {
  searchControl = new FormControl('');
  concatResults: string[] = [];
  switchResults: string[] = [];
  mergeResults: string[] = [];
  exhaustResults: string[] = [];

  ngOnInit() {
    // Setup search streams
    const searchStream = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    // concatMap - Executes in sequence, maintaining order
    searchStream.pipe(
      concatMap(term => this.mockSearch(term, 'concat'))
    ).subscribe(result => {
      this.concatResults.push(result);
      if (this.concatResults.length > 3) this.concatResults.shift();
    });

    // switchMap - Cancels previous, takes latest
    searchStream.pipe(
      switchMap(term => this.mockSearch(term, 'switch'))
    ).subscribe(result => {
      this.switchResults.push(result);
      if (this.switchResults.length > 3) this.switchResults.shift();
    });

    // mergeMap - Executes in parallel
    searchStream.pipe(
      mergeMap(term => this.mockSearch(term, 'merge'))
    ).subscribe(result => {
      this.mergeResults.push(result);
      if (this.mergeResults.length > 3) this.mergeResults.shift();
    });

    // exhaustMap - Ignores new until current completes
    searchStream.pipe(
      exhaustMap(term => this.mockSearch(term, 'exhaust'))
    ).subscribe(result => {
      this.exhaustResults.push(result);
      if (this.exhaustResults.length > 3) this.exhaustResults.shift();
    });
  }

  mockSearch(term: string | null, operator: string): Observable<string> {
    const delay_ms = Math.random() * 1000 + 500; // Random delay between 500-1500ms
    return of(`${operator}: ${term} (${delay_ms.toFixed(0)}ms)`).pipe(
      delay(delay_ms)
    );
  }
}

bootstrapApplication(App);