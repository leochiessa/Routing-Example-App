import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { StudentService } from "src/app/services/student.service";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CheckDNIValidator implements AsyncValidator {

    constructor(private studentService: StudentService) { }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.studentService.checkDNI(control.value).pipe(
            map(() => null),
            catchError(err => {
                if (err.status === 409) {
                    return of({
                        DNITaken: true
                    });
                }
                return of(null);
            })
        );
    }
}