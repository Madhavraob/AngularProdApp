
import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from '@angular/http';
import { payrollData } from './viewPayrollData';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../app.config';

@Injectable()
export class ViewPayrollDataService {
    private _payrollUrl = CONFIGURATION.baseServiceUrl + 'dataacapayrollservice/';
    constructor(private _http: Http) { }
/*
    getVideo(){

        let headers = new Headers ({'Access-Control-Allow-Origin':'*'});
        let options = new RequestOptions({headers: headers});

        return this._http.get("https://www.youtube.com/",options)
            .map((response: Response) => response)
            .do(data => console.log('All: '))
            .catch(this.handleError);

    }
*/
    getReportData(): Observable<any> {
        return this._http.get(this._payrollUrl + 'getdataacapayrollservicereferencedata')
            .map((response: Response) => response.json().dataAcaPayrollReferenceData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPayrollReportDataCount(filterCriteria: any): Observable<any> {
        let fileName: string = "getdataacapayrollservicecount?TaxYear=" + filterCriteria.selectedTaxYear
            + "&ControlGroup=" + filterCriteria.selectedControlGroup
            + "&SourceName=" + filterCriteria.selectedSourceName
            + "&ProdCoName=" + filterCriteria.selectedProdCoName
            + "&ProdShowName=" + filterCriteria.selectedProdShowName;
        return this._http.get(this._payrollUrl + fileName)
            .map((response: Response) => response.json().dataAcaPayrollServiceDataCount)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    } 

    getPayRollReportData(filterCriteria: any): Observable<payrollData[]> {

        let fileName = "getdataacapayrollservicereportdata?TaxYear=" + filterCriteria.selectedTaxYear
            + "&ControlGroup=" + filterCriteria.selectedControlGroup
            + "&SourceName=" + filterCriteria.selectedSourceName
            + "&ProdCoName=" + filterCriteria.selectedProdCoName
            + "&ProdShowName=" + filterCriteria.selectedProdShowName;

        return this._http.get(this._payrollUrl + fileName)
            .map((response: Response) => <payrollData[]>response.json().dataAcaPayrollServiceReportData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);

        
    }
    

      downloadExcelReport(filterCriteria: any): void {
        let fileName = "processNewHireFullTimeExcelUpload?TaxYear=" + filterCriteria.selectedTaxYear
            + "&ControlGroup=" + filterCriteria.selectedControlGroup
            + "&SourceName=" + filterCriteria.selectedSourceName
            + "&ProdCoName=" + filterCriteria.selectedProdCoName
            + "&ProdShowName=" + filterCriteria.selectedProdShowName;


        window.open(this._payrollUrl + fileName, '_bank');
    }
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Failed in web api(Server error) ');
    }


}
