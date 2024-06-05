import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TableColumn } from '../TableColumn';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  public tableDataSource!: MatTableDataSource<any>;

  public displayedColumns!: any[] ;
  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator ;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() isDetailIcon = false;
  @Input() tableColumns: TableColumn[] = [];
  @Input() rowActionEditIcon!: string;
  @Input() rowActionDetailIcon!: string;
  @Input() rowActionDeleteIcon!: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];
  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowEditAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDeleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDetailAction: EventEmitter<any> = new EventEmitter<any>();


  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor() {}

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionEditIcon && this.rowActionDeleteIcon && this.rowActionDetailIcon) {
      this.displayedColumns = [...columnNames, this.rowActionEditIcon,this.rowActionDeleteIcon]
      if(this.isDetailIcon) {
           this.displayedColumns.push(this.rowActionDetailIcon);

      }
    } else {
      this.displayedColumns = columnNames;
    }
    this.matSort.direction = 'asc';
    this.matSort.active = 'Nom';
  }


  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }


  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // Chercher la colonne correspondant à sortParameters.active
    const column = this.tableColumns.find(column => column.name === sortParameters.active);

    // Vérifier si une colonne correspondante a été trouvée
    if (column) {
      // Définir la propriété active du tri sur la clé de données de la colonne trouvée
      sortParameters.active = column.dataKey;
    }
    // Émettre l'événement de tri avec les paramètres mis à jour
    this.sort.emit(sortParameters);
  }


  emitRowEditAction(row: any) {
    this.rowEditAction.emit(row);
  }
  emitRowDetailAction(row: any) {
    this.rowDetailAction.emit(row);
  }
  emitRowDeleteAction(row: any) {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: "Etes-vous sûr de vouloir le supprimer ?",
      showCancelButton: true,
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rowDeleteAction.emit(row);
        Swal.close;
      }
    });
  }

}
