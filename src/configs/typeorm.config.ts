import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type:'mariadb',
    host:'localhost',
    port:3306,
    username:'root',
    password:'1',
    database:'test',
    entities:[__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}