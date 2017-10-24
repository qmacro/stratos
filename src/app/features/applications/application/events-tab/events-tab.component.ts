import { resultPerPageParam } from '../../../../store/reducers/pagination.reducer';

import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { ApplicationService } from '../../application.service';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AddParams, SetPage } from '../../../../store/actions/pagination.actions';
import { EventSchema, GetAllAppEvents } from '../../../../store/actions/app-event.actions';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CfTableDataSource } from '../../../../shared/data-sources/table-data-source-cf';
import { CfAppEventsDataSource, AppEvent } from '../../../../shared/data-sources/cf-app-events-data-source';

@Component({
  selector: 'app-events-tab',
  templateUrl: './events-tab.component.html',
  styleUrls: ['./events-tab.component.scss']
})

export class EventsTabComponent implements OnInit {

  constructor(private store: Store<AppState>, private appService: ApplicationService) {

  }

  dataSource: CfTableDataSource<AppEvent>;
  hasEvents$: Observable<boolean>;
  // paginationKey: string;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  // gotToPage() {
  //   this.store.dispatch(new AddParams(EventSchema.key, this.paginationKey, {
  //     [resultPerPageParam]: 10
  //   }));
  // }


  ngOnInit() {
    // this.paginationKey = `app-events:${this.appService.cfGuid}${this.appService.appGuid}`;
    // const action = new GetAllAppEvents(this.paginationKey, this.appService.appGuid, this.appService.cfGuid);


    // this.dataSource = new AppEventsDataSource(
    //   this.store,
    //   action,
    //   this.paginator,
    //   this.sort
    // );
    this.dataSource = new CfAppEventsDataSource(
      this.paginator,
      this.sort,
      Observable.of(''),
      this.store,
      this.appService.cfGuid,
      this.appService.appGuid,
    );
  }
}
