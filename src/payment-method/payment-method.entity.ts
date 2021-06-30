import {BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class PaymentMethod extends BaseEntity{
    @PrimaryColumn({ length: 200 })
    token: string;

    @Column({ length: 100 })
    subscriptionDate: string;

}
