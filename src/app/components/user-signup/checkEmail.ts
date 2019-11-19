import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";

@Injectable({ providedIn: "root" })
export class CheckEmailValidator implements AsyncValidator {

    constructor(private userService: UserService) { }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.userService.checkEmail(control.value).pipe(
            map(() => null),
            catchError(err => {
                if (err.status === 409) {
                    return of({
                        emailTaken: true
                    });
                }
                return of(null);
            })
        );
    }
}