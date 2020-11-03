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
  searchForm;

  constructor(
    private formBuilder: FormBuilder,
    private service: SearchService,
  ) {
    this.searchTerm = '';
    this.searchForm = this.formBuilder.group({
      term: this.searchTerm
    });
  }

  ngOnInit(): void {
  }

  search(value: any): void {
    const terms = value.term
      .replace(/[^a-zåäöA-Zåäö\.\*]/gi, ' ')
      .replace(/\*/gi, '.*')
      .split(/\s+/)
      .map(t => `${t}`);
    this.service.search(terms);
  }
}
