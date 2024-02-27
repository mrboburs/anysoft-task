import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderEnum } from './dto/order.dto';
import { KnexModule } from 'nestjs-knex';


describe('OrderService', () => {
    let service: OrderService;
 

    let orderCreate: CreateOrderDto = {
        description: 'lorem',
        estimate: 1,
        status: OrderEnum.ACTIVE,
        title: 'lorem',
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                KnexModule.forRootAsync({
                    useFactory: () => ({
                        config: {
                            client: "pg",
                            useNullAsDefault: true,
                            connection: {
                                host: 'localhost',
                                user: 'postgres',
                                port: "5434",
                                password: '123',
                                database: 'nest',
                            },
                        },
                    }),
                }),
            ],
            providers: [
                {
                    provide: OrderService,
                    useValue: {
                        create: jest.fn(),
                    }
                },
             
            ],
        }).compile();

        service = module.get<OrderService>(OrderService);
        
    });
   
  
    describe("create", () => {
        it("should be create order ", async () => {
            let wantData = {
              
                   "description": "lorem",
                   "estimate": 1,
                   "status": "active",
                   "title": "lorem",           
            };
  
            (service.create as jest.Mock).mockResolvedValue(orderCreate);
            const actual = await service.create(orderCreate);
    
        
            // expect(service.create).toHaveBeenCalledWith(wantData)
            expect(actual).toEqual(wantData);           
        }); 

        it("should be create order ", async () => {
            let wantData = {
              
                   "description": "lorem",
                   "estimate": 1,
                   "status": "active",
                   "title": "lorem",           
            };
  
            (service.create as jest.Mock).mockResolvedValue({});
            const actual = await service.create(orderCreate);
    
        
            // expect(service.create).toHaveBeenCalledWith(wantData)
            expect(actual).toEqual(wantData);           
        }); 
    })
});
