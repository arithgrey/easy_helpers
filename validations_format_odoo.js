odoo.define('theme_benandfrank.appointment', function (require) {
    'use strict';

    var Widget = require('web.Widget');
    require('web.dom_ready');

    var Appointment = Widget.extend({
        events: {
            'keypress .phone': '_valPhone',
            'keypress .last-name': '_valLastName',
            'keypress .user-name': '_valName',
            'keypress .email': '_valEmail',

        },
        _valPhone: function (evt) {

            if (!/^([0-9])*$/.test(String.fromCharCode(evt.keyCode))){
                   evt.preventDefault();
            }
            let input = $("#phone_field").val().trim();
            if (input.length  < 7){

                $("#phone_field").addClass("border border-warning text-danger");
                $(".phone-label").addClass("text-danger");

            }else{

                $("#phone_field").removeClass("border border-warning text-danger");
                $("#phone-label").removeClass("text-danger");

            }

        },
        _valLastName: function (evt) {

            $(".last-name").val($(".last-name").val().trim());
            if (!/^([A-z])*$/.test(String.fromCharCode(evt.keyCode)) || evt.keyCode ==  32){

                   evt.preventDefault();
            }
        }
        ,
        _valName: function (evt) {

            $(".user-name").val($(".user-name").val().trim());
            if (!/^([A-z])*$/.test(String.fromCharCode(evt.keyCode)) || evt.keyCode ==  32){

                   evt.preventDefault();
            }
        },
        _valEmail:function (evt) {


            let c =  String.fromCharCode(evt.keyCode);
            let is_letter=  /^([A-z])*$/.test(c);
            let is_num =  /^([0-9])*$/.test(c);
            let text = $(".email").val();
            let times=  (text.match(/@/g)||[]).length;
            let inAllow =  (["_", "@", "."].indexOf(c));
            let validFormat =  (is_letter || is_num ||  (inAllow >  0 )  ) ? true : false;
            if (inAllow > 0 && (["_", "@", "."].indexOf(text.substr(-1)) >  0)   ){

                evt.preventDefault();
            }
            if ( c == '@'  && (times > 0 )) {

                evt.preventDefault();
            }
            if (!validFormat){

                evt.preventDefault();
            }
        }




    });



    var AppointmentCalendar = Widget.extend({
        events: {
            'click .more-schedule-control': '_showPrevious',
            'click .previous-control':'_valPrevious',
            'click .slot-text':'_valSlot',
        },
        start(){

            this.numPages = $(".section-calendar").length;
            this.currentPage = 0;
        }
        ,
        _showPrevious: function (evt) {

            $('.previous-control').removeClass('d-none');
            this.currentPage  = this.currentPage + 1;

        },
        _valPrevious: function (evt) {

            this.currentPage  = this.currentPage - 1;
            if (this.currentPage == 0 ){
                $('.previous-control').addClass('d-none');
            }
        }
        ,
        _valSlot:function (e) {
            
        }

    });

     $('.appointment_submit_form').each(function () {
        new Appointment().attachTo(this);
     });

     $('.appointment_calendar').each(function () {
        new AppointmentCalendar().attachTo(this);
     });


    return Appointment;

});
