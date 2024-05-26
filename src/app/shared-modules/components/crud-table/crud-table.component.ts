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
import { Router } from '@angular/router';
import { first } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DateUtilsService } from '../../../common/services/date-utils.service';

export type AdditionalCrudTableParametersByProperty = {
  [property: string]: {
    subParameter?: string;
    dataType?: 'date' | 'any';
    formatTo?: string;
  };
};

@Component({
  selector: 'app-crud-table',
  templateUrl: 'crud-table.component.html',
  styleUrls: ['crud-table.component.scss'],
})
@Injectable()
export class CrudTableComponent implements OnChanges {
  @Input() crudEntityUrl: string; // Url de la que obtener las entidades
  @Input() localEntities: any[]; // Listado de entidades locales
  @Input() tableHeaders: string[];
  @Input() objectProperties: string[];
  @Input() hasSelectableEntries = false;
  @Input() isSingleSelection = false;
  @Input() selectedEntities: any[] = [];
  @Input()
  additionalCrudTableParametersByProperty: AdditionalCrudTableParametersByProperty;
  @Input() disableNewButton = false;
  @Output() selectedEntitiesOutput = new EventEmitter<any[]>();
  tableEntries: any[];
  unfilteredTableEntries: any[];
  paginatedEntries: any[];
  searchFilterTextByColumn: { textFilterValue: string; isActive: boolean }[];
  pageIndex = 1;
  pageSize = 10;
  constructor(
    private http: HttpClient,
    private router: Router,
    private dateUtilsService: DateUtilsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableHeaders'] && changes['tableHeaders'].currentValue) {
      this.fillSearchFilterTextByColumnByTableHeadersLength();
    }

    if (changes['localEntities'] && changes['localEntities'].currentValue) {
      this.tableEntries = this.localEntities;
      this.unfilteredTableEntries = [...this.tableEntries];
    }

    if (changes['crudEntityUrl'] && changes['crudEntityUrl'].currentValue) {
      this.getAllValuesFromCrudUrl();
    }
  }

  fillSearchFilterTextByColumnByTableHeadersLength() {
    const emptyFilter = {
      textFilterValue: '',
      isActive: false,
    };

    this.searchFilterTextByColumn = Array(this.tableHeaders.length).fill({
      ...emptyFilter,
    });
  }

  getAllValuesFromCrudUrl() {
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

    if (this.isSingleSelection) {
      this.selectedEntities = [];
    }

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
    if (!this.tableEntries) {
      return;
    }

    if (!orderDirection) {
      this.resetAllFilters();
      return;
    }

    let updatedEntries = this.tableEntries.sort((entryA, entryB) => {
      return this.getEntryDataByProperty(entryA, fieldToCompare)
        .toString()
        .localeCompare(
          this.getEntryDataByProperty(entryB, fieldToCompare).toString()
        );
    });

    if (orderDirection === 'descend') {
      updatedEntries = updatedEntries.reverse();
    }

    this.tableEntries = updatedEntries;
  }

  filterEntriesBySearchTxtParam(indexOfColumnToFilter: number) {
    if (!this.tableEntries) {
      return;
    }

    const fieldToFilter = this.objectProperties[indexOfColumnToFilter];
    const trimmedSearchFilterText = this.searchFilterTextByColumn[
      indexOfColumnToFilter
    ].textFilterValue
      .trim()
      .toLocaleLowerCase();
    this.tableEntries = this.tableEntries.filter((entry) => {
      return this.getEntryDataByProperty(entry, fieldToFilter)
        .toString()
        .trim()
        .toLocaleLowerCase()
        .includes(trimmedSearchFilterText);
    });

    this.searchFilterTextByColumn[indexOfColumnToFilter].isActive = true;
  }

  updateSearchFilterTextByColumn(text: string, index: number) {
    this.searchFilterTextByColumn[index] = {
      ...this.searchFilterTextByColumn[index],
      textFilterValue: text,
    };
  }

  resetAllFilters() {
    if (!this.tableEntries) {
      return;
    }

    this.fillSearchFilterTextByColumnByTableHeadersLength();
    this.tableEntries = [...this.unfilteredTableEntries];
    this.removeActiveSortIcons();
  }

  filterThemeType(headerIndex: number) {
    const searchFilterTextByColumnByIndex =
      this.searchFilterTextByColumn[headerIndex];
    return searchFilterTextByColumnByIndex.textFilterValue.length &&
      searchFilterTextByColumnByIndex.isActive
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

  getEntryDataByProperty(entryData: any, property: string) {
    let data = entryData[property];

    if (
      !this.additionalCrudTableParametersByProperty ||
      !this.additionalCrudTableParametersByProperty[property]
    ) {
      return data;
    }

    const additionalParams =
      this.additionalCrudTableParametersByProperty[property];
    if (additionalParams.subParameter) {
      data = data[additionalParams.subParameter];
    }

    if (additionalParams.dataType === 'date') {
      data = this.dateUtilsService.daysJsUtc(data);

      if (additionalParams.formatTo) {
        data = data.format(additionalParams.formatTo);
      }
    }

    return data;
  }

  asignPaginatedEntries(entries: readonly any[]) {
    this.paginatedEntries = entries as any[];
  }
}
