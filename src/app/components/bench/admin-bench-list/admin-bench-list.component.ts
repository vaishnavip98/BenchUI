import { Component, OnInit } from '@angular/core';
import { Bench } from 'src/app/models/bench.model';
import { AdminBenchService } from 'src/app/services/admin-bench.service';

@Component({
  selector: 'app-admin-bench-list',
  templateUrl: './admin-bench-list.component.html',
  styleUrls: ['./admin-bench-list.component.css']
})

export class BenchListComponent implements OnInit {

  benchs: Bench[] = [];
  selectedBench: Bench = {
    benchName: "",
    benchId: "",
    partnerId: "",
    noOfResource: 0,
    skillSet: "",
    ratePerHrUSD: 0,
    yearsOfExperince: ""
  };

  addBenchRequest: Bench = {
    benchName: "",
    benchId: "",
    partnerId: "",
    noOfResource: 0,
    skillSet: "",
    ratePerHrUSD: 0,
    yearsOfExperince: ""
  };

  addBenchRevisied: any;

  partnerList: any[] = [];

  length: number = 10;
  deleteId: string = "";
  constructor(private adminBenchService: AdminBenchService) { }

  ngOnInit(): void {
    this.adminBenchService.getAllBench()
      .subscribe({
        next: (bench) => {
          this.benchs = bench;
          this.benchs.forEach((bench, i) => {
            this.adminBenchService.getPartnerNameByPartnerId(bench.partnerId)
              .subscribe({
                next: (partner) => {
                  console.log(partner);
                  this.benchs[i].benchName = partner.partnerName;
                },
                error: (response) => {
                  console.log(response);
                }
              })
          });
          console.log(this.benchs);
        },
        error: (response) => {
          console.log(response);
        }
      });

    console.log(this.benchs);
    this.adminBenchService.getAllPartner()
      .subscribe({
        next: (partners) => {
          this.partnerList = partners;
          console.log(this.partnerList);
          // console.log(bench);
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

  editBench(selected: any) {
    this.selectedBench = selected;
    console.log(this.selectedBench);
  }
  setDeleteId(id: string) {
    this.deleteId = id;
  }
  deleteBench() {
    this.adminBenchService.deleteBenchById(this.deleteId).subscribe({
      next: (bench) => {
        this.adminBenchService.showSuccess("Bench Deleted Successfully", "");
        console.log(bench);
        window.location.reload();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  addBench() {

    console.log(this.addBenchRevisied);
    this.adminBenchService.addBench({
      partnerId: this.addBenchRequest.partnerId,
      noOfResource: this.addBenchRequest.noOfResource,
      skillSet: this.addBenchRequest.skillSet,
      ratePerHrUSD: this.addBenchRequest.ratePerHrUSD,
      yearsOfExperince: this.addBenchRequest.yearsOfExperince
    }).subscribe({
      next: (bench) => {
        this.adminBenchService.showSuccess("Bench Added Successfully", "");
        console.log(bench);
        window.location.reload();
      },
      error: (response) => {
        console.log(response);
        this.adminBenchService.showError("Unsuccessfull!", "");
      }
    })
  }

  updateBench() {
    console.log(this.selectedBench);
    this.adminBenchService.editBench({
      partnerId: this.selectedBench.partnerId,
      noOfResource: this.selectedBench.noOfResource,
      skillSet: this.selectedBench.skillSet,
      ratePerHrUSD: this.selectedBench.ratePerHrUSD,
      yearsOfExperince: this.selectedBench.yearsOfExperince
    }, this.selectedBench.benchId).subscribe({
      next: (bench) => {
        console.log(bench);
        window.location.reload();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  filter: any[] = [];
  pages: number = (this.filter.length / this.length) + 1;
  searchValue: string = "";

  searchBench() {
    console.log(this.length);
    this.adminBenchService.searchBench(this.searchValue)
      .subscribe({
        next: (bench) => {
          this.benchs.forEach((bench, i) => {
            this.adminBenchService.getPartnerNameByPartnerId(bench.partnerId)
              .subscribe({
                next: (partner) => {
                  console.log(partner);
                  this.benchs[i].benchName = partner.partnerName;
                },
                error: (response) => {
                  console.log(response);
                }
              })
          });
          console.log(bench);
          this.filter = bench;
          console.log(bench);
          this.benchs = bench;
        },
        error: (response) => {
          console.log(response);
        }
      });

  }

}
