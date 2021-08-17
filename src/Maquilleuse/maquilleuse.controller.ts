import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import {MaquilleuseService} from './maquilleuse.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {Maquilleuse} from './maquilleuse.entity';
import {CreateMaquilleuseDto} from './Model/CreateMaquilleuseDto';
import {Request, Response} from 'express';
import { stringify } from 'querystring';
import { type } from 'os';
import {RolesGuard} from '../guards/roles.guard';
import { UserRole } from '../User/Model/user-role.enum';
import { Roles } from '../decorators/roles.decorator';
import {PaymentMethod} from '../payment-method/payment-method.entity';

@ApiUseTags('maquilleuse')
@Controller('maquilleuse')
export class MaquilleuseController {
  constructor(private readonly maquilleuseService: MaquilleuseService) {}

  @Get('/:parametre/:type/:debut/:nombre')
  @ApiOperation({title: 'Recherche artist par Departement(type=1) /par ville (type=2) / par business(type=3) / par expertise type=4 / type=5 par username / type=6 par email / All (type=0)) '})
  @ApiResponse({ status: 200, description: 'Maquilleuse trouvé.'})
  @ApiResponse({ status: 404, description: 'Pas de maquilleuse trouvé.'})
  public async getAllMaquilleuse(@Param('parametre') parametre: string,
                                 @Param('type') type: string,
                                 @Param('debut')debt: string,
                                 @Param('nombre') nombre: string)
  {

    return await this.maquilleuseService.findMaquilleuseTypeAll(parametre, type, Number(debt), Number(nombre));
   /*  .catch((err) => {
         console.error(err);
       });*/
  }

  @Get('/all')
  @ApiOperation({title: 'get all maquilleuses'})
  @ApiResponse({status: 200})
  public async getAllMaquilleuses(){
    return await this.maquilleuseService.findAllMaquilleuses();
  }
  @Put('/updateMaquilleuse')
  @ApiOperation({title: 'modify the maquilleuse choisie'})
  @ApiResponse({status: 200})
  @ApiResponse({status: 404})
  public async updateMaquilleuse(@Body() createMaquilleuse: any){
          return this.maquilleuseService.updateMaquilleuse(createMaquilleuse);
  }
  @Delete('/deleteMaquilleuse/:username')
  @ApiOperation({title: 'maquilleuse deleted'})
  @ApiResponse({status: 200})
  @ApiResponse({status: 404})
  public async deleteMaquilleuse(@Param('username') username: string){
    return this.maquilleuseService.deleteMaquilleuse(username);
  }
  @Get('/:username')
  @ApiOperation({title: 'maquilleuse trouve'})
  @ApiResponse({status: 200})
  @ApiResponse({status: 404})
  public async getMaquilleuseByUsername(@Param('username') username: string){
    return this.maquilleuseService.getMaquilleuseByUsername(username);
  }

  @Get('/:parametre/:type')
  @ApiOperation({title: 'Retourne Nbr artist par Departement(type=1) /par ville (type=2) ' +
    '/ par business(type=3) / par expertise type=4 /All (type=0)) / type=U : indique si le username est trouvé en base/' +
    ' type=E: indique si l\'email est trouvé en base'})
  @ApiResponse({ status: 200, description: 'Maquilleuse trouvé.'})
  @ApiResponse({ status: 404, description: 'Pas de maquilleuse trouvé.'})
  public async getNbrMaquilleuseCriteria(@Param('parametre') parametre: string, @Param('type') type: string) {
console.log('num:' + parametre);
switch (type) {
      case 'U':
        return await this.maquilleuseService.isMaquilleuseExisted(parametre, type);
        break;
      case 'E':
        return await this.maquilleuseService.isMaquilleuseExisted(parametre, type);
        break;
    }
return await this.maquilleuseService.findAllMaquilleuseNbr(parametre, type);
    /*   .catch((err) => {
               console.error(err);
             });*/
  }
  @Post('create')
  @ApiOperation({title: 'Create Maquilleuse'})
  @ApiResponse({ status: 200, description: 'Processing succedeed'})
  @ApiResponse({ status: 500, description: 'Processing failed'})
  public async create(@Body() createMaquilleuse: CreateMaquilleuseDto) {

    console.log('Create Maquilleuse');
    return await this.maquilleuseService.createUser(createMaquilleuse, false)
      .catch((err) => {
        console.error(err);
      });
    return [];
    //return res.status(HttpStatus.CREATED).send();
  }

  @Post('modify')
  @Roles(UserRole.User)
  @UseGuards(RolesGuard)
  @ApiOperation({title: 'Modify Maquilleuse'})
  @ApiResponse({ status: 200, description: 'Processing succedeed'})
  public async modify(@Body() modifyMaquilleuse: CreateMaquilleuseDto) {

    return await this.maquilleuseService.createUser(modifyMaquilleuse, true)
      .catch((err) => {
        console.error(err);
      });
    return [];
    //return res.status(HttpStatus.CREATED).send();
  }

  @Post('login')
  @ApiOperation({title: 'Authenticate'})
  @ApiBearerAuth()
  public async login(@Req() req: Request, @Res() res: Response, @Session() session) {
    const ses = session;
    return res.status(HttpStatus.OK).send();
  }

  @Post('pay')
  public async login(@Req() req: Request) {
    console.log(req.body);
    if (req.body.vads_trans_status === 'ACCEPTED') {
      const paymentMedthod: PaymentMethod = {
        token: req.body.vads_identifier,
        subscriptionDate: req.body.vads_trans_date,
      };
      console.log(paymentMedthod);

      const payment = await PaymentMethod.save(paymentMedthod);
      console.log(payment);
      const maq = await Maquilleuse.findMaquilleuseByEmailPayment(req.body.vads_cust_email);
      console.log(maq);
      maq.subsciptionPaid=true;
      maq.paymentMethod = payment;
      await Maquilleuse.save(maq);

    }
  }
  @Get('/payment-details/:username')
  @ApiOperation({title: 'les details de paiement trouve'})
  @ApiResponse({status: 200})
  @ApiResponse({status: 404})
  public async getMaquilleuseByUsername(@Param('username') username: string){
    return this.maquilleuseService.findMaquilleuseByUserNamePayment(username);}

}
