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

  search(searchTerms: string[], minMatchingWords: number): string[] {
    let words = SanaJson['kotus-sanalista'].st.map(w => w.s[0]);
    minMatchingWords = minMatchingWords || searchTerms.length;
    minMatchingWords = Math.min(minMatchingWords, searchTerms.length);

    // Remove duplicates
    words = words.reduce(((m, e) => (m[e] = true, m)), {});
    words = Object.keys(words);

    if (searchTerms.length === 0) {
      console.log('Enter at least one word.');
    }

    const resultArr = searchTerms.map(term => {
      const re = new RegExp(`^${term}$`, 'i');
      return words.filter(w => w.match(re));
    });

    const counts = resultArr
      .reduce(((all, matches) => {
        // increase count for each word
        matches.forEach(w => {
          all[w] = (all[w] || 0) + 1;
        });
        return all;
      }), {});

    const res = Object.keys(counts).filter(w => counts[w] >= minMatchingWords);
    this.results.next(res);

    return res;
  }

  clearResults(): void {
    this.results.next([]);
  }

}
