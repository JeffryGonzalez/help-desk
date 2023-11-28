import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserState } from ".";

export const UserCommands = createActionGroup({
    source: 'User Commands',
    events: {
        'Load User': emptyProps(),
    }
})

export const UserDocuments = createActionGroup({
    source: 'User Documents',
    events: {
        'User': props<{payload: UserState}>(),
    }
})
