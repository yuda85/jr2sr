import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, finalize, map, take, tap } from 'rxjs/operators';
import { IJob } from 'src/app/models';
import { AddJobs } from 'src/app/state/global/global.actions';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private uploadPercent: any;
  private downloadURL: any;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private store: Store
  ) {
    // ddddd.forEach((job) => {
    //   this.addNewJob(job, 'PdNWzMJsipU90KYUVEqQGgyFMQz2');
    // });
  }

  /**
   * fetchJobs
   * getJobs
   * addNewJob // https://stackoverflow.com/questions/49026589/angular-firestore-where-query-returning-error-property-does-not-exist-on
   * edit job
   * remove job
   * ApplyToJob
   * getJobById
   * GetJobsByCategoryId
   * searchJobs
   * saveJob
   */

  public p: any;

  //Save first document in snapshot of items received
  public firstInResponse: any = [];

  //Save last document in snapshot of items received
  public lastInResponse: any = [];

  //Keep the array of first document of previous pages
  public prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  public pagination_clicked_count = 0;

  //Maintain the count of clicks on Next Prev button
  public pageSize = 12;

  //Maintain the count of clicks on Next Prev button
  public itemnumberbypage = 0;

  //Disable next and prev buttons
  public disable_next: boolean = false;
  public disable_prev: boolean = false;
  // private searchlinkqueriesData: AngularFirestoreDocument<QueryLinks>;

  //Data object for listing items
  searchlinkqueriesdata: any[] = [];

  searchlinkqueriesdatanext: Observable<any[]>;

  searchlinkqueriesdataprev: Observable<any[]>;

  public fetchJobs(): Observable<Array<IJob>> {
    return this.db
      .collection('jobs', (ref) => ref.limit(this.pageSize))
      .snapshotChanges()
      .pipe(
        tap((response) => {
          debugger;
          if (!response.length) {
            console.log('No Data Available');
            return false;
          }
          this.firstInResponse = response[0].payload.doc;
          this.lastInResponse = response[response.length - 1].payload.doc;

          this.searchlinkqueriesdata = [];

          //Initialize values
          this.prev_strt_at = [];
          this.pagination_clicked_count = 0;
          this.itemnumberbypage = 1;
          this.disable_next = false;
          this.disable_prev = false;

          //Push first item to use for Previous action
          this.push_prev_startAt(this.firstInResponse);
        }),
        map((docArray) => {
          return this.mapResponse(docArray);
        })
      );

    // return this.db
    //   .collection('jobs', (ref) => ref.limit(12))
    //   .snapshotChanges()
    //   .pipe(
    //     map((docArray) => {
    //       return docArray.map((doc) => {
    //         const data = doc.payload.doc.data() as IJob;
    //         return { ...data, id: doc.payload.doc.id };
    //       });
    //     })
    //   );
  }

  public addNewJob(job: IJob, userId: string): void {
    this.db.collection('jobs').add(<IJob>{ ...job, uploadingUserId: userId });
  }

  public uploadFile(event: any, jobId: string, docId: string) {
    const file = event.target.files[0];
    const fileId = uuid.v4();
    const filePath = `/${jobId}/${fileId}`;

    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef
            .getDownloadURL()
            .pipe(
              filter((data) => !!data),
              take(1)
            )
            .subscribe((fileUrl) => {
              this.db
                .collection('jobs')
                .doc(jobId)
                .update({ fileUrl: fileUrl });
            });
        })
      )
      .subscribe();

    this.db
      .collection('jobs')
      .doc(jobId)
      .update({ file: file.name, fileId: fileId });
  }

  nextPage() {
    this.disable_next = true;
    this.db
      .collection('jobs', (ref) =>
        ref.limit(this.pageSize).startAfter(this.lastInResponse)
      )
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(
        (response) => {
          if (!response.length) {
            this.disable_next = true;
            return;
          }

          const jobsArray = this.mapResponse(response);
          this.store.dispatch(new AddJobs(jobsArray));
          this.firstInResponse = response[0].payload.doc;
          this.lastInResponse = response[response.length - 1].payload.doc;

          this.searchlinkqueriesdata = [];
          this.searchlinkqueriesdata = response.map((item) => {
            return {
              id: item.payload.doc.id,
              searchlinksdata: item.payload.doc.data(),
            };
          });

          this.pagination_clicked_count++;
          this.itemnumberbypage * this.pagination_clicked_count;

          this.push_prev_startAt(this.firstInResponse);

          this.disable_next = false;
        },
        (error) => {
          this.disable_next = false;
        }
      );
  }

  push_prev_startAt(prev_first_doc) {
    this.prev_strt_at.push(prev_first_doc);
  }

  private mapResponse(docArray: DocumentChangeAction<unknown>[]): Array<IJob> {
    return docArray.map((doc) => {
      const data = doc.payload.doc.data() as IJob;
      return { ...data, id: doc.payload.doc.id };
    });
  }
}
