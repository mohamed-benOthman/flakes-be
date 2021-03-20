import {AppErrorEnum} from './AppErrorEnum';
import {IErrorMessage} from './IErrorMessage';
import {HttpStatus} from '@nestjs/common';

export class AppError extends Error {

  public errorCode: AppErrorEnum;
  public httpStatus: number;
  public errorMessage: string;
  public userMessage: string;

  constructor(errorCode: AppErrorEnum) {
    super();
    //console.log('errorCode:'+errorCode);
    const errorMessageConfig: IErrorMessage = this.getError(errorCode);
    if (!errorMessageConfig) throw new Error('Unable to find message code error.');

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpStatus = errorMessageConfig.httpStatus;
    this.errorCode = errorCode;
    this.errorMessage = errorMessageConfig.errorMessage;
    this.userMessage = errorMessageConfig.userMessage;
    //    console.log('fin : '+this.userMessage);
  }

  private getError(errorCode: AppErrorEnum): IErrorMessage {

    let res: IErrorMessage;
    switch (errorCode) {
      case AppErrorEnum.USER_NOT_FOUND:
        res = {
          type: AppErrorEnum.USER_NOT_FOUND,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'User not found',
          userMessage: 'Unable to find the user with the provided information.'
        };
        break;
      case AppErrorEnum.USER_EXISTS:
        res = {
          type: AppErrorEnum.USER_EXISTS,
          httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
          errorMessage: 'User exisists',
          userMessage: 'Username exists'
        };
        break;
      case AppErrorEnum.NOT_IN_SESSION:
        res = {
          type: AppErrorEnum.NOT_IN_SESSION,
          httpStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'No Session',
          userMessage: 'Session Expired'
        };
        break;
      case AppErrorEnum.NO_USERS_IN_DB:
        res = {
          type: AppErrorEnum.NO_USERS_IN_DB,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Users exits in the database',
          userMessage: 'No Users. Create some.'
        };
        break;
      case AppErrorEnum.NO_DEPARTMENTS_IN_DB:
        res = {
          type: AppErrorEnum.NO_DEPARTMENTS_IN_DB,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Departments exits in the database',
          userMessage: 'No Department. Create some.'
        };
        break;
      case AppErrorEnum.NO_DEPARTMENTS_IN_RESULT:
        res = {
          type: AppErrorEnum.NO_DEPARTMENTS_IN_RESULT,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Departments matching with your criterias',
          userMessage: 'No Department.matching'
        };
        break;
      case AppErrorEnum.NO_REGIONS_IN_DB:
        res = {
          type: AppErrorEnum.NO_REGIONS_IN_DB,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Regions exits in the database',
          userMessage: 'No Regions Create some.'
        };
        break;
      case AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT:
        res = {
          type: AppErrorEnum.NO_MAQUILLEUSE_IN_RESULT,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Makeup artist matching with your criterias',
          userMessage: 'No Makeup artist matching'
        };
        break;
      case AppErrorEnum.NO_MAQUILLEUSE_IN_DB:
        res = {
          type: AppErrorEnum.NO_MAQUILLEUSE_IN_DB,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Makeup artist matching in DB',
          userMessage: 'No Makeup artist matching'
        };
        break;
      case AppErrorEnum.NO_REGIONS_IN_RESULT:
        res = {
          type: AppErrorEnum.NO_REGIONS_IN_RESULT,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Regions matching with your criterias',
          userMessage: 'No Region.matching'
        };
        break;
      case AppErrorEnum.NO_CITIES_IN_DB:
        res = {
          type: AppErrorEnum.NO_CITIES_IN_DB,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Cities exits in the database',
          userMessage: 'No City Create some.'
        };
        break;
      case AppErrorEnum.NO_CITIES_IN_RESULT:
        res = {
          type: AppErrorEnum.NO_CITIES_IN_RESULT,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Cities matching with your criterias',
          userMessage: 'No City matching'
        };
        break;
      case AppErrorEnum.NO_BUSINESS_IN_DB:
        res = {
          type: AppErrorEnum.NO_BUSINESS_IN_DB,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Business in DB',
          userMessage: 'No Business matching'
        };
        break;
      case AppErrorEnum.NO_BUSINESS_IN_RESULT:
        res = {
          type: AppErrorEnum.NO_BUSINESS_IN_RESULT,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Business matching with your criterias',
          userMessage: 'No City matching'
        }
        break;
      case AppErrorEnum.NO_EXPERTISE_IN_DB:
        res = {
          type: AppErrorEnum.NO_EXPERTISE_IN_DB,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No expertise in DB',
          userMessage: 'No expertise matching'
        };
        break;
      case AppErrorEnum.NO_EXPERTISE_IN_RESULT:
        res = {
          type: AppErrorEnum.NO_EXPERTISE_IN_RESULT,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No expertise matching with your criterias',
          userMessage: 'No expertise matching'
        };
        break;
      case AppErrorEnum.WRONG_PASSWORD:
        res = {
          type: AppErrorEnum.WRONG_PASSWORD,
          httpStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'Wrong password',
          userMessage: 'Password does not match'
        };
        break;
      case AppErrorEnum.TYPE_INCONNU:
        res = {
          type: AppErrorEnum.TYPE_INCONNU,
          httpStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'Wrong search type',
          userMessage: 'Wrong search type'
        };
        break;
      case AppErrorEnum.ERR_CREATE_PHOTO:
        res = {
          type: AppErrorEnum.ERR_CREATE_PHOTO,
          httpStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'Error photo creating',
          userMessage: 'Error photo creating'
        };
        break;
    }
    return res;
  }

}
