
import api from '../../../api'
import init from './actions/init'
import Vue from 'vue'

export default {
  init ({commit, dispatch}) {
    init()
  },
  getSubscriptionState ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      OneSignal.push(() => {
        Promise.all([
          OneSignal.isPushNotificationsEnabled(),
          OneSignal.isOptedOut()
        ]).then(function (result) {
          var isPushEnabled = result[0]
          var isOptedOut = result[1]

          resolve({
            isPushEnabled: isPushEnabled,
            isOptedOut: isOptedOut
          })
        })
      })
    })
  },
  updateUserId({commit}) {
    return new Promise((resolve, reject) => {
      OneSignal.push(() => {
        OneSignal.getUserId((userId) => {
          api.users.updateOnesignalId(userId).then(
            () => resolve(arguments),
            () => reject(arguments)
          );
        });
      });
    });
  },
  updateNotificationPermission({commit, dispatch}) {
    OneSignal.push([
      'getNotificationPermission',
      (permission) => commit('setNotificationPermission', permission)
    ]);
  },
  updateNotificationSupport({commit, dispatch}) {
    commit('setNotificationSupported', false)
  },
  attachOnSubscriptionChange({commit, dispatch}) {
    OneSignal.push(
      () => {
        console.log('[attachOnSubscriptionChange] attaching...');
        OneSignal.on('subscriptionChange', (isSubscribed) => {
          console.log('[onesignal/subscribeToNotifications] [OneSignal subscriptionChange] ', isSubscribed);
          if (isSubscribed) {
            dispatch('updateUserId')
          }

          dispatch('updateNotificationPermission')
        });
      }
    );
  },
  subscribeToNotifications({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      OneSignal.push(() => {
        dispatch('getSubscriptionState').then((state) => {
          console.log('[subscribeToNotifications] [getSubscriptionState] state: ', state);
          if (!state.isPushEnabled) {
            if (state.isOptedOut) {
              /* Opted out, opt them back in */
              let setSubscr = OneSignal.setSubscription(true).then(() => resolve());
              console.log('[subscribeToNotifications] [getSubscriptionState] set subscription: ', setSubscr);
            } else {
              /* Unsubscribed, subscribe them */
              let registerForPush = OneSignal.registerForPushNotifications().then(() => resolve());
              console.log('[subscribeToNotifications] [getSubscriptionState] registering for push: ', registerForPush);
            }
          } else {
            resolve();
          }
        });
      });
    })
  },

  unsubscribeToNotifications({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      OneSignal.push(() => {
        dispatch('getSubscriptionState').then((state) => {
          if (state.isPushEnabled) {
            /* Subscribed, opt them out */
            OneSignal.setSubscription(false).then(() => resolve());
          } else {
            resolve();
          }
        });
      })
    });
  },

  /**
   * This is for registering a authenticated user email
   * @param commit
   * @param dispatch
   * @param user
   * @returns {Promise<any>}
   */
  updateUserEmail({commit, dispatch}, user) {
    return new Promise((resolve, reject) => {
      OneSignal.push(() => {
        OneSignal.setEmail(user.email, {emailAuthHash: user.onesignal_email_hash}).then(() => {
          console.log('[setOnesignalEmail] args: ', arguments)
          dispatch("updateUserId");
          resolve(...arguments)
        }, () => {
          console.log('[setOnesignalEmail] err args: ', arguments)
          reject(...arguments)
        })
        OneSignal.push(['sendTag', 'real_name', user.name])
      })
    })
  },

  /**
   * This is foter registering a unauthenticated user email
   * @param commit
   * @param dispatch
   * @param email
   */
  registerEmail({commit, dispatch}, emailData) {
    return new Promise((resolve, reject) => {
      if (typeof emailData === "string") {
        // there is not email hash, we should generate
        api.leads.registerEmail(emailData).then(
          (response) => {
            let emailAuthHash = response.data.hash

            OneSignal.push(
              () => OneSignal.setEmail(emailData, { emailAuthHash }).then(
                () => {
                  console.log('[onesignal/registerEmail] setEmail.success: ', arguments);
                  resolve(...arguments)
                },
                () => {
                  console.log('[onesignal/registerEmail] setEmail.error: ', arguments);
                  reject(...arguments)
                }
              )
            )
          },
          (err) => {
            reject(err)
          }
        )
      } else {
        let email = emailData.email;
        let emailAuthHash = emailData.emailAuthHash;
        OneSignal.push(
          () => OneSignal.setEmail(email, { emailAuthHash }).then(
            () => {
              console.log('[onesignal/registerEmail] setEmail.success: ', arguments);
              resolve(...arguments)
            },
            () => {
              console.log('[onesignal/registerEmail] setEmail.error: ', arguments);
              reject(...arguments)
            }
          )
        )
      }
    });
  },

  sendTag({commit, dispatch}, {key, value}) {
    OneSignal.push(["sendTag", key, value])
  },

  logoutEmail({commit, dispatch}) {
    OneSignal.push(() => OneSignal.logoutEmail())
  }
}
