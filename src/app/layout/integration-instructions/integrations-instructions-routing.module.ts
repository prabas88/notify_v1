import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrationInstructionsComponent } from './integration-instructions.component';

const routes: Routes = [
    {
        path: '',
        component: IntegrationInstructionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IntegrationInstructionsRoutingModule {
}
