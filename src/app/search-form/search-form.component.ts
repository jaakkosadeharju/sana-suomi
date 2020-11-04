import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchService } from '../search.service';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchTerm: string;
  matchPart: boolean;
  matchingWordCount: number;
  termCombineAmountOptions: any;
  searchForm;

  constructor(
    private formBuilder: FormBuilder,
    private service: SearchService,
  ) {
    this.searchTerm = '';
    this.matchPart = false;
    this.termCombineAmountOptions = [
      {value: null, title: 'Kaikki'},
      {value: 1, title: 'Yksi'},
      {value: 2, title: 'Kaksi'},
      {value: 3, title: 'Kolme'},
      {value: 4, title: 'Neljä'},
      {value: 5, title: 'Viisi'},
    ];
    this.searchForm = this.formBuilder.group({
      term: this.searchTerm,
      matchPart: this.matchPart,
      matchingWordCount: this.matchingWordCount
    });
  }

  ngOnInit(): void {
  }

  search(value: any): void {
    const terms = value.term
      .replace(/[^a-zåäöA-Zåäö\.\*]/gi, ' ')
      .replace(/\*/gi, '.*')
      .split(/\s+/)
      .filter(w => w !== '')
      .map(t => value.matchPart ? `.*${t}.*` : t);
    this.service.search(terms, value.matchingWordCount);
  }
}
