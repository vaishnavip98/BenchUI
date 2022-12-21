import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bench } from '../models/bench.model';
@Injectable({
  providedIn: 'root'
})
export class AdminBenchService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  getAllBench(): Observable<Bench[]> {
    
    return this.http.get<Bench[]>(this.baseApiUrl + '/api/AdminBench');
  }

  addBench(addBenchRequest: any):Observable<any>{
    return this.http.post<any>(this.baseApiUrl+'/api/AdminBench', addBenchRequest);
  }

  editBench(addBenchRequest: any,id:string):Observable<any>{
    return this.http.put<any>(this.baseApiUrl+'/api/AdminBench/'+ id, addBenchRequest);
  }
  getBenchById(benchId:string):Observable<Bench>{

    return this.http.get<Bench>(this.baseApiUrl+'/api/AdminBench/'+ benchId);

  }
  deleteBenchById(benchId:string):Observable<any>{

    return this.http.delete<any>(this.baseApiUrl+'/api/AdminBench/'+ benchId);

  }
  getPartnerById(benchId:string):Observable<any>{

    return this.http.get<any>(this.baseApiUrl+'/api/Partner/'+ benchId);

  }

  getPartnerNameByPartnerId(partnerId:string){
    return this.http.get<any>(this.baseApiUrl+'/api/Partner/'+ partnerId);

  }

  getAllPartner(): Observable<any[]> {
    
    return this.http.get<any[]>(this.baseApiUrl + '/api/Partner');
  }

  updateBench(benchId:any, updateBenchRequest: Bench): Observable<Bench>{
    return this.http.put<Bench>(this.baseApiUrl + '/api/AdminBench/' + benchId, updateBenchRequest);
  }

  searchBench(value:string){
      return this.http.get<any>(this.baseApiUrl + '/api/Search/'+ value );
      
  }
  showSuccess(message:any, title:any){

    this.toastr.success(message, title)

}

 

showError(message:any, title:any){

    this.toastr.error(message, title)

}

 

showInfo(message:any, title:any){

    this.toastr.info(message, title)

}

 

showWarning(message:any, title:any){

    this.toastr.warning(message, title)

}
}
