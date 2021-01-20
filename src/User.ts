import {
  autorun,
  observable,
  reaction
    // @ts-ignore
} from 'mobx'

import {
  ICartAPI,
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

  constructor(
    raw: any = {},
    cartAPI: ICartAPI,
  ) {
    this.email = raw.email ?? ''
    this.firstName = raw.firstName ?? ''
    this.lastName = raw.lastName ?? ''

    // Save order on any update
    // autorun(() => {
    //   User.save(this)
    // })

    // Define reaction for storeid
    reaction (
      () => this.email,
      (email) => {
        cartAPI.cartSetEmail(email)
      }
    )

    // Define reaction for username
    reaction (
      () => this.firstName + ' ' + this.lastName,
      (name) => {
        cartAPI.cartSetName(name)
      }
    )
  }

  // static load(cartAPI: ICartAPI) {
  //   return new User(akasha.get('user'), cartAPI)
  // }

  // static save(user: User) {
  //   akasha.set('user', user)
  // }

  // static clear(user: User) {
  //   akasha.remove('user')
  // }
}
