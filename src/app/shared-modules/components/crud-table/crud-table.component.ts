import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { first } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-crud-table',
  templateUrl: 'crud-table.component.html',
  styleUrls: ['crud-table.component.scss'],
})
@Injectable()
export class CrudTableComponent implements OnChanges {
  @Input() crudEntityUrl: string;
  @Input() tableHeaders: string[];
  @Input() objectProperties: string[];
  @Input() hasSelectableEntries = false;
  @Input() selectedEntities: any[] = [];
  @Output() selectedEntitiesOutput = new EventEmitter<any[]>();
  tableEntries: any[];
  unfilteredTableEntries: any[];
  searchFilterText = '';
  indexColumnFiltered: number | undefined;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['crudEntityUrl'] && changes['crudEntityUrl'].currentValue) {
      this.getAllValues();
    }
  }

  getAllValues() {
    if (!this.crudEntityUrl) {
      return;
    }

    this.http
      .get(`${environment.apiUrl}${this.crudEntityUrl}/all`)
      .pipe(first())
      .subscribe((res) => {
        this.tableEntries = res as [];
        this.unfilteredTableEntries = [...this.tableEntries];
      });
  }

  tableRowClick(entryData: any) {
    if (this.hasSelectableEntries) {
      this.tableRowCheckChange(entryData);
      return;
    }

    this.goToEntryDetail(entryData.id);
  }

  goToEntryDetail(entryDataId: string) {
    this.router.navigate([
      'menu',
      this.router.url.split('/').pop(),
      entryDataId,
    ]);
  }

  tableRowCheckChange(entryData: any) {
    const entryIndex = this.selectedEntities.findIndex(
      (entry) => entry.id === entryData.id
    );

    if (entryIndex === -1) {
      this.selectedEntities.push(entryData);
    } else {
      this.selectedEntities.splice(entryIndex, 1);
    }

    this.selectedEntitiesOutput.emit(this.selectedEntities);
  }

  getTableRowEntryById(entryDataId: string) {
    return this.selectedEntities.find((entry) => entry.id === entryDataId);
  }

  filterColumnFn(orderDirection: string | null, fieldToCompare: string) {
    if (!orderDirection) {
      this.resetAllFilters();
      return;
    }

    let updatedEntries = this.tableEntries.sort((entryA, entryB) => {
      return entryA[fieldToCompare].localeCompare([entryB[fieldToCompare]]);
    });

    if (orderDirection === 'descend') {
      updatedEntries = updatedEntries.reverse();
    }

    this.tableEntries = updatedEntries;
  }

  filterEntriesBySearchTxtParam(indexOfColumnToFilter: number) {
    const fieldToFilter = this.objectProperties[indexOfColumnToFilter];
    const trimmedSearchFilterText = this.searchFilterText
      .trim()
      .toLocaleLowerCase();
    this.tableEntries = this.tableEntries.filter((entry) => {
      return entry[fieldToFilter]
        .toString()
        .trim()
        .toLocaleLowerCase()
        .includes(trimmedSearchFilterText);
    });
    this.indexColumnFiltered = indexOfColumnToFilter;
  }

  resetAllFilters() {
    this.searchFilterText = '';
    this.indexColumnFiltered = undefined;
    this.tableEntries = [...this.unfilteredTableEntries];
    this.removeActiveSortIcons();
  }

  filterThemeType(headerIndex: number) {
    return this.indexColumnFiltered !== undefined &&
      this.indexColumnFiltered === headerIndex
      ? 'fill'
      : 'outline';
  }

  removeActiveSortIcons() {
    const iconName = 'ant-table-column-sorter-';
    const iconList = Array.from(
      document.getElementsByClassName(`${iconName}up`)
    ).concat(Array.from(document.getElementsByClassName(`${iconName}down`)));
    for (const icon of iconList) {
      icon.classList.remove('active');
    }
  }
}
