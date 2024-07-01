/*
 * AMRIT – Accessible Medical Records via Integrated Technology
 * Integrated EHR (Electronic Health Records) Solution
 *
 * Copyright (C) "Piramal Swasthya Management and Research Institute"
 *
 * This file is part of AMRIT.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMyNameDir]',
})
export class myNameDirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[0-9 ~!@#$%^&*`()_+\-=\]{};':"\\|,.<>?]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}

@Directive({
  selector: '[appMyName2Dir]',
})
export class myName2Directive {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[0-9~!@#$%^&*`()_+\-=\]{};':"\\|,.<>?]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}

@Directive({
  selector: '[appAgentIdOne]',
})
export class agentID_oneDirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[a-zA-Z ~!@#$%^&*`()_+\-=\]{};':"\\|.<>?]*$/);
    //   "^(\\s*\\d+\\s*\\-\\s*\\d+\\s*,?|\\s*\\d+\\s*,?)+$"
    //   /^[a-zA-Z~!@#$%^&*`()_+\=\[\]{};':"\\|.<>\/?]*$/
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}

@Directive({
  selector: '[appAgentIdTwo]',
})
export class agentID_twoDirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[a-zA-Z ~!@#$%^&*`()_+\]{};':"\\|,.<>?]*$/);
    //   "^(\\s*\\d+\\s*\\-\\s*\\d+\\s*,?|\\s*\\d+\\s*,?)+$"
    //   /^[a-zA-Z~!@#$%^&*`()_+\=\[\]{};':"\\|.<>\/?]*$/
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}

@Directive({
  selector: '[appMyProviderName]',
})
export class myProviderNameDirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[0-9~!@#$%^&*()_+\-=\]{};'`:"\\|,.<>?]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}
@Directive({
  selector: '[appPAN]',
})
export class PANDirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[~ !@#$%^&*()_+\-=\]{};':"\\|,.<>?]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}
@Directive({
  selector: '[appVehicleNO]',
})
export class VehicleNODirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[~!@#$%^&*()_+\-=\]{};':"\\|,.<>?]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}
@Directive({
  selector: '[appVehicleNONew]',
})
export class VehicleNONewDirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[~!@#$%^&*()_+\]{};':"\\|,.<>]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}
@Directive({
  selector: '[appMeasuringUnit]',
})
export class measuringUnitDirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[~!@#$&*()+={};':"<>?]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}

@Directive({
  selector: '[appDLNO]',
})
export class DLNODirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[~ !@#$%^&*()_+\]{};':"\\|,.<>]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}
