import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'mat-paginator-goto',
  templateUrl: './mat-paginator-goto.component.html',
  styleUrls: ['./mat-paginator-goto.component.scss'],
})
export class MatPaginatorGotoComponent implements OnInit {
  form: FormGroup;
  pageSize: number;
  pageIndex: number;
  length: number;
  goTo: number;
  pageNumbers: number[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() disabled = false;
  @Input() hidePageSize = false;
  @Input() pageSizeOptions: number[];
  @Input() showFirstLastButtons = false;
  @Output() page = new EventEmitter<PageEvent>();
  @Input('pageIndex') set pageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex;
  }
  @Input('length') set lengthChanged(length: number) {
    this.length = length;
    this.updateGoto();
  }
  @Input('pageSize') set pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.updateGoto();
  }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      goTo: ['', [Validators.required, this.pageNumberValidator(length)]],
    });
    this.updateGoto();
  }

  updateGoto() {
    this.goTo = (this.pageIndex || 0) + 1;
    this.pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.length / this.pageSize); i++) {
      this.pageNumbers.push(i);
    }
  }

  paginationChange(pageEvt: PageEvent) {
    this.length = pageEvt.length;
    this.pageIndex = pageEvt.pageIndex;
    this.pageSize = pageEvt.pageSize;
    this.updateGoto();
    this.emitPageEvent(pageEvt);
  }

  goToChange() {
    this.paginator.pageIndex = this.goTo - 1;
    const event: PageEvent = {
      length: this.paginator.length,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    };
    this.paginator.page.next(event);
    this.emitPageEvent(event);
  }

  emitPageEvent(pageEvent: PageEvent) {
    this.page.next(pageEvent);
  }

  pageNumberValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let incorrectPageNumber;
      if (control.value && maxLength) {
        incorrectPageNumber = control.value < 0 || control.value > maxLength;
      }
      return incorrectPageNumber
        ? { incorrectPageNumber: { value: false } }
        : null;
    };
  }
}
