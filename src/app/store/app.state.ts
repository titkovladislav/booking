import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { AddApplicationAction, GetDataAction } from "./actions.store";
import { ApplicationI, BookingElementI } from "../interfaces/booking-interfaces";

export class BookingStateModel {
  mokData!: BookingElementI[];
  filterData!: BookingElementI[];
  applications!: ApplicationI[];
}

@State<BookingStateModel>({
  name: 'appstate',
  defaults: {
    mokData: [],
    filterData: [],
    applications: []
  }
})

@Injectable()
export class BookingState {

  @Selector()
  public static getDataSelector(state: BookingStateModel) {
    return state.mokData
  }

  @Selector()
  public static getApplicationsSelector(state: BookingStateModel) {
    return state.applications
  }

  @Action(GetDataAction)
    GetDataAction({ patchState }: StateContext<BookingStateModel>, { mokData }: GetDataAction){
      patchState({mokData: mokData})
  }

  @Action(AddApplicationAction)
    AddApplication({ getState, patchState }: StateContext<BookingStateModel>, { application }: AddApplicationAction){
    const state = getState();
    patchState({applications: [...state.applications, application]})
  }

}
