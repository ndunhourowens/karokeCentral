import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './signIn.html';

import { SessionId } from '../imports/api/sessionId.js';
import { Bars } from '../imports/api/bars.js';
import { CreateSessionUser } from '../imports/api/createSessionUser.js';


Template.signIn.created = function(){
};

Template.signIn.rendered = function(){
};

Template.signIn.helpers({
    bars:  function(){
        return Bars.find({});
    }
});

Template.signIn.events({
    'click #logIn': function(e){
        event.preventDefault();
        const session = $('.sessionID').val().toString();
        const currentSID = SessionId.find({}, {sort:{"createdAt": -1}}).fetch()[0].sId.toString();
        const createSessionUser = {
            sessionID: session,
            barName: 'HMC',
            createdAt: new Date()
        };

        if( session === currentSID){
            Meteor.call('createSessionUser', createSessionUser, function(err, succ){
                Router.go('/userDash/' + succ);
            });
        }else{
            $('#errMsg').show()
            .text("INVALID SESSION ID ENTERED")
            .css("display", "block")
            .fadeIn(800)
            .delay(1500)
            .fadeOut(500);
            $('.sessionID').val('');
        }
    },
    'click #signInAdmin': function(e){
        Router.go('/admin');
    },

});


Template.admin.events({
    'click #toAdmin': function(e){
        e.preventDefault();
        const username = $('#text').val();
        const password = $('#pwd').val();

        Meteor.loginWithPassword(username, password, function(err){
            if(err){
                $('#adminErrMsg').show()
                    .text(err.reason)
                    .fadeIn(800)
                    .delay(1500)
                    .fadeOut(500);
                $('#text').val('');
                $('#pwd').val('');
            } else{
                Router.go("/adminDash/" + Meteor.userId());
            }
        });
    },
    'click #toReg': function(e){
        e.preventDefault();
        Router.go('/adminReg');
    },

});