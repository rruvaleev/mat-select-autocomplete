/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
var SelectAutocompleteComponent = /** @class */ (function () {
    function SelectAutocompleteComponent() {
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
    SelectAutocompleteComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (!this.selectedValue.length) {
            this.selectionChange.emit(this.selectedValue);
        }
    };
    /**
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.toggleDropdown = /**
     * @return {?}
     */
    function () {
        this.selectElem.toggle();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.toggleSelectAll = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        var _this = this;
        if (val.checked) {
            this.filteredOptions.forEach(function (option) {
                if (!_this.selectedValue.includes(option[_this.value])) {
                    _this.selectedValue = _this.selectedValue.concat([option[_this.value]]);
                }
            });
        }
        else {
            /** @type {?} */
            var filteredValues_1 = this.getFilteredOptionsValues();
            this.selectedValue = this.selectedValue.filter(function (item) { return !filteredValues_1.includes(item); });
        }
        this.selectionChange.emit(this.selectedValue);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.filterItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.filteredOptions = this.options.filter(function (item) { return item[_this.display].toLowerCase().indexOf(value.toLowerCase()) > -1; });
        this.selectAllChecked = true;
        this.filteredOptions.forEach(function (item) {
            if (!_this.selectedValue.includes(item[_this.value])) {
                _this.selectAllChecked = false;
            }
        });
        if (!this.filteredOptions.length) {
            this.selectAllChecked = false;
        }
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.hideOption = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return !(this.filteredOptions.indexOf(option) > -1);
    };
    // Returns plain strings array of filtered values
    /**
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.getFilteredOptionsValues = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var filteredValues = [];
        this.filteredOptions.forEach(function (option) {
            filteredValues.push(option.value);
        });
        return filteredValues;
    };
    /**
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.onDisplayString = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.displayString = "";
        if (this.selectedValue && this.selectedValue.length) {
            /** @type {?} */
            var displayOption = [];
            if (this.multiple) {
                var _loop_1 = function (i) {
                    displayOption[i] = this_1.options.filter(function (option) { return option[_this.value] === _this.selectedValue[i]; })[0];
                };
                var this_1 = this;
                // Multi select display
                for (var i = 0; i < this.labelCount; i++) {
                    _loop_1(i);
                }
                if (displayOption.length) {
                    for (var i = 0; i < displayOption.length; i++) {
                        if (displayOption[i] && displayOption[i][this.display]) {
                            this.displayString += displayOption[i][this.display] + ",";
                        }
                    }
                    this.displayString = this.displayString.slice(0, -1);
                    if (this.selectedValue.length > 1 &&
                        this.selectedValue.length > this.labelCount) {
                        this.displayString += " (+" + (this.selectedValue.length -
                            this.labelCount) + " " + this.otherMsg + ")";
                    }
                }
            }
            else {
                // Single select display
                displayOption = this.options.filter(function (option) { return option[_this.value] === _this.selectedValue; });
                if (displayOption.length) {
                    this.displayString = displayOption[0][this.display];
                }
            }
        }
        return this.displayString;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.onSelectionChange = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var filteredValues = this.getFilteredOptionsValues();
        /** @type {?} */
        var count = 0;
        if (this.multiple) {
            this.selectedValue.filter(function (item) {
                if (filteredValues.includes(item)) {
                    count++;
                }
            });
            this.selectAllChecked = count === this.filteredOptions.length;
        }
        this.selectedValue = val.value;
        this.selectionChange.emit(this.selectedValue);
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    SelectAutocompleteComponent.prototype.trackByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.value;
    };
    SelectAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: "mat-select-autocomplete",
                    template: "\n    <mat-form-field appearance=\"{{ appearance }}\">\n      <mat-select\n        #selectElem\n        [placeholder]=\"placeholder\"\n        [formControl]=\"formControl\"\n        [multiple]=\"multiple\"\n        [(ngModel)]=\"selectedValue\"\n        (selectionChange)=\"onSelectionChange($event)\"\n      >\n        <div class=\"box-search\">\n          <mat-checkbox\n            *ngIf=\"multiple\"\n            color=\"primary\"\n            class=\"box-select-all\"\n            [(ngModel)]=\"selectAllChecked\"\n            (change)=\"toggleSelectAll($event)\"\n          ></mat-checkbox>\n          <input\n            #searchInput\n            type=\"text\"\n            [ngClass]=\"{ 'pl-1': !multiple }\"\n            (input)=\"filterItem(searchInput.value)\"\n            [placeholder]=\"selectPlaceholder\"\n          />\n          <div\n            class=\"box-search-icon\"\n            (click)=\"filterItem(''); searchInput.value = ''\"\n          >\n            <button mat-icon-button class=\"search-button\">\n              <mat-icon class=\"mat-24\" aria-label=\"Search icon\">clear</mat-icon>\n            </button>\n          </div>\n        </div>\n        <mat-select-trigger>\n          {{ onDisplayString() }}\n        </mat-select-trigger>\n        <mat-option\n          *ngFor=\"let option of options; trackBy: trackByFn\"\n          [disabled]=\"option.disabled\"\n          [value]=\"option[value]\"\n          [style.display]=\"hideOption(option) ? 'none' : 'flex'\"\n          >{{ option[display] }}\n        </mat-option>\n      </mat-select>\n      <mat-hint style=\"color:red\" *ngIf=\"showErrorMsg\">{{ errorMsg }}</mat-hint>\n    </mat-form-field>\n  ",
                    styles: ["\n      .box-search {\n        margin: 8px;\n        border-radius: 2px;\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16),\n          0 0 0 1px rgba(0, 0, 0, 0.08);\n        transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        display: flex;\n      }\n      .box-search input {\n        flex: 1;\n        border: none;\n        outline: none;\n      }\n      .box-select-all {\n        width: 36px;\n        line-height: 33px;\n        color: #808080;\n        text-align: center;\n      }\n      .search-button {\n        width: 36px;\n        height: 36px;\n        line-height: 33px;\n        color: #808080;\n      }\n      .pl-1 {\n        padding-left: 1rem;\n      }\n    "]
                }] }
    ];
    /** @nocollapse */
    SelectAutocompleteComponent.ctorParameters = function () { return []; };
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
    return SelectAutocompleteComponent;
}());
export { SelectAutocompleteComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXQtc2VsZWN0LWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3QtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQWlIM0M7aUNBM0JxQyxXQUFXO3dCQUc1QixLQUFLO3VCQUNOLFNBQVM7cUJBQ1gsT0FBTzsyQkFDWSxJQUFJLFdBQVcsRUFBRTt3QkFDekIsbUJBQW1COzRCQUN2QixLQUFLO3dCQUNULE9BQU87d0JBR1AsSUFBSTs7MEJBR00sQ0FBQzswQkFDd0IsVUFBVTsrQkFHNUIsSUFBSSxZQUFZLEVBQUU7K0JBSXpCLEVBQUU7NkJBQ0osRUFBRTtnQ0FDWCxLQUFLOzZCQUNSLEVBQUU7S0FDRjs7OztJQUVoQixpREFBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQzNDO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQzdDO0tBQ0Y7Ozs7SUFFRCwrQ0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQy9DO0tBQ0Y7Ozs7SUFFRCxvREFBYzs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQzFCOzs7OztJQUVELHFEQUFlOzs7O0lBQWYsVUFBZ0IsR0FBRztRQUFuQixpQkFjQztRQWJDLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtnQkFDakMsSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDcEQsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0RTthQUNGLENBQUMsQ0FBQztTQUNKO2FBQU07O1lBQ0wsSUFBTSxnQkFBYyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQzVDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxnQkFBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBOUIsQ0FBOEIsQ0FDdkMsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQy9DOzs7OztJQUVELGdEQUFVOzs7O0lBQVYsVUFBVyxLQUFLO1FBQWhCLGlCQWFDO1FBWkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDeEMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBbEUsQ0FBa0UsQ0FDM0UsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQy9CLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7YUFDL0I7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUMvQjtLQUNGOzs7OztJQUVELGdEQUFVOzs7O0lBQVYsVUFBVyxNQUFNO1FBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyRDtJQUVELGlEQUFpRDs7OztJQUNqRCw4REFBd0I7OztJQUF4Qjs7UUFDRSxJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO1lBQ2pDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DLENBQUMsQ0FBQztRQUNILE9BQU8sY0FBYyxDQUFDO0tBQ3ZCOzs7O0lBRUQscURBQWU7OztJQUFmO1FBQUEsaUJBcUNDO1FBcENDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTs7WUFDbkQsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FFUixDQUFDO29CQUNSLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFLLE9BQU8sQ0FBQyxNQUFNLENBQ3BDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUE1QyxDQUE0QyxDQUN2RCxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O2dCQUhQLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTs0QkFBL0IsQ0FBQztpQkFJVDtnQkFDRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7b0JBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUM3QyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUN0RCxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO3lCQUM1RDtxQkFDRjtvQkFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxJQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7d0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQzNDO3dCQUNBLElBQUksQ0FBQyxhQUFhLElBQUksU0FBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07NEJBQ25ELElBQUksQ0FBQyxVQUFVLFVBQUksSUFBSSxDQUFDLFFBQVEsTUFBRyxDQUFDO3FCQUN2QztpQkFDRjthQUNGO2lCQUFNOztnQkFFTCxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ2pDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFJLENBQUMsYUFBYSxFQUF6QyxDQUF5QyxDQUNwRCxDQUFDO2dCQUNGLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtvQkFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNyRDthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDM0I7Ozs7O0lBRUQsdURBQWlCOzs7O0lBQWpCLFVBQWtCLEdBQUc7O1FBQ25CLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDOztRQUN2RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJO2dCQUM1QixJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2pDLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztTQUMvRDtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDL0M7Ozs7OztJQUVNLCtDQUFTOzs7OztjQUFDLEtBQUssRUFBRSxJQUFJO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzs7O2dCQTVPckIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRSw0cERBK0NUOzZCQUVDLDRyQkE2QkM7aUJBRUo7Ozs7O29DQUVFLEtBQUs7OEJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLOzJCQUNMLEtBQUs7a0NBRUwsS0FBSzsyQkFDTCxLQUFLOzZCQUdMLEtBQUs7NkJBQ0wsS0FBSztrQ0FFTCxNQUFNOzZCQUdOLFNBQVMsU0FBQyxZQUFZOztzQ0FwSHpCOztTQThGYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIERvQ2hlY2tcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJtYXQtc2VsZWN0LWF1dG9jb21wbGV0ZVwiLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxtYXQtZm9ybS1maWVsZCBhcHBlYXJhbmNlPVwie3sgYXBwZWFyYW5jZSB9fVwiPlxuICAgICAgPG1hdC1zZWxlY3RcbiAgICAgICAgI3NlbGVjdEVsZW1cbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgW211bHRpcGxlXT1cIm11bHRpcGxlXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgKHNlbGVjdGlvbkNoYW5nZSk9XCJvblNlbGVjdGlvbkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1zZWFyY2hcIj5cbiAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAqbmdJZj1cIm11bHRpcGxlXCJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBjbGFzcz1cImJveC1zZWxlY3QtYWxsXCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwic2VsZWN0QWxsQ2hlY2tlZFwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cInRvZ2dsZVNlbGVjdEFsbCgkZXZlbnQpXCJcbiAgICAgICAgICA+PC9tYXQtY2hlY2tib3g+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAjc2VhcmNoSW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3BsLTEnOiAhbXVsdGlwbGUgfVwiXG4gICAgICAgICAgICAoaW5wdXQpPVwiZmlsdGVySXRlbShzZWFyY2hJbnB1dC52YWx1ZSlcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInNlbGVjdFBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiYm94LXNlYXJjaC1pY29uXCJcbiAgICAgICAgICAgIChjbGljayk9XCJmaWx0ZXJJdGVtKCcnKTsgc2VhcmNoSW5wdXQudmFsdWUgPSAnJ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJzZWFyY2gtYnV0dG9uXCI+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC0yNFwiIGFyaWEtbGFiZWw9XCJTZWFyY2ggaWNvblwiPmNsZWFyPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG1hdC1zZWxlY3QtdHJpZ2dlcj5cbiAgICAgICAgICB7eyBvbkRpc3BsYXlTdHJpbmcoKSB9fVxuICAgICAgICA8L21hdC1zZWxlY3QtdHJpZ2dlcj5cbiAgICAgICAgPG1hdC1vcHRpb25cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnM7IHRyYWNrQnk6IHRyYWNrQnlGblwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cIm9wdGlvbi5kaXNhYmxlZFwiXG4gICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvblt2YWx1ZV1cIlxuICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImhpZGVPcHRpb24ob3B0aW9uKSA/ICdub25lJyA6ICdmbGV4J1wiXG4gICAgICAgICAgPnt7IG9wdGlvbltkaXNwbGF5XSB9fVxuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8bWF0LWhpbnQgc3R5bGU9XCJjb2xvcjpyZWRcIiAqbmdJZj1cInNob3dFcnJvck1zZ1wiPnt7IGVycm9yTXNnIH19PC9tYXQtaGludD5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuYm94LXNlYXJjaCB7XG4gICAgICAgIG1hcmdpbjogOHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4xNiksXG4gICAgICAgICAgMCAwIDAgMXB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMjAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIH1cbiAgICAgIC5ib3gtc2VhcmNoIGlucHV0IHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgfVxuICAgICAgLmJveC1zZWxlY3QtYWxsIHtcbiAgICAgICAgd2lkdGg6IDM2cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzM3B4O1xuICAgICAgICBjb2xvcjogIzgwODA4MDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgfVxuICAgICAgLnNlYXJjaC1idXR0b24ge1xuICAgICAgICB3aWR0aDogMzZweDtcbiAgICAgICAgaGVpZ2h0OiAzNnB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMzNweDtcbiAgICAgICAgY29sb3I6ICM4MDgwODA7XG4gICAgICB9XG4gICAgICAucGwtMSB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMXJlbTtcbiAgICAgIH1cbiAgICBgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0QXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBEb0NoZWNrIHtcbiAgQElucHV0KCkgc2VsZWN0UGxhY2Vob2xkZXI6IHN0cmluZyA9IFwic2VhcmNoLi4uXCI7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wdGlvbnM7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc3BsYXkgPSBcImRpc3BsYXlcIjtcbiAgQElucHV0KCkgdmFsdWUgPSBcInZhbHVlXCI7XG4gIEBJbnB1dCgpIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBASW5wdXQoKSBlcnJvck1zZzogc3RyaW5nID0gXCJGaWVsZCBpcyByZXF1aXJlZFwiO1xuICBASW5wdXQoKSBzaG93RXJyb3JNc2cgPSBmYWxzZTtcbiAgQElucHV0KCkgb3RoZXJNc2cgPSAnb3RoZXInO1xuXG4gIEBJbnB1dCgpIHNlbGVjdGVkT3B0aW9ucztcbiAgQElucHV0KCkgbXVsdGlwbGUgPSB0cnVlO1xuXG4gIC8vIE5ldyBPcHRpb25zXG4gIEBJbnB1dCgpIGxhYmVsQ291bnQ6IG51bWJlciA9IDE7XG4gIEBJbnB1dCgpIGFwcGVhcmFuY2U6IFwic3RhbmRhcmRcIiB8IFwiZmlsbFwiIHwgXCJvdXRsaW5lXCIgPSBcInN0YW5kYXJkXCI7XG5cbiAgQE91dHB1dCgpXG4gIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZChcInNlbGVjdEVsZW1cIikgc2VsZWN0RWxlbTtcblxuICBmaWx0ZXJlZE9wdGlvbnM6IEFycmF5PGFueT4gPSBbXTtcbiAgc2VsZWN0ZWRWYWx1ZTogQXJyYXk8YW55PiA9IFtdO1xuICBzZWxlY3RBbGxDaGVja2VkID0gZmFsc2U7XG4gIGRpc3BsYXlTdHJpbmcgPSBcIlwiO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcm1Db250cm9sLmVuYWJsZSgpO1xuICAgIH1cbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBpZiAodGhpcy5zZWxlY3RlZE9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRPcHRpb25zO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mb3JtQ29udHJvbC52YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWUubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRHJvcGRvd24oKSB7XG4gICAgdGhpcy5zZWxlY3RFbGVtLnRvZ2dsZSgpO1xuICB9XG5cbiAgdG9nZ2xlU2VsZWN0QWxsKHZhbCkge1xuICAgIGlmICh2YWwuY2hlY2tlZCkge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZS5pbmNsdWRlcyhvcHRpb25bdGhpcy52YWx1ZV0pKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlLmNvbmNhdChbb3B0aW9uW3RoaXMudmFsdWVdXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWx0ZXJlZFZhbHVlcyA9IHRoaXMuZ2V0RmlsdGVyZWRPcHRpb25zVmFsdWVzKCk7XG4gICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUuZmlsdGVyKFxuICAgICAgICBpdGVtID0+ICFmaWx0ZXJlZFZhbHVlcy5pbmNsdWRlcyhpdGVtKVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICB9XG5cbiAgZmlsdGVySXRlbSh2YWx1ZSkge1xuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLmZpbHRlcihcbiAgICAgIGl0ZW0gPT4gaXRlbVt0aGlzLmRpc3BsYXldLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih2YWx1ZS50b0xvd2VyQ2FzZSgpKSA+IC0xXG4gICAgKTtcbiAgICB0aGlzLnNlbGVjdEFsbENoZWNrZWQgPSB0cnVlO1xuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZS5pbmNsdWRlcyhpdGVtW3RoaXMudmFsdWVdKSkge1xuICAgICAgICB0aGlzLnNlbGVjdEFsbENoZWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIXRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5zZWxlY3RBbGxDaGVja2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaGlkZU9wdGlvbihvcHRpb24pIHtcbiAgICByZXR1cm4gISh0aGlzLmZpbHRlcmVkT3B0aW9ucy5pbmRleE9mKG9wdGlvbikgPiAtMSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIHBsYWluIHN0cmluZ3MgYXJyYXkgb2YgZmlsdGVyZWQgdmFsdWVzXG4gIGdldEZpbHRlcmVkT3B0aW9uc1ZhbHVlcygpIHtcbiAgICBjb25zdCBmaWx0ZXJlZFZhbHVlcyA9IFtdO1xuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGZpbHRlcmVkVmFsdWVzLnB1c2gob3B0aW9uLnZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyZWRWYWx1ZXM7XG4gIH1cblxuICBvbkRpc3BsYXlTdHJpbmcoKSB7XG4gICAgdGhpcy5kaXNwbGF5U3RyaW5nID0gXCJcIjtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFZhbHVlICYmIHRoaXMuc2VsZWN0ZWRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgIGxldCBkaXNwbGF5T3B0aW9uID0gW107XG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAvLyBNdWx0aSBzZWxlY3QgZGlzcGxheVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGFiZWxDb3VudDsgaSsrKSB7XG4gICAgICAgICAgZGlzcGxheU9wdGlvbltpXSA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXG4gICAgICAgICAgICBvcHRpb24gPT4gb3B0aW9uW3RoaXMudmFsdWVdID09PSB0aGlzLnNlbGVjdGVkVmFsdWVbaV1cbiAgICAgICAgICApWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXNwbGF5T3B0aW9uLmxlbmd0aCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzcGxheU9wdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRpc3BsYXlPcHRpb25baV0gJiYgZGlzcGxheU9wdGlvbltpXVt0aGlzLmRpc3BsYXldKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheVN0cmluZyArPSBkaXNwbGF5T3B0aW9uW2ldW3RoaXMuZGlzcGxheV0gKyBcIixcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5kaXNwbGF5U3RyaW5nID0gdGhpcy5kaXNwbGF5U3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUubGVuZ3RoID4gMSAmJlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlLmxlbmd0aCA+IHRoaXMubGFiZWxDb3VudFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RyaW5nICs9IGAgKCske3RoaXMuc2VsZWN0ZWRWYWx1ZS5sZW5ndGggLVxuICAgICAgICAgICAgICB0aGlzLmxhYmVsQ291bnR9ICR7dGhpcy5vdGhlck1zZ30pYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNpbmdsZSBzZWxlY3QgZGlzcGxheVxuICAgICAgICBkaXNwbGF5T3B0aW9uID0gdGhpcy5vcHRpb25zLmZpbHRlcihcbiAgICAgICAgICBvcHRpb24gPT4gb3B0aW9uW3RoaXMudmFsdWVdID09PSB0aGlzLnNlbGVjdGVkVmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGRpc3BsYXlPcHRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5U3RyaW5nID0gZGlzcGxheU9wdGlvblswXVt0aGlzLmRpc3BsYXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRpc3BsYXlTdHJpbmc7XG4gIH1cblxuICBvblNlbGVjdGlvbkNoYW5nZSh2YWwpIHtcbiAgICBjb25zdCBmaWx0ZXJlZFZhbHVlcyA9IHRoaXMuZ2V0RmlsdGVyZWRPcHRpb25zVmFsdWVzKCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgaWYgKGZpbHRlcmVkVmFsdWVzLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbGVjdEFsbENoZWNrZWQgPSBjb3VudCA9PT0gdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB2YWwudmFsdWU7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICB9XG5cbiAgcHVibGljIHRyYWNrQnlGbihpbmRleCwgaXRlbSkge1xuICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICB9XG59XG4iXX0=