import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploadService} from "../services/file-upload.service";
import {SEPFile} from "../Models/SEPFile";

//mport {Liga} from Liga;

@Component({
  selector: 'app-liga-see',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  //file: SEPFile;
  files: File[];
  file: File | null = null
  sepfiles: SEPFile[];
  sepfile: SEPFile;

  constructor(private route: ActivatedRoute, private FileUploadService: FileUploadService, private router: Router) {
    //   this.file = new SEPFile();
    this.files = [];
    this.sepfile = new SEPFile();
    this.sepfiles = [];

  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0)
    }
  }

  onSubmit() {
    if (this.file) {
      this.sepfile.file = this.file;

      this.FileUploadService.upload(this.sepfile).subscribe()
    }
  }


  ngOnInit() {
    this.FileUploadService.getAll().subscribe((data: any) => this.files = data);
  }


  /*
    onUpload(files: any) {


      this.FileUploadService.create(this.file).subscribe();
    }

    onDownloadAll() {
      this.FileUploadService.getAll().subscribe((data: any) => this.files = data);
    }

    onDownload(file: SEPFile) {
      this.FileUploadService.getOne(file).subscribe((data: any) => this.file = data)
    }*/


}
