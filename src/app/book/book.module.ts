import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
            }
        ])
    ],
    declarations: [
    ]
})

export class BookModule {}