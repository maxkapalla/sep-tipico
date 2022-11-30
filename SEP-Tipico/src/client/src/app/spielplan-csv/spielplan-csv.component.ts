import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamService} from "../services/team.service";

import {CSVRecord} from './CSVModel';
import {Team} from "../Models/Team";
import {Liga} from "../Models/Liga";
import {LigaService} from "../services/liga.service";
import {MatchService} from "../services/match.service";
import {Match} from "../Models/Match";

@Component({
  selector: 'app-root',
  templateUrl: './spielplan-csv.component.html',
  styleUrls: ['./spielplan-csv.component.css']
})

export class SpielplanCsvComponent implements OnInit {
  title = 'Angular7-readCSV';
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  teams: Team[];
  ligen: Liga[];
  csvArr: CSVRecord[];

  teamNamen: string[];
  uniqueTeamNamen: string[];

  teamByName: Team[];
  teamsToMake: Team[];
  tempTeam: Team;

  liga: bigint;

  constructor(private TeamService: TeamService, private LigaService: LigaService, private MatchService: MatchService) {
    this.teams = [];
    this.teamsToMake = [];
    this.tempTeam = new Team();
    this.teamByName = [];
    this.ligen = [];
    this.csvArr = [];
    this.teamNamen = [];
    this.uniqueTeamNamen = [];
    this.liga = BigInt("0");
  }

  ngOnInit() {
    this.TeamService.getAll().subscribe((data: any) => this.teams = data);
    this.LigaService.getAll().subscribe((data: any) => this.ligen = data);
  }

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);


      reader.onload = () => {
        let csvData = reader.result;

        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {


    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.matchday = curruntRecord[0].trim();
        csvRecord.playdate = curruntRecord[1].trim();
        csvRecord.team1 = curruntRecord[2].trim();
        csvRecord.ftgoals = curruntRecord[3].trim();
        csvRecord.team2 = curruntRecord[4].trim();

        this.csvArr.push(csvRecord);
      }
    }
    this.writeData();
    return this.csvArr;
  }

  writeData() {

    for (let csvR of this.csvArr) {
      this.teamNamen.push(csvR.team1);
      this.teamNamen.push(csvR.team2);

    }

    this.uniqueTeamNamen = [...new Set(this.teamNamen)];

    for (let t of this.uniqueTeamNamen) {
      this.tempTeam.name = t;
      this.tempTeam.liga = this.liga;
      this.TeamService.getTeamByName(this.tempTeam).subscribe((data: any) => {
        this.teamByName = data;
      });

      this.TeamService.saveByName(this.tempTeam).subscribe();


    }

    for (let csvR of this.csvArr) {
      let m = new Match();
      m.liga = this.liga;
      let teamsLiga: Team[] = [];
      this.TeamService.getAllInLiga(this.liga).subscribe((data: any) => {
        teamsLiga = data;
        for (let a of teamsLiga) {
          if (a.name?.includes(csvR.team1)) {
            m.teamA = a.id;
          }
        }

        for (let b of teamsLiga) {
          if (b.name?.includes(csvR.team2)) {
            m.teamB = b.id;
          }
        }
        m.spieltag = csvR.matchday;
        m.date = new Date(csvR.playdate).getTime();
        const regex = /([0-9]+)-([0-9]+)/;
        const match = csvR.ftgoals.match(regex);

        m.scoreTeamA = match[1];
        m.scoreTeamB = match[2];
        this.MatchService.create(m).subscribe();
      });


      //m.date = ;


    }


    // this.tempTeam.name = csvR.team1;
    // this.TeamService.getTeamByName(this.tempTeam).subscribe((data: any) => this.teamByName = data);
    //
    // if (this.teamByName.length == 0) {
    //
    // }
    //
    // for (let teamToMake of this.teamsToMake) {
    //   this.TeamService.save(teamToMake).subscribe();
    // }

  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }
}
