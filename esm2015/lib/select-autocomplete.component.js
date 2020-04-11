/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
export class SelectAutocompleteComponent {
    constructor() {
        this.selectPlaceholder = "search...";
        this.disabled = false;
        this.display = "display";
        this.value = "value";
        this.formControl = new FormControl();
        this.errorMsg = "Field is required";
        this.showErrorMsg = false;
        this.otherMsg = 'other';
        this.multiple = true;
        // New Options
        this.labelCount = 1;
        this.appearance = "standard";
        this.selectionChange = new EventEmitter();
        this.filteredOptions = [];
        this.selectedValue = [];
        this.selectAllChecked = false;
        this.displayString = "";
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.disabled) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
        this.filteredOptions = this.options;
        if (this.selectedOptions) {
            this.selectedValue = this.selectedOptions;
        }
        else if (this.formControl.value) {
            this.selectedValue = this.formControl.value;
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (!this.selectedValue.length) {
            this.selectionChange.emit(this.selectedValue);
        }
    }
    /**
     * @return {?}
     */
    toggleDropdown() {
        this.selectElem.toggle();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    toggleSelectAll(val) {
        if (val.checked) {
            this.filteredOptions.forEach(option => {
                if (!this.selectedValue.includes(option[this.value])) {
                    this.selectedValue = this.selectedValue.concat([option[this.value]]);
                }
            });
        }
        else {
            /** @type {?} */
            const filteredValues = this.getFilteredOptionsValues();
            this.selectedValue = this.selectedValue.filter(item => !filteredValues.includes(item));
        }
        this.selectionChange.emit(this.selectedValue);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    filterItem(value) {
        this.filteredOptions = this.options.filter(item => item[this.display].toLowerCase().indexOf(value.toLowerCase()) > -1);
        this.selectAllChecked = true;
        this.filteredOptions.forEach(item => {
            if (!this.selectedValue.includes(item[this.value])) {
                this.selectAllChecked = false;
            }
        });
        if (!this.filteredOptions.length) {
            this.selectAllChecked = false;
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    hideOption(option) {
        return !(this.filteredOptions.indexOf(option) > -1);
    }
    /**
     * @return {?}
     */
    getFilteredOptionsValues() {
        /** @type {?} */
        const filteredValues = [];
        this.filteredOptions.forEach(option => {
            filteredValues.push(option.value);
        });
        return filteredValues;
    }
    /**
     * @return {?}
     */
    onDisplayString() {
        this.displayString = "";
        if (this.selectedValue && this.selectedValue.length) {
            /** @type {?} */
            let displayOption = [];
            if (this.multiple) {
                // Multi select display
                for (let i = 0; i < this.labelCount; i++) {
                    displayOption[i] = this.options.filter(option => option[this.value] === this.selectedValue[i])[0];
                }
                if (displayOption.length) {
                    for (let i = 0; i < displayOption.length; i++) {
                        if (displayOption[i] && displayOption[i][this.display]) {
                            this.displayString += displayOption[i][this.display] + ",";
                        }
                    }
                    this.displayString = this.displayString.slice(0, -1);
                    if (this.selectedValue.length > 1 &&
                        this.selectedValue.length > this.labelCount) {
                        this.displayString += ` (+${this.selectedValue.length -
                            this.labelCount} ${this.otherMsg})`;
                    }
                }
            }
            else {
                // Single select display
                displayOption = this.options.filter(option => option[this.value] === this.selectedValue);
                if (displayOption.length) {
                    this.displayString = displayOption[0][this.display];
                }
            }
        }
        return this.displayString;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    onSelectionChange(val) {
        /** @type {?} */
        const filteredValues = this.getFilteredOptionsValues();
        /** @type {?} */
        let count = 0;
        if (this.multiple) {
            this.selectedValue.filter(item => {
                if (filteredValues.includes(item)) {
                    count++;
                }
            });
            this.selectAllChecked = count === this.filteredOptions.length;
        }
        this.selectedValue = val.value;
        this.selectionChange.emit(this.selectedValue);
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return item.value;
    }
}
SelectAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: "mat-select-autocomplete",
                template: `
    <mat-form-field appearance="{{ appearance }}">
      <mat-select
        #selectElem
        [placeholder]="placeholder"
        [formControl]="formControl"
        [multiple]="multiple"
        [(ngModel)]="selectedValue"
        (selectionChange)="onSelectionChange($event)"
      >
        <div class="box-search">
          <mat-checkbox
            *ngIf="multiple"
            color="primary"
            class="box-select-all"
            [(ngModel)]="selectAllChecked"
            (change)="toggleSelectAll($event)"
          ></mat-checkbox>
          <input
            #searchInput
            type="text"
            [ngClass]="{ 'pl-1': !multiple }"
            (input)="filterItem(searchInput.value)"
            [placeholder]="selectPlaceholder"
          />
          <div
            class="box-search-icon"
            (click)="filterItem(''); searchInput.value = ''"
          >
            <button mat-icon-button class="search-button">
              <mat-icon class="mat-24" aria-label="Search icon">clear</mat-icon>
            </button>
          </div>
        </div>
        <mat-select-trigger>
          {{ onDisplayString() }}
        </mat-select-trigger>
        <mat-option
          *ngFor="let option of options; trackBy: trackByFn"
          [disabled]="option.disabled"
          [value]="option[value]"
          [style.display]="hideOption(option) ? 'none' : 'flex'"
          >{{ option[display] }}
        </mat-option>
      </mat-select>
      <mat-hint style="color:red" *ngIf="showErrorMsg">{{ errorMsg }}</mat-hint>
    </mat-form-field>
  `,
                styles: [`
      .box-search {
        margin: 8px;
        border-radius: 2px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),
          0 0 0 1px rgba(0, 0, 0, 0.08);
        transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
      }
      .box-search input {
        flex: 1;
        border: none;
        outline: none;
      }
      .box-select-all {
        width: 36px;
        line-height: 33px;
        color: #808080;
        text-align: center;
      }
      .search-button {
        width: 36px;
        height: 36px;
        line-height: 33px;
        color: #808080;
      }
      .pl-1 {
        padding-left: 1rem;
      }
    `]
            }] }
];
/** @nocollapse */
SelectAutocompleteComponent.ctorParameters = () => [];
SelectAutocompleteComponent.propDecorators = {
    selectPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    options: [{ type: Input }],
    disabled: [{ type: Input }],
    display: [{ type: Input }],
    value: [{ type: Input }],
    formControl: [{ type: Input }],
    errorMsg: [{ type: Input }],
    showErrorMsg: [{ type: Input }],
    otherMsg: [{ type: Input }],
    selectedOptions: [{ type: Input }],
    multiple: [{ type: Input }],
    labelCount: [{ type: Input }],
    appearance: [{ type: Input }],
    selectionChange: [{ type: Output }],
    selectElem: [{ type: ViewChild, args: ["selectElem",] }]
};
if (false) {
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectPlaceholder;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.placeholder;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.options;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.disabled;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.display;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.value;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.formControl;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.errorMsg;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.showErrorMsg;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.otherMsg;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectedOptions;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.multiple;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.labelCount;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.appearance;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectionChange;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectElem;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.filteredOptions;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectedValue;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.selectAllChecked;
    /** @type {?} */
    SelectAutocompleteComponent.prototype.displayString;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXQtc2VsZWN0LWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3QtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBcUY3QyxNQUFNO0lBNEJKO2lDQTNCcUMsV0FBVzt3QkFHNUIsS0FBSzt1QkFDTixTQUFTO3FCQUNYLE9BQU87MkJBQ1ksSUFBSSxXQUFXLEVBQUU7d0JBQ3pCLG1CQUFtQjs0QkFDdkIsS0FBSzt3QkFDVCxPQUFPO3dCQUdQLElBQUk7OzBCQUdNLENBQUM7MEJBQ3dCLFVBQVU7K0JBRzVCLElBQUksWUFBWSxFQUFFOytCQUl6QixFQUFFOzZCQUNKLEVBQUU7Z0NBQ1gsS0FBSzs2QkFDUixFQUFFO0tBQ0Y7Ozs7SUFFaEIsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDM0M7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FD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K0NUO3lCQUVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTZCQzthQUVKOzs7OztnQ0FFRSxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUs7b0JBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSzt1QkFDTCxLQUFLOzhCQUVMLEtBQUs7dUJBQ0wsS0FBSzt5QkFHTCxLQUFLO3lCQUNMLEtBQUs7OEJBRUwsTUFBTTt5QkFHTixTQUFTLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgRG9DaGVja1xufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm1hdC1zZWxlY3QtYXV0b2NvbXBsZXRlXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG1hdC1mb3JtLWZpZWxkIGFwcGVhcmFuY2U9XCJ7eyBhcHBlYXJhbmNlIH19XCI+XG4gICAgICA8bWF0LXNlbGVjdFxuICAgICAgICAjc2VsZWN0RWxlbVxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cInNlbGVjdGVkVmFsdWVcIlxuICAgICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cIm9uU2VsZWN0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LXNlYXJjaFwiPlxuICAgICAgICAgIDxtYXQtY2hlY2tib3hcbiAgICAgICAgICAgICpuZ0lmPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYm94LXNlbGVjdC1hbGxcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJzZWxlY3RBbGxDaGVja2VkXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwidG9nZ2xlU2VsZWN0QWxsKCRldmVudClcIlxuICAgICAgICAgID48L21hdC1jaGVja2JveD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICNzZWFyY2hJbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncGwtMSc6ICFtdWx0aXBsZSB9XCJcbiAgICAgICAgICAgIChpbnB1dCk9XCJmaWx0ZXJJdGVtKHNlYXJjaElucHV0LnZhbHVlKVwiXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwic2VsZWN0UGxhY2Vob2xkZXJcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJib3gtc2VhcmNoLWljb25cIlxuICAgICAgICAgICAgKGNsaWNrKT1cImZpbHRlckl0ZW0oJycpOyBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cInNlYXJjaC1idXR0b25cIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LTI0XCIgYXJpYS1sYWJlbD1cIlNlYXJjaCBpY29uXCI+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bWF0LXNlbGVjdC10cmlnZ2VyPlxuICAgICAgICAgIHt7IG9uRGlzcGxheVN0cmluZygpIH19XG4gICAgICAgIDwvbWF0LXNlbGVjdC10cmlnZ2VyPlxuICAgICAgICA8bWF0LW9wdGlvblxuICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgdHJhY2tCeTogdHJhY2tCeUZuXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCJcbiAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uW3ZhbHVlXVwiXG4gICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiaGlkZU9wdGlvbihvcHRpb24pID8gJ25vbmUnIDogJ2ZsZXgnXCJcbiAgICAgICAgICA+e3sgb3B0aW9uW2Rpc3BsYXldIH19XG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgIDxtYXQtaGludCBzdHlsZT1cImNvbG9yOnJlZFwiICpuZ0lmPVwic2hvd0Vycm9yTXNnXCI+e3sgZXJyb3JNc2cgfX08L21hdC1oaW50PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5ib3gtc2VhcmNoIHtcbiAgICAgICAgbWFyZ2luOiA4cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjE2KSxcbiAgICAgICAgICAwIDAgMCAxcHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAyMDBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuICAgICAgLmJveC1zZWFyY2ggaW5wdXQge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICB9XG4gICAgICAuYm94LXNlbGVjdC1hbGwge1xuICAgICAgICB3aWR0aDogMzZweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMzcHg7XG4gICAgICAgIGNvbG9yOiAjODA4MDgwO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICB9XG4gICAgICAuc2VhcmNoLWJ1dHRvbiB7XG4gICAgICAgIHdpZHRoOiAzNnB4O1xuICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzM3B4O1xuICAgICAgICBjb2xvcjogIzgwODA4MDtcbiAgICAgIH1cbiAgICAgIC5wbC0xIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIERvQ2hlY2sge1xuICBASW5wdXQoKSBzZWxlY3RQbGFjZWhvbGRlcjogc3RyaW5nID0gXCJzZWFyY2guLi5cIjtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgb3B0aW9ucztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzcGxheSA9IFwiZGlzcGxheVwiO1xuICBASW5wdXQoKSB2YWx1ZSA9IFwidmFsdWVcIjtcbiAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIEBJbnB1dCgpIGVycm9yTXNnOiBzdHJpbmcgPSBcIkZpZWxkIGlzIHJlcXVpcmVkXCI7XG4gIEBJbnB1dCgpIHNob3dFcnJvck1zZyA9IGZhbHNlO1xuICBASW5wdXQoKSBvdGhlck1zZyA9ICdvdGhlcic7XG5cbiAgQElucHV0KCkgc2VsZWN0ZWRPcHRpb25zO1xuICBASW5wdXQoKSBtdWx0aXBsZSA9IHRydWU7XG5cbiAgLy8gTmV3IE9wdGlvbnNcbiAgQElucHV0KCkgbGFiZWxDb3VudDogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgYXBwZWFyYW5jZTogXCJzdGFuZGFyZFwiIHwgXCJmaWxsXCIgfCBcIm91dGxpbmVcIiA9IFwic3RhbmRhcmRcIjtcblxuICBAT3V0cHV0KClcbiAgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKFwic2VsZWN0RWxlbVwiKSBzZWxlY3RFbGVtO1xuXG4gIGZpbHRlcmVkT3B0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuICBzZWxlY3RlZFZhbHVlOiBBcnJheTxhbnk+ID0gW107XG4gIHNlbGVjdEFsbENoZWNrZWQgPSBmYWxzZTtcbiAgZGlzcGxheVN0cmluZyA9IFwiXCI7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5mb3JtQ29udHJvbC5kaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZW5hYmxlKCk7XG4gICAgfVxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9ucykge1xuICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZE9wdGlvbnM7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZvcm1Db250cm9sLnZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bigpIHtcbiAgICB0aGlzLnNlbGVjdEVsZW0udG9nZ2xlKCk7XG4gIH1cblxuICB0b2dnbGVTZWxlY3RBbGwodmFsKSB7XG4gICAgaWYgKHZhbC5jaGVja2VkKSB7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlLmluY2x1ZGVzKG9wdGlvblt0aGlzLnZhbHVlXSkpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUuY29uY2F0KFtvcHRpb25bdGhpcy52YWx1ZV1dKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkVmFsdWVzID0gdGhpcy5nZXRGaWx0ZXJlZE9wdGlvbnNWYWx1ZXMoKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gIWZpbHRlcmVkVmFsdWVzLmluY2x1ZGVzKGl0ZW0pXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XG4gIH1cblxuICBmaWx0ZXJJdGVtKHZhbHVlKSB7XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxuICAgICAgaXRlbSA9PiBpdGVtW3RoaXMuZGlzcGxheV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTFcbiAgICApO1xuICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2tlZCA9IHRydWU7XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlLmluY2x1ZGVzKGl0ZW1bdGhpcy52YWx1ZV0pKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbENoZWNrZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoaWRlT3B0aW9uKG9wdGlvbikge1xuICAgIHJldHVybiAhKHRoaXMuZmlsdGVyZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uKSA+IC0xKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgcGxhaW4gc3RyaW5ncyBhcnJheSBvZiBmaWx0ZXJlZCB2YWx1ZXNcbiAgZ2V0RmlsdGVyZWRPcHRpb25zVmFsdWVzKCkge1xuICAgIGNvbnN0IGZpbHRlcmVkVmFsdWVzID0gW107XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgZmlsdGVyZWRWYWx1ZXMucHVzaChvcHRpb24udmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJlZFZhbHVlcztcbiAgfVxuXG4gIG9uRGlzcGxheVN0cmluZygpIHtcbiAgICB0aGlzLmRpc3BsYXlTdHJpbmcgPSBcIlwiO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVmFsdWUgJiYgdGhpcy5zZWxlY3RlZFZhbHVlLmxlbmd0aCkge1xuICAgICAgbGV0IGRpc3BsYXlPcHRpb24gPSBbXTtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIC8vIE11bHRpIHNlbGVjdCBkaXNwbGF5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYWJlbENvdW50OyBpKyspIHtcbiAgICAgICAgICBkaXNwbGF5T3B0aW9uW2ldID0gdGhpcy5vcHRpb25zLmZpbHRlcihcbiAgICAgICAgICAgIG9wdGlvbiA9PiBvcHRpb25bdGhpcy52YWx1ZV0gPT09IHRoaXMuc2VsZWN0ZWRWYWx1ZVtpXVxuICAgICAgICAgIClbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3BsYXlPcHRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXNwbGF5T3B0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGlzcGxheU9wdGlvbltpXSAmJiBkaXNwbGF5T3B0aW9uW2ldW3RoaXMuZGlzcGxheV0pIHtcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RyaW5nICs9IGRpc3BsYXlPcHRpb25baV1bdGhpcy5kaXNwbGF5XSArIFwiLFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmRpc3BsYXlTdHJpbmcgPSB0aGlzLmRpc3BsYXlTdHJpbmcuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZS5sZW5ndGggPiAxICYmXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUubGVuZ3RoID4gdGhpcy5sYWJlbENvdW50XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlTdHJpbmcgKz0gYCAoKyR7dGhpcy5zZWxlY3RlZFZhbHVlLmxlbmd0aCAtXG4gICAgICAgICAgICAgIHRoaXMubGFiZWxDb3VudH0gJHt0aGlzLm90aGVyTXNnfSlgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2luZ2xlIHNlbGVjdCBkaXNwbGF5XG4gICAgICAgIGRpc3BsYXlPcHRpb24gPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxuICAgICAgICAgIG9wdGlvbiA9PiBvcHRpb25bdGhpcy52YWx1ZV0gPT09IHRoaXMuc2VsZWN0ZWRWYWx1ZVxuICAgICAgICApO1xuICAgICAgICBpZiAoZGlzcGxheU9wdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlTdHJpbmcgPSBkaXNwbGF5T3B0aW9uWzBdW3RoaXMuZGlzcGxheV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheVN0cmluZztcbiAgfVxuXG4gIG9uU2VsZWN0aW9uQ2hhbmdlKHZhbCkge1xuICAgIGNvbnN0IGZpbHRlcmVkVmFsdWVzID0gdGhpcy5nZXRGaWx0ZXJlZE9wdGlvbnNWYWx1ZXMoKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVmFsdWUuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoZmlsdGVyZWRWYWx1ZXMuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2tlZCA9IGNvdW50ID09PSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHZhbC52YWx1ZTtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgdHJhY2tCeUZuKGluZGV4LCBpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gIH1cbn1cbiJdfQ==