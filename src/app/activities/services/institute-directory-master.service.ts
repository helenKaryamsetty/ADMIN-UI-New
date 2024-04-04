import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class InstituteDirectoryMasterService {
  getServiceLines_new_url: any;
  admin_Base_Url: any;

  get_InstituteDirectory_Url: any;
  save_InstituteDirectory_Url: any;
  save_Cdss_Mapping: any;
  edit_InstituteDirectory_Url: any;
  toggle_activate_InstituteDirectory_Url: any;
  getStates_new_url: any;
  get_Cdss_Url: any;

  constructor(
    public basepaths: ConfigService,
    private httpIntercept: HttpClient,
  ) {
    this.admin_Base_Url = this.basepaths.getAdminBaseUrl();

    this.get_InstituteDirectory_Url =
      this.admin_Base_Url + 'm/getInstituteDirectory';
    this.save_InstituteDirectory_Url =
      this.admin_Base_Url + 'm/createInstituteDirectory';
    this.save_Cdss_Mapping = this.admin_Base_Url + 'uptsu/submit/cdss';
    this.get_Cdss_Url = this.admin_Base_Url + 'uptsu/getCdssData';
    this.edit_InstituteDirectory_Url =
      this.admin_Base_Url + 'm/editInstituteDirectory';
    this.toggle_activate_InstituteDirectory_Url =
      this.admin_Base_Url + 'm/deleteInstituteDirectory';

    this.getServiceLines_new_url = this.admin_Base_Url + 'm/role/serviceNew';
    this.getStates_new_url = this.admin_Base_Url + 'm/role/stateNew';
  }
  getServiceLinesNew(userID: any) {
    return this.httpIntercept.post(this.getServiceLines_new_url, {
      userID: userID,
    });
  }
  handleError(error: any | any) {
    return throwError(error);
  }
  handleState_n_ServiceSuccess(response: any) {
    console.log(response.data, 'role service file success response');
    let result = [];
    result = response.data.filter(function (item: any) {
      if (
        item.serviceID === 3 ||
        item.serviceID === 1 ||
        item.serviceID === 6
      ) {
        return item;
      }
    });
    return result;
  }
  getStatesNew(obj: any) {
    return this.httpIntercept.post(this.getStates_new_url, obj);
  }
  getInstituteDirectory(providerServiceMapID: any) {
    console.log('psmID', providerServiceMapID);
    return this.httpIntercept.post(this.get_InstituteDirectory_Url, {
      providerServiceMapId: providerServiceMapID,
    });
  }
  toggle_activate_InstituteDirectory(data: any) {
    console.log(data, 'delete req obj');
    return this.httpIntercept.post(
      this.toggle_activate_InstituteDirectory_Url,
      data,
    );
  }
  editInstituteDirectory(data: any) {
    return this.httpIntercept.post(this.edit_InstituteDirectory_Url, data);
  }
  saveInstituteDirectory(data: any) {
    console.log('save Institute Directory', data);
    return this.httpIntercept.post(this.save_InstituteDirectory_Url, data);
  }
}
