import { observable, computed } from 'mobx'

import { IInteraction, MaybeDate, MaybeString, Ref, SYSTEM_REF } from './types'

/**
 * Interaction object, stores time and ID of the interactor
 */
export default class Interaction implements IInteraction{
  /**
   * Reference to what triggered the interaction
   */
  @observable
  interactorRef: Ref

  /**
   * Datetime of interaction
   */
  @observable
  interactedAt: MaybeDate

  // support diffs

  /**
   * Build an Interaction with a ref and a date
   * @param ref a reference to what is driving the interaction
   * @param refAt the timestamp for at which the interaction happened
   */
  constructor(
    ref: Ref = SYSTEM_REF,
    refAt: MaybeDate = new Date()
  ) {
    this.interactorRef = ref

    // handle Firestore case
    if (refAt) {
      if ((refAt as any)._seconds) {
        this.interactedAt = new Date((refAt as any)._seconds * 1000 + Math.floor((refAt as any)._nanoseconds / 1000000))
      } else {
        this.interactedAt = refAt
      }
    } else {
      this.interactedAt = refAt
    }
  }
}

