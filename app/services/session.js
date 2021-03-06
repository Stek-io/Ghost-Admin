import SessionService from 'ember-simple-auth/services/session';
import computed from 'ember-computed';
import injectService from 'ember-service/inject';

export default SessionService.extend({
    store: injectService(),
    feature: injectService(),

    user: computed(function () {
        return this.get('store').queryRecord('user', {id: 'me'});
    }),

    authenticate() {
        return this._super(...arguments).then((authResult) => {
            return this.get('feature').fetch().then(() => {
                return authResult;
            });
        });
    }
});
