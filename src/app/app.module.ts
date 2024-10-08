import { TokenInterceptorService } from './token-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FactorsComponent } from './factors/factors.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { WaterComponent } from './water/water.component';
import { WasteComponent } from './waste/waste.component';
import { TransportComponent } from './transport/transport.component';
import { DietComponent } from './diet/diet.component';
import { FuelsComponent } from './fuels/fuels.component';
import { RadialBarChartComponent } from './radial-bar-chart/radial-bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HistoryComponent } from './history/history.component';
import { InsightsComponent } from './insights/insights.component';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { LoadingComponent } from './loading/loading.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NorecordComponent } from './norecord/norecord.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FactorsComponent,
    ElectricityComponent,
    WaterComponent,
    WasteComponent,
    TransportComponent,
    DietComponent,
    FuelsComponent,
    RadialBarChartComponent,
    DashboardComponent,
    PieChartComponent,
    HistoryComponent,
    InsightsComponent,
    HorizontalBarComponent,
    LoadingComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    HttpClientModule,
    NorecordComponent,
  ],
  providers: [
    provideHttpClient(withInterceptors([TokenInterceptorService])),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
