import { Component, OnInit } from '@angular/core';
import { ViewPayrollDataService } from './viewPayrollData.service';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
    moduleId: module.id,
    selector: 'viewPayrollData',
    templateUrl: 'viewPayrollData.html'
})

export class ViewPayrollDataComponent implements OnInit {
    selectedTaxYear: string[];
    selectedSourceName: string[];
    selectedControlGroup: string[];
    selectedProdCoName: string[];
    selectedProdShowName: string[];
    errorMessage: string;

    public payrollReportCount: any;

    //Years: Array<string>;
    //Months: Array<string>;
    //ControlGroups: Array<string>;
    workerDetails: Array<any> = [];

    dataLoaded: boolean;
    public rows: Array<any> = [];
    public page: number = 1;
    public itemsPerPage: number = 50;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    optionsModel: number[];
    myOptionsTaxYear: IMultiSelectOption[];
    myOptionsSourceName: IMultiSelectOption[];
    myOptionsCG : IMultiSelectOption[];
    myOptionsPCN : IMultiSelectOption[];
    myOptionsPSN : IMultiSelectOption[];
    
    mySettings: IMultiSelectSettings = {
        enableSearch: false,
        showCheckAll: true,
        showUncheckAll: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default btn-block',
        dynamicTitleMaxItems: 1,
        displayAllSelectedText: false
    };

    // Text configuration
    myTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all'
    };

    public columns: Array<any> = [
        { title: 'Control Group', className: 'va-m', name: 'ssn' },
        { title: 'Latest Production Company', className: 'va-m', name: 'firstName' },
        { title: 'Most Recent Show', className: 'va-m', name: 'lastName' },
        { title: 'SSN Number', className: 'hidden-xs va-m', name: 'address' },
        { title: 'First Name', className: 'hidden-xs va-m', name: 'city' },
        { title: 'Last Name', className: 'va-m', name: 'state' },
        { title: 'Last Worked Date', className: 'va-m', name: 'birthDate' },
        { title: 'Hire Date', className: 'va-m', name: 'firstWorkedDate' },
        { title: 'Union Type', className: 'va-m', name: 'lastWorkedDate' },
        { title: 'Payroll Source', className: 'va-m', name: 'terminationDate' },
        { title: 'Average Hours', className: 'va-m', name: 'periodEndingDate' },
        { title: 'Total Hour', className: 'va-m', name: 'hoursWorked' },
        { title: 'Total Hous', className: 'va-m', name: 'union' },
        { title: 'Total Hors', className: 'va-m', name: 'employmentStatus' },
        { title: 'Total Hurs', className: 'va-m', name: 'controlGroup' },
    ];
    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table', 'table-striped', 'table-bordered', 'table-hover']
    };

    constructor(private _viewPayrollDataService: ViewPayrollDataService) { }

    ngOnInit(): void {
       // this.myOptions = [{ id: '-1', name: 'All' }];
       this.myOptionsTaxYear=[];
       this.myOptionsSourceName=[];
       this.myOptionsCG =[];
       this.myOptionsPCN =[];
       this.myOptionsPSN =[];
        
        this._viewPayrollDataService.getReportData().subscribe(data => {

            data.TaxYear.forEach(element =>{
            this.myOptionsTaxYear.push({ id: element, name: element })
            });
            data.SourceName.forEach(element =>{
            this.myOptionsSourceName.push({ id: element, name: element })
            });
            data.ControlGroup.forEach(element => {
                this.myOptionsCG.push({ id: element, name: element })
            });
            data.ProdCoName.forEach(element => {
                this.myOptionsPCN.push({ id: element, name: element })
            });
            data.ProdShowName.forEach(element => {
                this.myOptionsPSN.push({ id: element, name: element })
            });
            
        },
        error => this.errorMessage = <any>error);
        
        this.payrollReportCount='0';
        this.onChangeTable(this.config);
        this.dataLoaded = false;

    }



    payrollReportData(): void {
        let filterCriteria = this.getFilterValues();
        //filterCriteria.acaEligibleCount = this.payrollReportCount;
        this._viewPayrollDataService.getPayRollReportData(filterCriteria).subscribe(workdetails => {
            this.workerDetails = workdetails;
            console.log(workdetails);
            this.onChangeTable(this.config);
            this.dataLoaded = true;
        },
            error => this.errorMessage = <any>error);

    }

    reset(): void {
        this.selectedTaxYear =[];
        this.selectedSourceName=[];
        this.selectedControlGroup=[];
        this.selectedProdCoName = [];
        this.selectedProdShowName = [];
        this.dataLoaded = false;
    }

    getFilterValues(): any {
        /*
        this.selectedTaxYear =[];
        this.selectedSourceName=[];
        this.selectedControlGroup=[];
        this.selectedProdCoName = [];
        this.selectedProdShowName = [];
        */
/*        
        let year = this.selectedYear;
        if (year === '-1') {
            year = '\'\'';
        }
*/

        let tyear = this.selectedTaxYear;
        if ( tyear === undefined) {
                tyear = [];
                tyear[0] = '\'\'';
                this.selectedTaxYear =[];
            }
        if (tyear !== undefined && tyear.length <= 0) {
                tyear[0] = '\'\'';
                this.selectedTaxYear =[];
            }


        let sName = this.selectedSourceName;
        if ( sName === undefined) {
                sName = [];
                sName[0] = '\'\'';
                this.selectedSourceName=[];
            }
        if (sName !== undefined && sName.length <= 0) {
                sName[0] = '\'\'';
                this.selectedSourceName=[];
            }


        let cg = this.selectedControlGroup;
        if ( cg === undefined) {
                cg = [];
                cg[0] = '\'\'';
                this.selectedControlGroup=[];
            }
        if (cg !== undefined && cg.length <= 0) {
                cg[0] = '\'\'';
                this.selectedControlGroup=[];
            }


        let prodCName = this.selectedProdCoName;
        if ( prodCName === undefined) {
                prodCName = [];
                prodCName[0] = '\'\'';
                this.selectedProdCoName = [];
            }
        if (prodCName !== undefined && prodCName.length <= 0) {
                prodCName[0] = '\'\'';
                this.selectedProdCoName = [];
            }


        let prodSName = this.selectedProdShowName;
        if ( prodSName === undefined) {
                prodSName = [];
                prodSName[0] = '\'\'';
                this.selectedProdShowName = [];
            }
        if (prodSName !== undefined && prodSName.length <= 0) {
                prodSName[0] = '\'\'';
                this.selectedProdShowName = [];
            }

        const filterCriteria: any = {
            selectedTaxYear: tyear.join(':'), selectedSourceName: sName.join(':'),
            selectedControlGroup: cg.join(':'),selectedProdCoName:prodCName.join(':'),
            selectedProdShowName:prodSName.join(':')
        };


        return filterCriteria;
    }

    Search(): void {
        this.dataLoaded = false;
        let filterCriteria = this.getFilterValues();
        this._viewPayrollDataService.getPayrollReportDataCount(filterCriteria)
            .subscribe(counts => {
                if (counts === undefined || counts == null) {
                    return;
                }
                counts.forEach((element: any) => {
                    this.payrollReportCount = element.dataAcaPayrollCount;
                });
                
            },
            (error: any) => this.errorMessage = <any>error);


    }


    downloadPdf(): void {

    }

    downloadExcel(): void {
        let filterCriteria = this.getFilterValues();
        this._viewPayrollDataService.downloadExcelReport(filterCriteria);
/*
        
        this._viewPayrollDataService.getVideo().subscribe(data => this.downloadFile(data)),
                 (error: any) => console.log("Error downloading the file."),
                 () => console.info("OK");
                 */
    }
/*
    downloadFile(data: Response){
        var blob = new Blob([data], { type: 'mp4' });
        var url= window.URL.createObjectURL(blob);
        window.open(url);
    }
*/


    public onCellClick(data: any): any {
        console.log(data);
    }

    public changePage(page: any, data: Array<any> = this.workerDetails): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }


    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });

        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item: any) =>
                item[config.filtering.columnName].match(this.config.filtering.filterString));
        }

        let tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
                if (item[column.name].toString().match(this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
            
            tempArray.push(item);
        });
        filteredData = tempArray;

        return filteredData;
    }

    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }
    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.workerDetails, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }
}


/*
screen2.html

Report Should look like New Hire Full Time Report
 
Header: Payroll Data Report with Excel and PDF ICons
 
Search Filters:
TAX_YEAR,CONTROL_GROUP_NAME,SOURCE_NAME,PROD_CO_NAME,PROD_SHOW_NAME
All Search Filter should be multi select Check boxex
 
Filter and Reset Buttons
 
Reset shoiuld clear filters
 
Filter button click should get the count mathching the filters
 
Total Count : 93
 
On Click of Total Count button, Grid should dislay below header with sorting and paging
 
SSN,FirstName,lastName, address,city, state, birthdate, firstworkdate, lastworkdate, terminatation date,
 Period ending date, Hours worked, is union, employment status
 
 
R & D :
 
Now Pagination is happening at Angular, but pagination suppose to happen at db level.
So try to pass pagecount and pagenumber to service call on click of pager.
Default Pagecount : 50 and PageNumber : 1

*/