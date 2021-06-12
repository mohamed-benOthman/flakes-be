import { Injectable, Inject } from '@nestjs/common';
import { IToolService } from './interfaces/tool.interface';
import {config, host} from '../config';
import { dnsFlakes } from '../config';
// import {ProjectEntity} from '../project/project.entity';
import { MailJetKey } from '../config';
import { MailJetSecrete } from '../config';
import { UserMailDto } from '../../User/Model/UserMailDto';

@Injectable()
export class ToolService {

    public static getCurrentDateTime(sep: string, sep_hour: string, displayHour: boolean): string
    {
        /*var date = new Date(); // had to remove the colon (:) after the T in order to make it work
        var day = date.getDate();
        var monthIndex = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
        var year = date.getFullYear();
        var minutes = date.getMinutes();
        var hours = date.getHours();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();
        var myFormattedDate = day+sep+monthIndex+sep+year+(displayHour?("_"+ hours+sep_hour+minutes+sep_hour+seconds+sep_hour+milliseconds):"");
        */

        let timestampNow = Date.now();
        //console.log(timestampNow);

        return timestampNow;
    }

    public static getCurrentDateWithFormat(sep: string, sep_hour: string, displayHour: boolean): string
    {
        let date = new Date(); // had to remove the colon (:) after the T in order to make it work
        let day = date.getDate();
        let monthIndex = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let year = date.getFullYear();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let seconds = date.getSeconds();
        let milliseconds = date.getMilliseconds();
        let myFormattedDate = day + sep + monthIndex + sep + year + (displayHour ? ('_' + hours + sep_hour + minutes + sep_hour + seconds + sep_hour + milliseconds) : '');

        //var timestampNow=Date.now();
       // console.log(timestampNow);

        return myFormattedDate;
    }

    public static getHashMD5(chaine: string): string{

       // const md5 = require('md5-nodejs');
        let crypto = require('crypto');

        const hash = crypto.createHash('md5',).update(chaine).digest('hex');
        return hash;

    }

    public static getBCryptHash(chaine: string): string{
      //console.log("1-2");
        const bcrypt = require('bcrypt');
      //console.log("1-3");
        const saltRounds = 10;

        let salt = bcrypt.genSaltSync(saltRounds);
      //console.log("1-4");
        let hash = bcrypt.hashSync(chaine, salt);
      //console.log("1-5");
        return hash;

    }

    public static sendMailConfirmation(userfrom: UserMailDto, userto: UserMailDto, type: number, token :string): string{

        let Mailjet = require('node-mailjet').connect(MailJetKey, MailJetSecrete);
        let templateid;
        let subject;
       // console.log('cle Mail jet:'+MailJetKey+" MailJetSecrete"+MailJetSecrete);
       // console.log("email From:"+userfrom.email);
       // console.log("type:"+type);

    //    var sendEmail = Mailjet.post('send', {'version': 'v3.1'});

        if (type === 1){
            templateid = 691123; subject = 'Confirmation d\'envoi';
        }
        else{
            if (type === 2){
                templateid = 692719; subject = 'Confirmation de modification';
            }
            else{
                if (type === 3){

                }

            }
        }
        //console.log("templateid:"+templateid);

        const request = Mailjet
            .post('send', {version: 'v3.1'})
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'laetitiamiquel54@gmail.com',
                            Name: 'laetitia',
                        },
                        To: [
                            {
                                Email: '' + userto.email + '',
                                Name: '' + userto.login + '',
                            },
                        ],
                        Subject: 'Greetings from Mailjet.',
                        TextPart: 'My first Mailjet email',
                        HTMLPart: '<a href="'+host+'confirmation/'+token+'">go to</a>',
                        CustomID: 'AppGettingStartedTest',
                    },
                ],
            });
        request
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err.statusCode);
            });

    }

    public static sendMailUser(userfrom: UserMailDto, userto: UserMailDto, message: string): string{

        let Mailjet = require('node-mailjet').connect(MailJetKey, MailJetSecrete);
        let templateid;
        const request = Mailjet
            .post('send', {version: 'v3.1'})
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'laetitiamiquel54@gmail.com',
                            Name: 'laetitia',
                        },
                        To: [
                            {
                                Email: '' + userto.email + '',
                                Name: '' + userto.login + '',
                            },
                        ],
                        TemplateID: 694274,
                        TemplateLanguage: true,
                        Subject: 'Nouveau message',
                     //   "Headers": {"Reply-To":""+userfrom.email+""},
                        Variables: {
                           // "LoginSender": ""+userfrom.login+"",
                            MessContent: message,
                            TelSender: '' + userfrom.tel + '',
                            mailSender: '' + userfrom.email + '',
                        },

                    },
                ],
            });
        request
            .then((result) => {
                console.log(result.body);
            })
            .catch((err) => {
                console.log(err.statusCode);
            });

    }

    public static sendValidationMail(userfrom: UserMailDto, userto: UserMailDto, code: string){

        /**
         *
         * This call sends a message to the given recipient with vars and custom vars.
         *
         */

        console.log('sendMail userfrom:' + userfrom.email + ' userto:' + userto.email);
        let Mailjet = require('node-mailjet').connect(MailJetKey, MailJetSecrete);
        const request = Mailjet
            .post('send', {version: 'v3.1'})
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'laetitiamiquel54@gmail.com',
                            Name: 'LTBeauty',
                        },
                        To: [
                            {
                                Email: '' + userto.email + '',
                                Name: '' + userto.login + '',
                            },
                        ],
                        TemplateID: 1535370,
                        TemplateLanguage: true,
                        Subject: 'Validation Email',
                        Variables: {
                            activelink: '' + dnsFlakes + 'user/activate/' + code,
                        },
                    },
                ],
            });
        request
            .then((result) => {
                console.log(result.body);
            })
            .catch((err) => {
                console.log(err.statusCode);
            });
    }

    public static forgotPasswordMail(email: string, login: string, code: string){

        /**
         *
         * This call sends a message to the given recipient with vars and custom vars.
         *
         */

            // console.log("sendMail idGift:"+idGift);
        let Mailjet = require('node-mailjet').connect(MailJetKey, MailJetSecrete);
        const request = Mailjet
            .post('send', {version: 'v3.1'})
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'laetitiamiquel54@gmail.com',
                            Name: 'Reinitialisation mot de passe',
                        },
                        To: [
                            {
                                Email: '' + email + '',
                                Name: '' + login + '',
                            },
                        ],
                        TemplateID: 1546081,
                        TemplateLanguage: true,
                        Subject: 'Mot de passe oublié',
                        Variables: {
                            reserlink: '' + dnsFlakes + 'user/resetpassword/' + code + '/',
                        },
                    },
                ],
            });
        request
            .then((result) => {
                console.log(result.body);
            })
            .catch((err) => {
                console.log(err.statusCode);
            });
    }

}
