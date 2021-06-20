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

        const timestampNow = Date.now();
        //console.log(timestampNow);

        return timestampNow;
    }

    public static getCurrentDateWithFormat(sep: string, sep_hour: string, displayHour: boolean): string
    {
        const date = new Date(); // had to remove the colon (:) after the T in order to make it work
        const day = date.getDate();
        const monthIndex = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const year = date.getFullYear();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();
        const myFormattedDate = day + sep + monthIndex + sep + year + (displayHour ? ('_' + hours + sep_hour + minutes + sep_hour + seconds + sep_hour + milliseconds) : '');

        //var timestampNow=Date.now();
       // console.log(timestampNow);

        return myFormattedDate;
    }

    public static getHashMD5(chaine: string): string{

       // const md5 = require('md5-nodejs');
        const crypto = require('crypto');

        let hash = crypto.createHash('md5').update(chaine).digest('hex');
        hash = hash.replace(/\//g, 'slash');
        return hash;

    }

    public static async getBCryptHash(chaine: string): string{

        const bcrypt = require('bcrypt');

        const saltRounds = 10;

        const salt = await bcrypt.genSaltSync(saltRounds);

        const hash = await bcrypt.hash(chaine, salt);

        return hash;

    }

    public static sendMailConfirmation(userfrom: UserMailDto, userto: UserMailDto, type: number, token: string): string{

        const Mailjet = require('node-mailjet').connect(MailJetKey, MailJetSecrete);
        let templateid;
        let subject;

        let  url: string;

        if (type === 1){

            templateid = 1535370; subject = 'Activation Compte';
            url = host + 'confirmation/' + token;
        }
        else{
            if (type === 2){
                templateid = 692719; subject = 'Confirmation de modification';
            }
            if (type === 4){
                templateid = 2960027;  // this case is used when the user has successfully changed his password
                subject = 'Confirmation de réinitialisation du mot de passe';
            }
            else{
                //this is for password
                if (type === 3){
                    templateid = 1546081;
                    subject = 'Mot de passe oublié';
                    url = host + 'resetPassword/' + token;

                }

            }
        }

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

                        TemplateID: templateid,
                        TemplateLanguage: true,
                        Subject: subject,
                        Variables: {
                            name: userto.login,
                            activelink: url,
                        },
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

    public static sendResetEmailSuccess(userfrom: UserMailDto, userto: UserMailDto): string{

        const Mailjet = require('node-mailjet').connect(MailJetKey, MailJetSecrete);

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

                        TemplateID: 2960027,
                        TemplateLanguage: true,
                        Subject: 'Mot de passe changé avec succés',

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

        const Mailjet = require('node-mailjet').connect(MailJetKey, MailJetSecrete);
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
        const Mailjet = require('node-mailjet').connect(MailJetKey, MailJetSecrete);
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
        const Mailjet = require('node-mailjet').connect(MailJetKey, MailJetSecrete);
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
