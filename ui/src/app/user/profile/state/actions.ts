import { createActionGroup, props } from "@ngrx/store";
import { UserContactKey } from ".";
import { PendingChangeType } from "../user.store";


export const UserContactCommands = createActionGroup({
    source: 'User Contact Commands',
    events: {
        'Update Property': props<{payload: PendingChangeType}>(),
    }
})