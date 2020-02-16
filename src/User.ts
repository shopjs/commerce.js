import {
  autorun,
  observable,
} from 'mobx'

import {
  IUser,
} from './types'

import akasha from 'akasha'

export default class User implements IUser {
  @observable
  email: string

  @observable
  firstName: string

  @observable
  lastName: string

  constructor(raw: any = {}) {
    this.email = raw.email ?? ''
    this.firstName = raw.firstName ?? ''
    this.lastName = raw.lastName ?? ''

    // Save order on any update
    autorun(() => {
      User.save(this)
    })
  }

  static load() {
    return new User(akasha.get('user'))
  }

  static save(user: User) {
    akasha.set('user', user)
  }
}
