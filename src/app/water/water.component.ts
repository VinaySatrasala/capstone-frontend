import { FactorsService } from './../factors.service';
import { FactorsComponent } from './../factors/factors.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css'],
})
export class WaterComponent implements OnInit {
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  householdSize: number = 1; // Assume calculations for one person
  hasLawn: string = 'no';
  lawnSize: number = 0;
  wateringFrequency: number = 0;
  alreadySubmitted: boolean = false;

  hasDishwasher: string = 'no';
  dishwasherUsage: number = 0;

  hasWashingMachine: string = 'no';
  washingMachineUsage: number = 0;

  hasWaterSavingFixtures: string = 'no';
  estimatedWaterUsage: number | null = null;

  @ViewChild('form')
  form: any;

  constructor(private factorsService: FactorsService) {}

  ngOnInit(): void {
    let year = new Date().getFullYear();
    let month: any = new Date().getMonth();
    month = this.months[month];
    this.factorsService.fetchMonthData(year, month).subscribe({
      next: (data: any) => {
        if (data['water'].emission > 0) this.alreadySubmitted = true;
      },
    });
  }

  calculateWaterUsage() {
    const averagePerPersonDaily = 45; // Average gallons per person per day
    const lawnWaterUsage =
      this.hasLawn === 'yes'
        ? this.lawnSize * 0.62 * this.wateringFrequency
        : 0;
    const dishwasherWaterUsage =
      this.hasDishwasher === 'yes' ? this.dishwasherUsage * 10 : 0;
    const washingMachineWaterUsage =
      this.hasWashingMachine === 'yes' ? this.washingMachineUsage * 30 : 0;

    let totalWaterUsageDaily =
      averagePerPersonDaily +
      lawnWaterUsage +
      dishwasherWaterUsage +
      washingMachineWaterUsage;

    if (this.hasWaterSavingFixtures === 'yes') {
      totalWaterUsageDaily *= 0.6; // Assume 40% reduction with water-saving fixtures
    }

    // Convert daily usage to monthly in liters (1 gallon = 3.78541178 liters)
    const totalWaterUsageMonthlyLiters = totalWaterUsageDaily * 30 * 3.78541178;

    this.estimatedWaterUsage = totalWaterUsageMonthlyLiters;
    return this.estimatedWaterUsage.toFixed(2);
  }

  reset() {
    this.hasDishwasher = 'no';
    this.hasLawn = 'no';
    this.hasWashingMachine = 'no';
    this.hasWaterSavingFixtures = 'no';
  }

  onSubmit() {
    // Logic to handle form submission
    let litres_used = this.calculateWaterUsage();
    this.factorsService.putRecordIfAbsent().subscribe({
      next: (emissionID) => {
        let body = {
          water: {
            litres_used: litres_used,
          },
        };

        if (emissionID) {
          this.factorsService
            .updateRecord('water', body, emissionID)
            .subscribe({
              next: (success) => {
                if (success) {
                  this.factorsService.alertSubmitStatus('success');
                  this.reset();
                }
              },
              error: (err) => {
                console.log(err);
                this.factorsService.alertSubmitStatus('error');
              },
            });
        }
      },
    });
  }
}
