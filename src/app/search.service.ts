import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import SanaJson from '../assets/json/kotus-sanalista_v1.json';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private results = new Subject<string[]>();
  results$ = this.results.asObservable();

  constructor() {}

  private findWords(words: string[], searchTerms: string[]): string[] {
    if (searchTerms.length === 0) {
      console.log('Enter at least one word.');
    }

    return searchTerms.reduce((arr, term) => {
      const re = new RegExp(`^${term}$`, 'i');
      return arr.filter(w => w.match(re));
    }, words);
  }

  search(searchTerms: string[]): string[] {
    let words = SanaJson['kotus-sanalista'].st.map(w => w.s[0]);

    // Remove duplicates
    words = words.reduce(((m, e) => (m[e] = true, m)), {});
    words = Object.keys(words);

    const res = this.findWords(words, searchTerms);

    this.results.next(res);

    return res;
  }

  clearResults(): void {
    this.results.next([]);
  }

}
