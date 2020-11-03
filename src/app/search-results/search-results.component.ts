import { Component, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnDestroy {
  results: string[] = [];
  subscription: Subscription;

  constructor(
    private service: SearchService
  ) {
    this.subscription = this.service.results$.subscribe(results => {
        this.results = results;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
