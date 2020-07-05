import {NgModule } from '@angular/core';
import {
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,




} from '@angular/material';
import { ObserversModule } from '@angular/cdk/observers';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
    exports: [
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatTabsModule,
        MatSelectModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatTooltipModule,
        MatChipsModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        ObserversModule,
        MatAutocompleteModule,
        MatInputModule,
        MatStepperModule

    ]

})
export class MaterialAppModule { }
