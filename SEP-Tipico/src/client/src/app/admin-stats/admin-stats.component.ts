import { Component, OnInit } from '@angular/core';
import {AdminStats} from "../Models/AdminStats";
import {LigaService} from "../services/liga.service";

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {

  adminStats: AdminStats[]

  constructor(private ligaService: LigaService) {
    this.adminStats = []
  }

  ngOnInit(): void {
    this.ligaService.getAdminStats().subscribe((data: any) => this.adminStats = data);
  }

  removeLiga(ligaID: bigint|undefined) {
    if (ligaID != null) {
      this.ligaService.remove(ligaID).subscribe(() => this.ngOnInit())
    }
    alert("deleted")
  }

  sortByTipperCount() {
    // @ts-ignore
    this.adminStats.sort((a, b) => (a.userCount < b.userCount) ? 1 : -1);

  }

  sortByTippRunden() {
    // @ts-ignore
    this.adminStats.sort((a, b) => (a.tippRundenCount < b.tippRundenCount) ? 1 : -1);
  }

}
